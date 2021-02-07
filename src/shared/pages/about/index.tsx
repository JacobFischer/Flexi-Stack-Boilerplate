import React from "react";
import PageWrapper from "../../components/PageWrapper";

export const route = "/about";
export const title = "About";
export const Component: React.FunctionComponent = () => (
    <PageWrapper title={title}>
        <div>About my boy</div>
    </PageWrapper>
);
