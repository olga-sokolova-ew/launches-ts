import { lazy } from "react";
import { AppRouteEnum } from "types/Enums";
import type {PrivatRoutes} from "./routes.types";

const LaunchPage = lazy(() => import("../pages/LaunchPage/"));
const AddProductPage = lazy(() => import("../pages/AddProductPage"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const privateRoutes: PrivatRoutes = [
	{
		component: LaunchPage,
		path: AppRouteEnum.LAUNCH,
		exact: true,
		isAuth: true
	},
	{
		component: AddProductPage,
		path: AppRouteEnum.ADDPRODUCT_PAGE,
		exact: true,
		isAuth: true
	},
	{
		component: Dashboard,
		path: AppRouteEnum.DASHBOARD,
		exact: true,
		isAuth: true
	},
];
