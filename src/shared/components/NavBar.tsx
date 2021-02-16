import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

import { route as routeAbout } from '../pages/about/route';
import { route as routeHome } from '../pages/home/route';

const List = styled.ul(({ theme }) => ({
  backgroundColor: theme.secondary,
  margin: '0.5rem 0',
  padding: '0.5rem 0',
}));

const Item = styled.li({
  color: 'white',
  display: 'inline',
  listStyle: 'none',
  padding: '0 0.5rem',
});

const StyledLink = styled(Link)({
  color: 'white',
});

const LinkItem: React.FunctionComponent<LinkProps> = (props) => (
  <Item>
    <StyledLink {...props} />
  </Item>
);

const NavBar: React.FunctionComponent = () => (
  <List>
    <LinkItem to={routeHome}>Home</LinkItem>
    <LinkItem to={routeAbout}>About</LinkItem>
    <LinkItem to="/nowhere">Nowhere</LinkItem>
  </List>
);

export default NavBar;
