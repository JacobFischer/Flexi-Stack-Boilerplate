// This is the main entry point into the app
import React from "react";
import { css } from "styled-components";
import { Helmet } from "react-helmet";
import { Routes } from "./routes";
import { useLocation, StaticRouter } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";

const globalStyle = css({
    body: {
        backgroundColor: "lightgrey",
        fontSize: "16px",
        padding: "1rem",
    },
});

const globalStyleString = globalStyle.join("");

export const Head: React.FunctionComponent = () => {
    // Ideally we could nest react-router route matches in the title
    // however, react-helmet **only** permits strings at the moment,
    // no other react nodes.
    // So, we'll just manually render out the title first here
    const title = renderToStaticMarkup(
        <StaticRouter location={useLocation()}>
            <Routes render={({ title }) => title}></Routes>
        </StaticRouter>,
    );

    return (
        <Helmet>
            <title>{title}</title>
            <style>{globalStyleString}</style>
        </Helmet>
    );
};
