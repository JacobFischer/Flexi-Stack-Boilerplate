import React from "react";
import { About } from "./components/About";
import { SomePage } from "./components/SomePage";
import { StatefullComponent } from "./components/StatefullComponent";

/*
const delay = async (time: number) => new Promise((resolve) => setTimeout(resolve, time));
const Loading = () => <em>Loading</em>;

const LoadableHome = reactLoadable({
    loader: async () => {
        await delay(1000);
        return import("./components/Home");
    },
    loading: Loading,
    render: ({ Home }) => <Home />,
});
*/

import { Home } from "./components/Home";

export const routesObject = {
    "/": Home,
    "/about": () => <About creator="Jacob Fischer" />,
    "/some-page": SomePage,
    "/clicker": StatefullComponent,
};

export const routeExists = (path: string) => Object.prototype.hasOwnProperty.call(routesObject, path);

export const routes = Object.entries(routesObject).sort(([a], [b]) => a.localeCompare(b));
