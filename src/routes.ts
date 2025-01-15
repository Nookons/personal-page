import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import {HOME_ROUTE, PROJECTS_OVERVIEW, PROJECTS_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE} from "./utils/const";
import Projects from "./pages/Projects/Projects";
import ProjectOverview from "./pages/Projects/ProjectOverview";
import SignUp from "./pages/SignUp/SignUp";


interface Route {
    path: string;
    Component: React.ComponentType<any>;
    label?: string;
}

type PublicRoutes = Route[];

// routes for users
export const publicRoutes: PublicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: SIGN_IN_ROUTE,
        Component: SignIn,
    },
    {
        path: SIGN_UP_ROUTE,
        Component: SignUp,
    },
    {
        path: PROJECTS_ROUTE,
        Component: Projects,
    },
    {
        path: PROJECTS_OVERVIEW,
        Component: ProjectOverview,
    },
];