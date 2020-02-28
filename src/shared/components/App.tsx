import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../routes";
import { NotFound } from "./NotFound";

const NavBar = styled.ul({
    backgroundColor: "red",
});

/**
 * The core App. This is the entry-point into the React application.
 *
 * @returns A react functional component that drives the entire applications.
 */
export const App = () => (
    <>
        <NavBar>
            {routes.map(([route]) => (
                <li key={route}>
                    <Link to={route}>{route}</Link>
                </li>
            ))}
            <li>
                <Link to="/not-found">Dead link</Link>
            </li>
        </NavBar>
        <Switch>
            {routes.map(([route, component]) => (
                <Route key={route} exact path={route} component={component} />
            ))}
            <Route component={NotFound} />
        </Switch>
    </>
);
