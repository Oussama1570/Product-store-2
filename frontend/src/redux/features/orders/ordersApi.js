// src/redux/features/orders/ordersApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl().replace(/\/$/, "")}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
        query: ({ orderId, field, value }) => ({
          url: `/${orderId}`, // Assuming your API allows updating the order with its ID
          method: "PATCH",
          body: { [field]: value }, // Dynamically updating either "isPaid" or "isDelivered"
          credentials: "include",
        }),
        invalidatesTags: ["Orders"], 
      }),
      
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation, // Export the updateOrder mutation hook
} = ordersApi;

export default ordersApi;
