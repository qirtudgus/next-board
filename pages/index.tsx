import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { animate, motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import DownArrowSVG from '../components/svg/DownArrowSVG';
import ReactSVG from '../components/svg/ReactSVG';
import ReduxSVG from '../components/svg/ReduxSVG';
import SagaSVG from '../components/svg/SagaSVG';
import NodeSVG from '../components/svg/NodeSVG';
import NextSVG from '../components/svg/NextSVG';
import TsSVG from '../components/svg/TsSVG';
import JsSVG from '../components/svg/JsSVG';
import MysqlSVG from '../components/svg/MysqlSVG';
import FigmaSVG from '../components/svg/FigmaSVG';
import GitSVG from '../components/svg/GitSVG';
import AwsSVG from '../components/svg/AwsSVG';
import Intro_Poraid from '../components/Intro_Poraid';
import Intro_DungeonNote from '../components/Intro_DungeonNote';
import VercelSVG from '../components/svg/VercelSVG';
import Intro_nextboard from '../components/Intro_nextboard';
import Section_intro from '../components/Section_intro';
import Intro_connect from '../components/Intro_connect';
import Section_Portfolio from '../components/Section_Portfolio';
import Head from 'next/head';
import Section_Skill from '../components/Section_Skill';
import Section_PortfolioText from '../components/Section_PortfolioText';

const SectionText = styled(motion.div)`
  font-weight: bold;
  position: absolute;
  word-break: keep-all;
  text-align: center;
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

const SectionWrap = styled(motion.div)`
  width: 100%;
  height: calc(100vh * 3);
  display: flex;
  justify-content: center;
  }
`;

const DownArrow = styled(motion.div)`
  position: fixed;
  bottom: 10px;
`;

const StackList = styled(motion.div)`
  display: flex;
  position: relative;
  /* top: 140px; */
  top: 25vh;
  & div {
    margin: 10px;
  }
`;

const StackList2 = styled(motion.div)`
  display: flex;
  position: relative;
  top: -25vh;
  & div {
    margin: 10px;
  }
`;

const IndexWrap = styled.div``;

const BarWrap = styled.div`
  /* width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; */
`;

const ProgressBar = styled.div`
  width: 6px;
  height: 150px;
  border: 1px solid #fff;
  /* background: red; */
  position: fixed;
  right: 72px;
  bottom: 99px;
  z-index: 10000;
  /* &::after {
    content: '';
    top: 0;
    left: 0;
    width: 6px;
    height: ${(props) => props.scrollY * 100}px;
    background: red;
    position: absolute;
    z-index: 10;
  } */
  @media ${({ theme }) => theme.device.mobile} {
    right: 42px;
    bottom: 69px;
  }
`;

const Bars = styled(motion.div)`
  width: 6px;
  height: 150px;
  right: 72px;
  bottom: 99px;
  position: fixed;
  z-index: 10000;
  background: #fff;
  transform-origin: top left;
  @media ${({ theme }) => theme.device.mobile} {
    right: 42px;
    bottom: 69px;
  }
