import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

export const POST = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params;
  
  const body = typeof req.body === "string" ? JSON.parse(req.body as any) : req.body;


  if (body.jwt_secret !== process.env.JWT_SECRET) {
    return res.status(403).json({ message: "Forbidden" });
  }

    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

    const {
      data: [order],
    } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "payment_collections.id",
        "payment_collections.payment_sessions.provider_id",
        "*"
      ],
      filters: { id: [id] },
    });


    
  if (!order) {
    console.error(`API-ERR::Order with ID ${id} not found`);
    return res.status(404).json({ message: "Order not found" });
  }

  res.status(200).json( order );
};
