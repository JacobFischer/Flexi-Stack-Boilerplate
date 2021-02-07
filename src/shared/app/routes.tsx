import React from "react";
import { Route, StaticRouter, Switch } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";
import { pagesList, pageNotFound } from "../pages";

/**
 * Lol wut.
 *
 * @param props - Imagine dragons.
 * @param props.render - Js doc why.
 * @returns Stuff.
 */
export const Routes = <T extends React.ReactNode>(props: {
    render: (page: typeof pagesList[number], matchedRoute: boolean) => T;
}) => (
    <Switch>
        {pagesList.map((page) => (
            <Route
                key={page.route}
                exact
                path={page.route}
                render={() => props.render(page, true)}
            />
        ))}
        <Route render={() => props.render(pageNotFound, false)} />
    </Switch>
);

/**
 * Quickly checks if a location string matches any registered route.
 *
 * @param location - The location to check.
 * @returns True if a match was made, false otherwise.
 */
export function matchingRoute(location: string): boolean {
    const matchedRoute = renderToStaticMarkup(
        <StaticRouter location={location}>
            <Routes render={(_, matchedRoute) => String(matchedRoute)} />
        </StaticRouter>,
    );

    // boolean was transformed to a string via the quick react render above
    return matchedRoute == String(true);
}
