import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, MotionValue, transform, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import DownArrowSVG from '../components/DownArrowSVG';
import ReactSVG from '../components/ReactSVG';
import ReduxSVG from '../components/ReduxSVG';
import SagaSVG from '../components/SagaSVG';
import NodeSVG from '../components/NodeSVG';
import NextSVG from '../components/NextSVG';
import TsSVG from '../components/TsSVG';
import JsSVG from '../components/JsSVG';
import MysqlSVG from '../components/MysqlSVG';
import FigmaSVG from '../components/FigmaSVG';
import GitSVG from '../components/GitSVG';
import AwsSVG from '../components/AwsSVG';
import Intro_Poraid from '../components/Intro_Poraid';
import Intro_DungeonNote from '../components/Intro_DungeonNote';

interface ViewportProps {
  width: number;
  height: number;
  BgColor: string;
}

const SectionText = styled(motion.div)`
  font-size: 3rem;
  font-weight: bold;
  position: absolute;
  word-break: keep-all;
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 2rem;
  }
`;
const SectionDiv = styled(motion.div)`
  width: 95%;
  height: calc(100vh * 1);
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const SectionWrap = styled(motion.div)<ViewportProps>`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(${(props) => props.height}px * 5);
  background-color: ${(props) => props.BgColor};
  display: flex;
  justify-content: center;
`;
const SectionWrap2 = styled(motion.div)<ViewportProps>`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(${(props) => props.height}px * 1);
  background-color: ${(props) => props.BgColor};
  display: flex;
  justify-content: center;
`;

const CurrentProg = styled.div`
  position: fixed;
  top: 100px;
  left: 20px;
  color: red;
  z-index: 1000;
`;

const DownArrow = styled.div`
  position: fixed;
  bottom: 10px;
`;

const StackList = styled(motion.div)`
  display: flex;
  position: relative;
  top: 100px;
  & div {
    margin: 10px;
  }
`;

const Go = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [currentProg, SetCurrentProg] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    //과한 리사이징 호출을 대비하여 디바운스
    let timer: number | null;
    const SetPort = () => {
      if (!timer) {
        timer = window.setTimeout(function () {
          timer = null;
          console.log('리사이즈');
        }, 300);
      }
    };
    window.addEventListener('resize', SetPort);
    return () => {
      window.removeEventListener('resize', SetPort);
    };
  }, []);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      SetCurrentProg(scrollYProgress.get());
    });
  }, []);

  const opacity = useTransform(scrollYProgress, [0.01, 0.15], [1, 0]);
  const display = useTransform(scrollYProgress, [0, 0.9999, 1], ['flex', 'flex', 'none']);
  const x = useTransform(scrollYProgress, [0.01, 0.06], [0, 30]);
  const y = useTransform(scrollYProgress, [0.01, 0.05], [-30, 0]);
  return (
    <>
      <SectionWrap
        ref={ref}
        data-progress={scrollYProgress.get()}
        width={viewport.width}
        height={viewport.height}
        BgColor={'black'}
      >
        {/* <CurrentProg>{currentProg}</CurrentProg> */}
        <SectionDiv style={{ display }}>
          <SectionText
            style={{ opacity }}
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            &lt; &gt;
            <br />
            안녕하세요! <br />
            Web FrontEnd Developer <br />
            박성현입니다. <br />
            &lt;&#47;&gt;
          </SectionText>
          <Section_Text scrollY={scrollYProgress}>다양한 경험을 하고있습니다.</Section_Text>
          <Stack_List scrollY={scrollYProgress} />
          <Section_Text2 scrollY={scrollYProgress}>Portfolio</Section_Text2>
        </SectionDiv>

        <DownArrow>
          <DownArrowSVG />
        </DownArrow>
      </SectionWrap>
      <Section2
        width={viewport.width}
        height={viewport.height}
      ></Section2>
      <Intro_Poraid />
      <Intro_DungeonNote />
    </>
  );
};

const Section2 = ({ width, height, children }: { width: number; height: number; children?: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      console.log(scrollYProgress.get());
    });
  }, []);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [0, 0, 1]);
  const display = useTransform(scrollYProgress, [0, 0.9999, 1], ['flex', 'flex', 'none']);

  return (
    <>
      <SectionWrap2
        ref={ref}
        data-progress={scrollYProgress.get()}
        width={width}
        height={height}
        BgColor={'white'}
      >
        <SectionDiv style={{ display }}>
          <Section_Text3 scrollY={scrollYProgress}>Portfolio</Section_Text3>
        </SectionDiv>
      </SectionWrap2>
    </>
  );
};

const Section_Text = ({
  scrollY,
  inputRange,
  outputRange,
  children,
}: {
  scrollY: MotionValue<number>;
  inputRange?: number[];
  outputRange?: number[];
  children: React.ReactNode;
}) => {
  const opacity = useTransform(scrollY, [0, 0.13, 0.3, 0.62, 0.8], [0, 0, 1, 1, 0]);
  return <SectionText style={{ opacity }}>{children}</SectionText>;
};

const Section_Text2 = ({
  scrollY,
  inputRange,
  outputRange,
  children,
}: {
  scrollY: MotionValue<number>;
  inputRange?: number[];
  outputRange?: number[];
  children: React.ReactNode;
}) => {
  const opacity = useTransform(scrollY, [0.78, 0.85], [0, 1]);
  return <SectionText style={{ opacity }}>{children}</SectionText>;
};

const Section_Text3 = ({
  scrollY,
  inputRange,
  outputRange,
  children,
}: {
  scrollY: MotionValue<number>;
  inputRange?: number[];
  outputRange?: number[];
  children: React.ReactNode;
}) => {
  const opacity = useTransform(scrollY, [0, 0.7, 1], [0, 1, 0]);
  return <SectionText style={{ opacity, color: '#000000' }}>{children}</SectionText>;
};

const Stack_List = ({ scrollY, children }: { scrollY: MotionValue<number>; children?: React.ReactNode }) => {
  const opacity = useTransform(scrollY, [0, 0.22, 0.3, 0.48, 0.62], [0, 0, 1, 1, 0]);
  const x = useTransform(scrollY, [0, 0.22, 0.6], [-1500, -1500, 1000]);
  return (
    <StackList style={{ x, opacity }}>
      <ReactSVG />
      <ReduxSVG />
      <SagaSVG />
      <NodeSVG />
      <NextSVG />
      <TsSVG />
      <JsSVG />
      <MysqlSVG />
      <FigmaSVG />
      <GitSVG />
      <AwsSVG />
    </StackList>
  );
};
export default Go;
