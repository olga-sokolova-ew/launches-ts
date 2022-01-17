import {
	Box, Grid, Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
	FC, useCallback, useEffect, useRef, useState
} from "react";
import { useIntl } from "react-intl";
import type { LaunchAdapterType } from "../../../redux/services/adapter.types";
import { useGetLaunchesQuery } from "../../../redux/services/api";
import { REQUEST_QNT } from "../../../utils/const";
import { Loader } from "../../common/Loader";
import { LaunchCard } from "../LaunchCard";

const useStyles = makeStyles({
	launchesWrapper: {
		width: "100%",
	},
	launchesTitle: {
		textAlign: "center",
	},
	loaderWrapper: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	}
});

const options = {
	root: null,
	rootMargin: "0px",
	threshold: 1.0
};

export const LaunchesBlock: FC = () => {
	const [currentLaunches, setCurrentLaunches] = useState<LaunchAdapterType[]>([]);
	const [launchesQnt, setLaunchesQnt] = useState<number>(0);
	const classes = useStyles();
	const intl = useIntl();
	const [totalCount, setTotalCount] = useState<number>(1);

	const observerRef = useRef<IntersectionObserver>();

	const { data: currentData = null,
		isError: isLaunchesError,
		isFetching: isLaunchesFetching } = useGetLaunchesQuery(launchesQnt);

	useEffect(
		() => {
			if (currentData && currentData.launches.length > 0) {
				setTotalCount(currentData.totalQnt);

				const allLaunches = new Set([...currentLaunches, ...currentData.launches]);
				setCurrentLaunches(Array.from(allLaunches));
			}
		},
		[currentData]
	);

	const infinityScrollCalback = useCallback(
		(htmlNode: Element) => {
			if (isLaunchesFetching) {
				return;
			}

			if (observerRef?.current) {
				observerRef.current.disconnect();
			}

			observerRef.current = new IntersectionObserver(
				entries => {
					const isAbleToLoadMore =
						!isLaunchesFetching && currentLaunches.length < totalCount;
					const [entry] = entries;

					if (entry.isIntersecting && isAbleToLoadMore) {
						setLaunchesQnt((prev) => prev + REQUEST_QNT);
					}
				},
				options
			);

			if (htmlNode) {
				observerRef.current?.observe(htmlNode);
			}
		},
		[isLaunchesFetching, totalCount, currentLaunches.length]
	);

	useEffect(
		() => {
			if (currentLaunches.length < totalCount) {
				if (currentData && currentData.totalQnt) {
					setTotalCount(currentData?.totalQnt);
				}
			}
		},
		[launchesQnt]
	);

	return (
		<div className={classes.launchesWrapper}>
			<Typography
				variant="h2"
				mb='30px'
				className={classes.launchesTitle}
			>
				{intl.formatMessage({ id: "spaceflightLaunches" })}
			</Typography>
			<div >
				<Grid
					container
					spacing={2}

				>
					{(currentLaunches.length > 0) &&
						currentLaunches.map(launch => {

							return (
								<Grid
									item
									xs={12}
									md={6}
									key={launch.id}
								>
									<LaunchCard
										launch={launch}
									/>
								</Grid>
							);
						})
					}
					{(currentLaunches.length < totalCount) &&
						<Box
							className={classes.loaderWrapper}
							ref={infinityScrollCalback}
						>
							<Loader />
							{isLaunchesFetching && <p>Loading ...</p>}

						</Box >}
					{isLaunchesError &&
						<Box
							className={classes.loaderWrapper}
						>
							<p>Server error ...</p>
						</Box>}

				</Grid>
			</div>

		</div>
	);
};
