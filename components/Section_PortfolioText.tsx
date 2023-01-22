import styled from 'styled-components';

const Text = styled.div`
  width: 100%;
  height: 200px;
  font-weight: bold;
  font-size: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 54px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 44px;
  }
`;

const Section_PortfolioText = () => {
  return <Text>Portfolio</Text>;
};

export default Section_PortfolioText;
