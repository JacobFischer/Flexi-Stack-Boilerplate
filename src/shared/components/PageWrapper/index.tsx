import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import NavBar from '../NavBar';
import logoSrc from './logo.svg';

const Wrapper = styled.div({
  width: '100%',
});

const Logo = styled.img({
  width: '2rem',
  height: '2rem',
});

const PageWrapper: React.FunctionComponent<{
  title: string;
  children: React.ReactNode;
}> = (props) => (
  <Wrapper>
    <Header>
      <Logo src={logoSrc} />
      {props.title}
    </Header>
    <NavBar />
    <section>{props.children}</section>
  </Wrapper>
);

export default PageWrapper;
