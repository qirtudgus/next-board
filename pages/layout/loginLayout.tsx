import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  margin-top: 8rem;
`;

const LoginLayout = (props: { children: React.ReactNode }) => {
  return <Wrap>{props.children}</Wrap>;
};

export default LoginLayout;
