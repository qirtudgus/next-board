import styled from 'styled-components';

interface BasicTitleInterface {
  BasicTitleValue: string;
}

const TitleTag = styled.h1`
  padding-top: 25px;
  font-size: 2em;
  font-weight: bold;
`;

export default function BasicTitle(props: BasicTitleInterface) {
  return (
    <>
      <TitleTag>{props.BasicTitleValue}</TitleTag>
    </>
  );
}
