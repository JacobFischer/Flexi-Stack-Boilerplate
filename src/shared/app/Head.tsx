// This is the main entry point into the app
import React from 'react';
import { Routes } from './routes';
import { useLocation, StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import globalsCss from './globals.css';

export const Head: React.FunctionComponent<{
  // TODO: this is kind of hack-y. react-helmet MUST have head children as
  // direct children,
  Wrapper?: React.ElementType;
}> = ({ Wrapper = React.Fragment }) => {
  // Ideally we could nest react-router route matches in the title
  // however, react-helmet **only** permits strings at the moment,
  // no other react nodes.
  // So, we'll just manually render out the title here to make it happy
  const title = renderToStaticMarkup(
    <StaticRouter location={useLocation()}>
      <Routes render={({ title }) => title}></Routes>
    </StaticRouter>,
  );

  return (
    <Wrapper>
      <link rel="stylesheet" type="text/css" href={globalsCss} media="all" />
      <title>{title}</title>
    </Wrapper>
  );
};