`;

const TopBtnInner = styled(motion.div)`
  cursor: pointer;
  user-select: none;
  position: fixed;
  z-index: 10000;
  /* top: 570px; */
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background: #fff;
  /* border-radius: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  color: #202124;
  transition: all 0.3s;
  & span {
    position: absolute;
    top: 20px;
  }

  & svg {
    position: absolute;
    top: 4px;
    fill: #202124;
  }
  @media ${({ theme }) => theme.device.mobile} {
    right: 20px;
    bottom: 20px;
  }
`;

//인덱스를 감싸는 전체 스크롤 감지용
const IndexRef = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0, 0.28, 0.3], [0, 0, 0, 1]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const progress = Number(scrollYProgress.get());
      if (document.getElementById('header')) {
        if (progress > 0.0377) {
          (document!.getElementById('header') as HTMLElement).classList.add('show');
        } else {
          (document!.getElementById('header') as HTMLElement).classList.remove('show');
        }
      }
    });
  }, []);

  return (
    <IndexWrap ref={ref}>
      <BarWrap>
        <ProgressBar className='progressYBar' />
        <Bars
          className='progressYBarInner'
          style={{ scaleY }}
        />{' '}
        <TopBtnInner
          style={{ opacity }}
          className='topBtnInner'
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='24px'
            viewBox='0 0 24 24'
            width='24px'
            // fill='#fff'
          >
            <path
              d='M0 0h24v24H0z'
              fill='none'
            />
            <path d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z' />
          </svg>
          <span> TOP</span>
        </TopBtnInner>
      </BarWrap>
      <Go />
    </IndexWrap>
  );
};

const Go = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
  });
  const ref = useRef() as RefObject<HTMLDivElement>;
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
          setViewport({ width: window.innerWidth });
        }, 150);
      }
    };
    window.addEventListener('resize', SetPort);
    return () => {
      window.removeEventListener('resize', SetPort);
    };
  }, []);

  //인덱스페이지를 나갈 때 body값을 초기화해주자..!
  useEffect(() => {
    (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('white');
    (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('outIndex');
    (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('dark');
    (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.add('inIndex');

    return () => {
      (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.add('outIndex');
      (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0]?.classList.remove('inIndex');
    };
  }, []);

  const opacity = useTransform(scrollYProgress, [0.01, 0.15], [1, 0]);
  const display = useTransform(scrollYProgress, [0, 0.9999, 1], ['flex', 'flex', 'none']);

  return (
    <>
      <Head>
        <title>박성현 - Frontend Developer</title>
      </Head>
      <SectionWrap
        ref={ref}
        id='firstSection'
      >
        <SectionDiv style={{ display }}>
          <SectionText
            className='SectionMainText'
            style={{ opacity }}
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <br />
            안녕하세요! <br />
            Web FrontEnd Developer <br />
            박성현입니다. <br />
          </SectionText>
          <StackListTop scrollY={scrollYProgress} />
          <Section_Text scrollY={scrollYProgress}>
            리액트를 필두로
            <br />
            다양한 경험을 쌓고있습니다!
          </Section_Text>
          <StackListBottom scrollY={scrollYProgress} />
        </SectionDiv>
        <DownArrow style={{ display }}>
          <DownArrowSVG />
        </DownArrow>
      </SectionWrap>
      <Section_intro width={viewport.width} />
      {/* <Section_Skill /> */}
      {/* <Section_Portfolio /> */}
      <Section_PortfolioText />
      <Intro_Poraid />
      <Intro_DungeonNote />
      <Intro_nextboard />
      <Intro_connect />
    </>
  );
};

const Section_Text = ({
  scrollY,
  children,
}: {
  scrollY: MotionValue<number>;

  children: React.ReactNode;
}) => {
  const opacity = useTransform(scrollY, [0, 0.151, 0.3, 0.62, 0.9], [0, 0, 1, 1, 0]);
  return (
    <SectionText
      className='SectionMainText'
      style={{ opacity }}
    >
      {children}
    </SectionText>
  );
};

const StackListTop = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const opacity = useTransform(scrollY, [0, 0.22, 0.3, 0.55, 0.78], [0, 0, 1, 1, 0]);
  const x = useTransform(scrollY, [0, 0.22, 0.9], [1500, 1500, -1000]);
  return (
    <StackList2 style={{ x, opacity }}>
      <ReactSVG />
      <JsSVG />
      <VercelSVG />
      <GitSVG />
      <SagaSVG />
      <MysqlSVG />
    </StackList2>
  );
};

const StackListBottom = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const opacity = useTransform(scrollY, [0, 0.22, 0.3, 0.55, 0.78], [0, 0, 1, 1, 0]);
  const x = useTransform(scrollY, [0, 0.22, 0.9], [-1500, -1500, 1000]);
  return (
    <StackList style={{ x, opacity }}>
      <AwsSVG />
      <NodeSVG />
      <FigmaSVG />
      <NextSVG />
      <TsSVG />
      <ReduxSVG />
    </StackList>
  );
};

export default IndexRef;
