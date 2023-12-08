import { Router } from "express"
import { ProductCategory } from "../../../../models"
import { PaginatedResponse } from "../../../../types/common"
import middlewares, { transformStoreQuery } from "../../../middlewares"

import listProductCategories, {
  StoreGetProductCategoriesParams,
} from "./list-product-categories"

import getProductCategory, {
  StoreGetProductCategoriesCategoryParams,
} from "./get-product-category"

const route = Router()

export default (app) => {
  app.use("/product-categories", route)

  route.get(
    "/",
    transformStoreQuery(StoreGetProductCategoriesParams, {
      defaultFields: defaultStoreProductCategoryFields,
      allowedFields: allowedStoreProductCategoryFields,
      defaultRelations: defaultStoreProductCategoryRelations,
      isList: true,
    }),
    middlewares.wrap(listProductCategories)
  )

  route.get(
    "/:id",
    transformStoreQuery(StoreGetProductCategoriesCategoryParams, {
      defaultFields: defaultStoreProductCategoryFields,
      allowedFields: allowedStoreProductCategoryFields,
      defaultRelations: defaultStoreProductCategoryRelations,
      isList: false,
    }),
    middlewares.wrap(getProductCategory)
  )

  return app
}

export const defaultStoreProductCategoryRelations = [
  "parent_category",
  "category_children",
]

export const defaultStoreCategoryScope = {
  is_internal: false,
  is_active: true,
}

export const defaultStoreProductCategoryFields = [
  "id",
  "name",
  "description",
  "handle",
  "parent_category_id",
  "created_at",
  "updated_at",
  "rank",
  "metadata",
]

export const allowedStoreProductCategoryFields = [
  "id",
  "name",
  "description",
  "handle",
  "parent_category_id",
  "created_at",
  "updated_at",
  "rank",
  "metadata",
]

/**
 * @schema StoreGetProductCategoriesCategoryRes
 * type: object
 * description: "The product category's details."
 * x-expanded-relations:
 *   field: product_category
 *   relations:
 *     - category_children
 *     - parent_category
 * required:
 *   - product_category
 * properties:
 *   product_category:
 *     description: "Product category details."
 *     $ref: "#/components/schemas/ProductCategory"
 */
export type StoreGetProductCategoriesCategoryRes = {
  product_category: ProductCategory
}

/**
 * @schema StoreGetProductCategoriesRes
 * type: object
 * description: "The list of product categories with pagination fields."
 * x-expanded-relations:
 *   field: product_categories
 *   relations:
 *     - category_children
 *     - parent_category
 * required:
 *   - product_categories
 *   - count
 *   - offset
 *   - limit
 * properties:
 *   product_categories:
 *      type: array
 *      description: "An array of product categories details."
 *      items:
 *        $ref: "#/components/schemas/ProductCategory"
 *   count:
 *      type: integer
 *      description: The total number of items available
 *   offset:
 *      type: integer
 *      description: The number of product categories skipped when retrieving the product categories.
 *   limit:
 *      type: integer
 *      description: The number of items per page
 */
export type StoreGetProductCategoriesRes = PaginatedResponse & {
  product_categories: ProductCategory[]
}

export * from "./get-product-category"
export * from "./list-product-categories"
