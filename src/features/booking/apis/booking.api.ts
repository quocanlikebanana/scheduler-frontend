import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { env } from "../../../app/env";

const url = env.baseUrl;

export const bookingApi = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: url }),
	endpoints: () => ({}),
});
