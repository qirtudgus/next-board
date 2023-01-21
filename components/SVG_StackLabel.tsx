import styled from 'styled-components';

interface LabelDesign {
  bgColor: string;
}

const Wrap = styled.div<LabelDesign>`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  margin-right: 5px;
  font-size: 13px;
  /* background: linear-gradient(90deg, rgba(162, 255, 225, 1) 0%, rgba(122, 156, 255, 1) 51%, rgba(0, 116, 255, 1) 100%); */
  background: ${(props) => props.bgColor || '#202124'};
  font-weight: bold;
  padding: 4px 5px;
  border-radius: 5px;
  color: #fff;
`;
const Name = styled.div``;
const SVG_StackLabel = ({ children, bgColor }: { children: string; bgColor: string }) => {
  return (
    <Wrap bgColor={bgColor}>
      <Name>{children}</Name>
    </Wrap>
  );
};

export const LabelSingle = () => {
  return (
    <SVG_StackLabel bgColor=' linear-gradient(180deg, rgba(0,159,253,1) 0%, rgba(42,42,114,1) 100%);'>
      1인 개발
    </SVG_StackLabel>
  );
};

export const LabelTS = () => {
  return <SVG_StackLabel bgColor='#007acc'>TypeScript</SVG_StackLabel>;
};

export const LabelRedux = () => {
  return <SVG_StackLabel bgColor='#764ABC'>Redux</SVG_StackLabel>;
};

export const LabelAWS = () => {
  return <SVG_StackLabel bgColor='#F68536'>AWS EC2</SVG_StackLabel>;
};
export const LabelS3 = () => {
  return <SVG_StackLabel bgColor='#da6b1c'>AWS S3</SVG_StackLabel>;
};
export const LabelNginx = () => {
  return <SVG_StackLabel bgColor='#2fb12f'>Nginx</SVG_StackLabel>;
};
export const LabelFigma = () => {
  return <SVG_StackLabel bgColor='#a259ff'>Figma</SVG_StackLabel>;
};

export const LabelJS = () => {
  return <SVG_StackLabel bgColor='#f7df1e'>JavaScript</SVG_StackLabel>;
};
export const LabelMysql = () => {
  return <SVG_StackLabel bgColor='#00678c'>MySQL</SVG_StackLabel>;
};

export const LabelNext = () => {
  return <SVG_StackLabel bgColor='#000'>Next.js</SVG_StackLabel>;
};

export const LabelReact = () => {
  return <SVG_StackLabel bgColor='#61dafb'>React</SVG_StackLabel>;
};

export const LabelReduxSaga = () => {
  return <SVG_StackLabel bgColor='#89D96D'>Redux-saga</SVG_StackLabel>;
};
export const LabelReduxToolkit = () => {
  return <SVG_StackLabel bgColor='#764ABC'>Redux-Toolkit</SVG_StackLabel>;
};
export const LabelVercel = () => {
  return <SVG_StackLabel bgColor='#000'>Vercel</SVG_StackLabel>;
};
export const LabelNode = () => {
  return <SVG_StackLabel bgColor='#619857'>Node.js</SVG_StackLabel>;
};
export const LabelExpress = () => {
  return <SVG_StackLabel bgColor='#333333'>Express</SVG_StackLabel>;
};
export const LabelSC = () => {
  return <SVG_StackLabel bgColor='#b91871'>Styled-Components</SVG_StackLabel>;
};

export const LabelGitActions = () => {
  return <SVG_StackLabel bgColor='#2e2e2e'>Git Actions</SVG_StackLabel>;
};

export default SVG_StackLabel;
