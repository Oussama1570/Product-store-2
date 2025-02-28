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
        url: "/", // Make sure this matches the backend route
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderByEmail: builder.query({
      query: (email) => `/email/${email}`,
      providesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, field, value }) => ({
        url: `/${orderId}`, // Ensure this matches the backend API
        method: "PATCH",
        body: { [field]: value }, // Dynamically update either "isPaid" or "isDelivered"
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation, // Ensure this is correctly exported
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = ordersApi;

export default ordersApi;
