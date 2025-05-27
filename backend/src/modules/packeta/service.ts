import {
  AbstractFulfillmentProviderService,
  MedusaError,
} from "@medusajs/framework/utils";
import {
  CalculatedShippingOptionPrice,
  CalculateShippingOptionPriceDTO,
  CreateFulfillmentResult,
  CreateShippingOptionDTO,
  FulfillmentOption,
  Logger,
} from "@medusajs/framework/types";
import { PacketaClient } from "./client";

export type InjectedDependencies = {
  logger: Logger;
};

export type Options = {
  api_key: string;
  api_key_password: string;
  api_url?: string;
};

class PacketaProviderService extends AbstractFulfillmentProviderService {
  static identifier = "packeta";
  protected logger_: Logger;
  protected options_: Options;

  protected client: PacketaClient;

  constructor({ logger }: InjectedDependencies, options: Options) {
    super();

    this.logger_ = logger;
    this.options_ = options;

    this.client = new PacketaClient({ logger }, options);
  }

  async getFulfillmentOptions(): Promise<FulfillmentOption[]> {
    const carriers = await this.client.getCarriers();
    const fulfillmentOptions: FulfillmentOption[] = [];

    carriers
      .filter((carrier) => carrier.available === "true")
      .forEach((carrier) => {
        fulfillmentOptions.push({
          id: `${carrier.id}`,
          name: `${carrier.name} ${
            carrier.pickupPoints === "true" ? "- PUDOs" : ""
          }`,
          pickupPoints: carrier.pickupPoints === "true",
          available: carrier.available === "true",
        });
      });

    return fulfillmentOptions;
  }

  async validateOption(data: any): Promise<boolean> {
    return data && data.id && data.available && data.name ? true : false;
  }

  async validateFulfillmentData(
    optionData: any,
    data: any,
    context: any
  ): Promise<any> {
    const shipping_carrier_id = optionData.id;
    const shipping_carrier_name = optionData.name;
    const { items, shipping_address, customer } = context;

    this.logger_.info(JSON.stringify({ data, context }, null, 2));

    // Validating required fields
    if (!shipping_carrier_id || !shipping_carrier_name) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Shipping carrier ID or name is missing"
      );
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Cart Items are missing or invalid"
      );
    }

    // check items weight
    if (
      !items.every((item) => item.variant.weight && item.variant.weight > 0)
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "All items must have a valid weight greater than 0"
      );
    }

    if (!shipping_address.address_1 || !shipping_address.country_code) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Shipping address or country code is missing"
      );
    }

    if (!shipping_address.postal_code) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Shipping address postal code is missing"
      );
    }
    // EU postal code format: 5 digits, optionally with a space (e.g., '11111' or '111 11')
    const postalCode = shipping_address.postal_code.trim();
    const euPostalCodeRegex = /^\d{3}\s?\d{2}$/;
    if (!euPostalCodeRegex.test(postalCode)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Shipping address postal code format is invalid (expected format: '11111' or '111 11')"
      );
    }

    if (!customer || !customer.email) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Customer email is missing"
      );
    }

    if (!shipping_address.phone && !customer.phone) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Phone number is missing"
      );
    }

    return {
      ...data,
      shipping_carrier_id,
      shipping_carrier_name,
    };
  }

  async createFulfillment(
    data: any,
    items: any,
    order: any,
    fulfillment: any
  ): Promise<CreateFulfillmentResult> {
    const externalData = [];

    const response = await this.client.createShipment({
      data,
      items,
      order,
      fulfillment,
    });

    return {
      data: {
        ...((fulfillment.data as object) || {}),
        ...externalData,
      },
      labels: [
        {
          tracking_number: response.id,
          tracking_url: `https://tracking.packeta.com/en/${response.id}`,
          label_url: "string",
        },
      ],
    };
  }

  async calculatePrice(
    optionData: CalculateShippingOptionPriceDTO["optionData"],

    data: CalculateShippingOptionPriceDTO["data"],

    context: CalculateShippingOptionPriceDTO["context"]
  ): Promise<CalculatedShippingOptionPrice> {
    // const price = 0;

    // return {
    //   calculated_amount: price,
    //   // Update this boolean value based on your logic
    //   is_calculated_price_tax_inclusive: true,
    // };
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented1"
    );
  }

  async canCalculate(data: CreateShippingOptionDTO): Promise<boolean> {
    return false;
  }

  async cancelFulfillment(data: Record<string, unknown>): Promise<any> {
    // const { external_id } = data as {
    //   external_id: string;
    // };

    // await this.client.cancel(external_id);
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented2"
    );
  }

  async createReturnFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<CreateFulfillmentResult> {
    // const externalData = await this.client.createReturn(fulfillment);
    // return {
    //   data: {
    //     ...((fulfillment.data as object) || {}),
    //     ...externalData,
    //   },
    // };
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented3"
    );
  }

  async getFulfillmentDocuments(data: any): Promise<never[]> {
    // return await this.client.documents(data);
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented4"
    );
  }

  async getReturnDocuments(data: any): Promise<never[]> {
    // return await this.client.documents(data);
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented5"
    );
  }

  async getShipmentDocuments(data: any): Promise<never[]> {
    // return await this.client.documents(data);
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented6"
    );
  }

  async retrieveDocuments(
    fulfillmentData: any,

    documentType: any
  ): Promise<void> {
    // return await this.client.documents(
    //   fulfillmentData,

    //   documentType
    // );
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Method not implemented7"
    );
  }
}

export default PacketaProviderService;
