import React from 'react';
import styled from 'styled-components';

const DarkBlue = styled.h1({
  color: 'darkblue',
  fontSize: '2rem',
  fontWeight: 'bold',
});

/**
 * A simple main Header.
 *
 * @param props - Props to spread.
 * @returns A functional react component.
 */
const Header = <P extends unknown>(props: React.PropsWithChildren<P>) => (
  <DarkBlue {...props} />
);

export default Header;
