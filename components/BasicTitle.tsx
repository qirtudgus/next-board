import styled from 'styled-components';

interface BasicTitleInterface {
  BasicTitleValue: string;
}

const TitleTag = styled.h1`
  padding: 30px 0;
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
