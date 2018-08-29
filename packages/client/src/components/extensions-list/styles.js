import styled from '@auth0/cosmos/styled';

export const Logo = styled.div`
  background-color: #f3f3f3;
  width: 100px;
`;

export const Details = styled.div`
  padding: 24px;
  width: calc(100% - 100px);
`;

export const Container = styled.div`
  height: 130px;
  display: flex;

  div {
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;

    img {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;
