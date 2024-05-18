import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    AllOrdersResponse,
    MessageResponse,
    NewOrderRequest,
    OrderDetailsResponse
} from "../../types/api-types";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `my?id=${id}`,
        providesTags: ["orders"],
      }),
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `all?id=${id}`,
        providesTags: ["orders"],
      }),
    }),
    orderDetails: builder.query<OrderDetailsResponse, string>({
      query: (id) => ({
        url: id,
    }),
    providesTags: ["orders"],
    }),
    updateOrder: builder.mutation<
      MessageResponse,
      { orderId: string; userId: string }
    >({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
        invalidatesTags: ["orders"],
      }),
    }),

    deleteOrder: builder.mutation<
      MessageResponse,
      { orderId: string; userId: string }
    >({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useMyOrdersQuery,
  useAllOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
