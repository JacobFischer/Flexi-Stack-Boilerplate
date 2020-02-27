import React from "react";
import { StaticRouter } from "react-router";
import renderer from "react-test-renderer";
import { App } from "../../../src/shared/components/App";

const renderApp = (location?: string): renderer.ReactTestRendererJSON | null =>
    renderer
        .create(
            <StaticRouter location={location}>
                <App />
            </StaticRouter>,
        )
        .toJSON();

describe("App component", () => {
    it("renders", () => {
        expect(renderApp()).toMatchSnapshot();
    });

    it("renders the index Home page", () => {
        expect(renderApp("/")).toMatchSnapshot();
    });

    it("renders the About page", () => {
        expect(renderApp("/about")).toMatchSnapshot();
    });

    it("renders the SomePage page", () => {
        expect(renderApp("/some-page")).toMatchSnapshot();
    });

    it("renders the NotFound page on bad routes", () => {
        expect(renderApp("/hey-i-wont-exist")).toMatchSnapshot();
    });
});
