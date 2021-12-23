import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIRoute } from "../utils/const";
import {eventAdapter} from "../utils/adapter";
import type { EventResult } from "../utils/adapter.types";
import { EventData } from "../utils/adapter.types";
import type { EventAdapterType } from "../utils/adapter";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;





// Define a service using a base URL and expected endpoints
export const eventSlice = createApi({
	reducerPath: "eventSlice",
	baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
	endpoints: (builder) => ({
		getEvents: builder.query<EventAdapterType[], void>({
			query: () => APIRoute.EVENTS,
			transformResponse: (response: EventData) => {
			
				return response.results.map((item) => eventAdapter(item));

			}
		}),
	}),
});

export const { useGetEventsQuery } = eventSlice;