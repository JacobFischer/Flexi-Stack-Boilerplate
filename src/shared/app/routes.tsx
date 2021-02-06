import React from "react";
import { Route, Switch } from "react-router-dom";
import * as pages from "../pages";
import * as notFound from "../pages/404";

type PageExport = {
    title: string;
    route: string;
    Component: React.FunctionComponent;
};

const pagesList: PageExport[] = Object.values(pages).sort((a, b) =>
    a.route.localeCompare(b.route),
);

/**
 * Lol wut.
 *
 * @param props - Imagine dragons.
 * @param props.render - Js doc why.
 * @returns Stuff.
 */
export const Routes = <T extends React.ReactNode>(props: {
    render: (page: PageExport) => T;
}) => (
    <Switch>
        {pagesList.map((page) => (
            <Route
                key={page.route}
                exact
                path={page.route}
                render={() => props.render(page)}
            />
        ))}
        <Route render={() => props.render(notFound)} />
    </Switch>
);
