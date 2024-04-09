import { createProductsWorkflow } from "@medusajs/core-flows"
import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "../../../../types/routing"
import { BatchMethodRequest } from "../../../utils/validators"
import { AdminCreateProductType, AdminUpdateProductType } from "../validators"

export const POST = async (
  req: AuthenticatedMedusaRequest<
    BatchMethodRequest<AdminCreateProductType, AdminUpdateProductType>
  >,
  res: MedusaResponse
) => {
  const input = req.validatedBody

  const { result, errors } = await batchProductsWorkflow(req.scope).run({
    input,
    throwOnError: false,
  })

  if (Array.isArray(errors) && errors[0]) {
    throw errors[0].error
  }

  // TODO: Refetch all products that were handled
  // const product = await refetchProduct(
  //   result[0].id,
  //   req.scope,
  //   req.remoteQueryConfig.fields
  // )
  res.status(200).json({ ...result })
}
