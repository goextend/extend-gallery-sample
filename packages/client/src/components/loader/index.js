import React from 'react';
import styled from '@auth0/cosmos/styled';
import { Spinner } from '@auth0/cosmos';

const Container = styled.div`
  text-align: center;
`;

const Loader = ({ text }) => (
  <Container>
    <div>{text}</div>
    <Spinner />
  </Container>
);

export default Loader;
