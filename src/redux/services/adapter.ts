import {
	CurrentLaunch, EventResult, LaunchResult
} from "./adapter.types";

export const launchAdapter = (incomingLaunch: LaunchResult) => {
	const adaptedLaunch = {
		id: incomingLaunch.id,
		launchName: incomingLaunch.name,
		launchImg: incomingLaunch.img_url,
		launchDate: incomingLaunch.net,
		rocketId: incomingLaunch.rocket.configuration.id,
	};
	return adaptedLaunch;
};

export const eventAdapter = (incomingEvent: EventResult) => {
	const adaptedEvent = {
		id: incomingEvent.id,
		eventName: incomingEvent.name,
		eventImg: incomingEvent.feature_image,
		eventDate: incomingEvent.date,
	};
	return adaptedEvent;
};

export const rocketAdapter = (incomingRocket: EventResult) => {
	const adaptedRocket = {
		id: incomingRocket.id,
		eventName: incomingRocket.name,
		eventImg: incomingRocket.feature_image,
	};
	return adaptedRocket;
};

export const currentLaunchAdapter = (incomingCurrentLaunch: CurrentLaunch) => {
	const adaptedLaunch = {
		id: incomingCurrentLaunch.id,
		launchName: incomingCurrentLaunch.name,
		launchImg: incomingCurrentLaunch.image_url,
		videoURLs: incomingCurrentLaunch.vidURLs,
		rocketDescription: incomingCurrentLaunch.rocket.configuration.description,
		launchDestination: incomingCurrentLaunch.mission?.orbit,
		launchMission: incomingCurrentLaunch.mission?.type,
		launchDate: incomingCurrentLaunch.net,
	};
	return adaptedLaunch;
};
