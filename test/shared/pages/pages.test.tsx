import React from "react";
import { StaticRouter } from "react-router";
import renderer from "react-test-renderer";
import { pagesList, pageNotFound } from "../../../src/shared/pages";
import { Body, Head } from "../../../src/shared/app";

describe("all pages", () => {
    [...pagesList, pageNotFound].forEach((page) => {
        const { title, route, Component } = page;

        const snapshot = (element: React.ReactElement) =>
            renderer
                .create(
                    <StaticRouter location={route}>{element}</StaticRouter>,
                )
                .toJSON();

        describe(`page '${title}'`, () => {
            it("should be the correct export shape", () => {
                expect(typeof page).toBe("object");
                expect(typeof page.Component).toBe("function");
                expect(typeof page.route).toBe("string");
                expect(typeof page.title).toBe("string");
            });

            it("renders", () => {
                expect(snapshot(<Component />)).toMatchSnapshot();
            });

            it("renders as an App page", () => {
                expect(
                    snapshot(
                        <html>
                            <head>
                                <Head />
                            </head>
                            <body>
                                <Body />
                            </body>
                        </html>,
                    ),
                ).toMatchSnapshot();
            });
        });
    });
});
