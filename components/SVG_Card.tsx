import styled from 'styled-components';

const Card = styled.div`
  width: 100px;
  height: 100px;
  & svg {
    width: 100px;
    height: 100px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 75px;
    height: 75px;
    & svg {
      width: 75px;
      height: 75px;
    }
  }
`;

const SVG_Card = (props: any) => {
  return <Card>{props.children}</Card>;
};

export default SVG_Card;
