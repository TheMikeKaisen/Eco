import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PieResponse, statsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/dashboard`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<statsResponse, string> ({
        query: id=> `stats?id=${id}`
    }),
    pie: builder.query<PieResponse, string> ({
        query: id=> `pie?id=${id}`
    }),
    bar: builder.query<string, string> ({
        query: id=> `bar?id=${id}`
    }),
    line: builder.query<string, string> ({
        query: id=> `line?id=${id}`
    }),
  }),
});

export const {useStatsQuery, useBarQuery, useLineQuery, usePieQuery} = dashboardApi;
