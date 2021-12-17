import { createAsyncThunk } from "@reduxjs/toolkit";

import { getEventList} from "services/event";
import {eventAdapter} from "utils/adapter";
import {showToast, showServerDetail} from "utils/toastHelper";
import type { EventResult } from "utils/adapter.types";
import type { ErrorReceived } from "../types/redux.types";

export const fetchEventList = createAsyncThunk(
	"event/fetchEventList",
	async (
		_:null, { rejectWithValue }
	) => {
		try {
			const response = await getEventList();
			//if (!response.status === 200) {
			if (response.status < 200 && response.status >= 300) {	
				throw new Error("Server Error!");
			}

			const result = response.data.results.map((item: EventResult ) => eventAdapter(item));

			return result;
		} catch (error) {
			const _error = error as ErrorReceived;
			showToast();
			showServerDetail(_error?.response?.data.detail);
			return rejectWithValue(_error?.response?.data.error);
		}
	}
);