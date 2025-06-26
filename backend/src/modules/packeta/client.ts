import { MedusaError } from "@medusajs/framework/utils";
import { Options } from "./service";
import { PacketaCarrier } from "./types";
import { Builder, Parser } from "xml2js";
import { Logger } from "@medusajs/medusa";
import { BACKEND_URL } from "lib/constants";

export class PacketaClient {
  options: Options;
  protected logger_: Logger;

  constructor({ logger }: { logger: Logger }, options: Options) {
    this.logger_ = logger;

    this.options = options;
  }

  private async send_API_V5_Request(
    url: string,
    data?: RequestInit
  ): Promise<any> {
    try {
      const response = await fetch(
        `https://pickup-point.api.packeta.com/v5/${this.options.api_key}${url}/json?lang=en`,
        {
          ...data,
          headers: {
            "Content-Type": "application/json",
            ...data?.headers,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Packeta API error: ${response.statusText}`);
      }

      const response_data = await response.json();
      return response_data;
    } catch (error) {
      console.error("Error fetching Packeta API:", error);
      throw error;
    }
  }

  private async send_REST_API_Request(data: RequestInit): Promise<any> {
    try {
      const response = await fetch(`https://www.zasilkovna.cz/api/rest`, {
        ...data,
      });

      if (!response.ok) {
        throw new Error(`Packeta API error: ${response.statusText}`);
      }

      const response_data = await new Parser({
        explicitArray: false,
      }).parseStringPromise(await response.text());

      this.logger_.info(
        `Packeta API response status: ${response.status} - ${
          response.statusText
        } - ${JSON.stringify(response_data, null, 2)}`
      );

      return response_data;
    } catch (error) {
      console.error("Error fetching Packeta API:", error);
      throw error;
    }
  }

  async getCarriers(): Promise<PacketaCarrier[]> {
    return await this.send_API_V5_Request("/carrier");
  }

  async createShipment(data: {
    order: any;
    fulfillment: any;
    items: any[];
    data: {
      shipping_carrier_id: string;
      shipping_carrier_name: string;
      pickup_branch: any;
    };
  }): Promise<any> {
    const { order, fulfillment, items, data: fulfillment_data } = data;

    const order_data = await fetch(
      `${BACKEND_URL}/get-order-payment-provider/${order.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          jwt_secret: process.env.JWT_SECRET!,
        }),
      }
    )
      .then(async (res) => {
        const result = await res.json();

        if (!res.ok) {
          throw new MedusaError(
            MedusaError.Types.NOT_FOUND,
            `Order with ID ${order.id} not found`
          );
        }
        return result;
      })
      .catch((error) => {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `Order with ID ${order.id} not found`
        );
      });

    this.logger_.info(JSON.stringify(order, null, 2));

    this.logger_.info(JSON.stringify(order_data, null, 2));

    const payment_provider_id =
      order_data.payment_collections[0].payment_sessions[0].provider_id;

    const isCOD = payment_provider_id === "pp_system_default";

    const requestBody = {
      createPacket: {
        apiPassword: this.options.api_key_password,
        packetAttributes: {
          addressId:
            fulfillment_data?.pickup_branch?.id ||
            fulfillment_data.shipping_carrier_id,
          name: order.shipping_address.first_name,
          surname: order.shipping_address.last_name,
          phone: order.shipping_address.phone || order.customer.phone,
          email: order_data.email,
          value: order_data.summary.paid_total,
          currency: order.currency_code.toUpperCase(),
          cod: isCOD ? Math.floor(order.total) : 0,
          weight:
            items.reduce((sum, item) => sum + (item?.variant?.weight || 0), 1) /
              1000 || 0.1,
          eshop: "cbdsvet.cz",
          number: order_data.display_id,
          street: order.shipping_address.address_1,
          houseNumber: order.shipping_address.address_2,
          city: order.shipping_address.city,
          zip: order.shipping_address.postal_code,
        },
      },
    };

    const { response } = await this.send_REST_API_Request({
      method: "POST",
      body: new Builder().buildObject(requestBody),
    });

    return response.result;
  }
}
