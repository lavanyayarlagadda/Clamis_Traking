import { privateRoutes } from "./PrivateRoutes";
import { publicRoutes } from "./PublicRoutes";
import { AppRoute } from "./RouteTypes";

export const appRoutes: AppRoute[] = [...privateRoutes, ...publicRoutes];
