import React from "react";
import universal from "react-universal-component";
import { About } from "./components/About";
import { SomePage } from "./components/SomePage";
import { StatefullComponent } from "./components/StatefullComponent";

const LoadableHome = universal(import("./components/Home"));

export const routesObject = {
    "/": LoadableHome,
    "/about": () => <About creator="Jacob Fischer" />,
    "/some-page": SomePage,
    "/clicker": StatefullComponent,
};

export const routeExists = (path: string) => Object.prototype.hasOwnProperty.call(routesObject, path);

export const routes = Object.entries(routesObject).sort(([a], [b]) => a.localeCompare(b));
