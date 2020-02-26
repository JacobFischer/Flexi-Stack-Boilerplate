import loadable from "@loadable/component";
import React from "react";
import { About } from "./components/About";
import { SomePage } from "./components/SomePage";
import { StatefullComponent } from "./components/StatefullComponent";

const Home = loadable(() => import("./components/Home"), {
    fallback: <em>Loading</em>,
});

export const routesObject = {
    "/": Home,
    "/about": () => <About creator="Jacob Fischer" />,
    "/some-page": SomePage,
    "/clicker": StatefullComponent,
};

export const routeExists = (path: string) => Object.prototype.hasOwnProperty.call(routesObject, path);

export const routes = Object.entries(routesObject).sort(([a], [b]) => a.localeCompare(b));
