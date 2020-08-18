import loadable from "@loadable/component";
import React from "react";
import { About } from "./components/About";
import { SomePage } from "./components/SomePage";
import { Clicker } from "./components/Clicker";

const Home = loadable(() => import("./components/Home"), {
    fallback: <em>Loading</em>,
});

export const routesObject = {
    "/": Home,
    "/about": () => <About creator="Jacob Fischer" />,
    "/some-page": SomePage,
    "/clicker": Clicker,
};

export const routeExists = (path: string) =>
    Object.prototype.hasOwnProperty.call(routesObject, path);

export const routes = Object.entries(routesObject).sort(([a], [b]) =>
    a.localeCompare(b),
);
