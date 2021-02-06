import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.ul({
    backgroundColor: "darkgreen",
});

const Item = styled.li({
    color: "white",
    display: "inline",
    listStyle: "none",
    padding: "0 0.5rem",
});

const NavBar: React.FunctionComponent = () => (
    <List>
        <Item>
            <Link to="/">Home</Link>
        </Item>
        <Item>
            <Link to="/about">About</Link>
        </Item>
        <Item>
            <Link to="/nowhere">Nowhere</Link>
        </Item>
    </List>
);

export default NavBar;
