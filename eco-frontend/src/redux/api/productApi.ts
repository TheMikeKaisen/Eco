import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, MessageResponse, SearchProductRequest, categoriesResponse, deleteProductRequest, newProductRequest, productResponse, searchProductsResponse, updateProductRequest } from "../../types/api-types";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
  }),
  tagTypes:["product"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductsResponse, string>({
      query: () => "latest",
      providesTags: ['product']
    }),
    allProducts: builder.query<AllProductsResponse, string>({
      query: (id) => `admin-products?id=${id}`,
      providesTags: ['product']
    }),
    categories: builder.query<categoriesResponse, string>({
      query: () => "categories",
      providesTags: ['product']
    }),
    searchProducts: builder.query<searchProductsResponse, SearchProductRequest>({
      query: ({price, search, sort, category, page}) => {
        

        let base = `all?search=${search}&page=${page}`
        if(price) base += `&price=${price}`
        if(sort) base += `&sort=${sort}`
        if(category) base += `&category=${category}`

        return base
      },
      providesTags: ['product']
    }),
    productDetails: builder.query<productResponse, string>({
      query: (id) => id,
    }),
    newProduct: builder.mutation<MessageResponse, newProductRequest>({
      query: ({formData, id}) => ({
        url: `new?id=${id}`,
        method: 'POST', 
        body: formData
      }),
      invalidatesTags:['product']
    }),
    updateProduct: builder.mutation<MessageResponse, updateProductRequest>({
      query: ({formData, userId, productId}) => ({
        url: `${productId}?id=${userId}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags:['product']
    }),
    deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
      query: ({ userId, productId}) => ({
        url: `${productId}?id=${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags:['product']
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllProductsQuery,
  useCategoriesQuery,
  useSearchProductsQuery,
  useNewProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productApi;
