import { WorkflowData, createWorkflow } from "@medusajs/workflows-sdk"

export const batchProductsWorkflowId = "batch-products"
export const batchProductsWorkflow = createWorkflow(
  batchProductsWorkflowId,
  (input: WorkflowData<any>): WorkflowData<any> => {
    // TODO: Call the create/update/remove workflows in parallel here
    return []
  }
)
