import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import pugSrc from './pug.jpg';

export * from './route';
export const title = 'About';
export const Component: React.FunctionComponent = () => (
  <PageWrapper title={title}>
    <p>
      This is an about section. This is just the boilerplate code, so
      here&apos;s a cute pug.
    </p>
    <img src={pugSrc} width={800} />
    <p>Feel free to replace with whatever you desire.</p>
  </PageWrapper>
);
