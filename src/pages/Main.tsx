import { FC } from "react";
import {eventAdapter} from "../utils/adapter";


//import { Loader } from "../components/common/Loader";

import { useGetEventsQuery } from "../services/api";


export const Main: FC = () => {

	const { data=null, isFetching } = useGetEventsQuery();
	let events;
	console.log(isFetching);
	console.log(data);
	(data !== null ) ? 
		 events = data.results.map((item) => eventAdapter(item))
		:
		events = null;

	console.log(events);	
	return (
	    <p> Data : {data ? data.results[0].name : `Server error`}  </p>

							
	);
};

