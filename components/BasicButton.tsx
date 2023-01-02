import styled from 'styled-components';
const Button = styled.button<BasicButtonStyleInterface>`
  width: 100%;
  height: 48px;
  margin-top: 25px;
  border: none;
  border-radius: 4px;
  font-size: 1.1em;
  max-width: ${(props) => props.width}px;
  background-color: #fff;

  border: 1px solid#dfe1e5;
  &:hover {
    background-color: #dfdfdf;
  }
`;

const Solid = styled(Button)`
  border: none;
  background-color: ${({ theme }) => theme.colors.main};

  &:hover {
    background-color: ${({ theme }) => theme.colors.mainHoverColor};
  }
  & > span {
    color: #fff !important;
  }
`;

interface BasicButtonStyleInterface {
  width: number;
}

interface BasicButtonInterface {
  BasicButtonValue: string;
  width: number;
  children?: React.ReactNode;
  OnClick: () => void;
}

export function BasicButton(props: BasicButtonInterface) {
  return (
    <Button
      width={props.width}
      onClick={props.OnClick}
    >
      <span>{props.BasicButtonValue}</span>
    </Button>
  );
}

export function SolidButton(props: BasicButtonInterface) {
  return (
    <Solid
      width={props.width}
      onClick={props.OnClick}
    >
      <span>{props.BasicButtonValue}</span>
    </Solid>
  );
}

SolidButton.defaultProps = {
  width: 100,
};

export default BasicButton;
