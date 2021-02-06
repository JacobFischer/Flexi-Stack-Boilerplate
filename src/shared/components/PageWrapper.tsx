import React from "react";
import styled from "styled-components";
import Header from "./Header";
import NavBar from "./NavBar";

const Wrapper = styled.div({
    width: "100%",
});

const PageWrapper: React.FunctionComponent<{
    title: string;
    children: React.ReactNode;
}> = (props) => (
    <Wrapper>
        <Header>{props.title}</Header>
        <NavBar />
        <section>{props.children}</section>
    </Wrapper>
);

export default PageWrapper;
