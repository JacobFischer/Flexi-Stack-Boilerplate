import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { route as routeAbout } from '../pages/about/route';
import { route as routeHome } from '../pages/home/route';

const List = styled.ul({
  backgroundColor: 'darkgreen',
});

const Item = styled.li({
  color: 'white',
  display: 'inline',
  listStyle: 'none',
  padding: '0 0.5rem',
});

const NavBar: React.FunctionComponent = () => (
  <List>
    <Item>
      <Link to={routeHome}>Home</Link>
    </Item>
    <Item>
      <Link to={routeAbout}>About</Link>
    </Item>
    <Item>
      <Link to="/nowhere">Nowhere</Link>
    </Item>
  </List>
);

export default NavBar;
