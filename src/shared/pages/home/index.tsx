import React from 'react';
import PageWrapper from '../../components/PageWrapper';

export * from './route';
export const title = 'Home Page';
export const Component: React.FunctionComponent = () => (
  <PageWrapper title={title}>
    <div>Hello world from the app!</div>
  </PageWrapper>
);
