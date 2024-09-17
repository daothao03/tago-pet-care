import { adminRoutes } from "./adminRoutes";
import { caregiverRoutes } from "./caregiverRoutes";

export const privateRoutes = [...adminRoutes, ...caregiverRoutes];
