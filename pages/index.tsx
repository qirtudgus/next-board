import React, { RefObject, useEffect, useRef, useState } from 'react';
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
// import 포폴 from '../img/클레이목업.png';
import 포폴 from '../img/포트폴리오_이미지추가.jpg';
import 메타 from '../img/메타인지0.png';
import 주인 from '../img/주인의식0.png';
import 존중 from '../img/상호존중0.png';
import Image from 'next/image';
import VercelSVG from '../components/VercelSVG';
import Intro_nextboard from '../components/Intro_nextboard';

interface ViewportProps {
  width: number;
  height: number;
  backgroundcolors: string;
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
const SectionText_Portfolio = styled(motion.div)`
  font-size: 4rem;
  font-weight: bold;
  position: absolute;
  z-index: 10000;
  word-break: keep-all;
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 3rem;
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
const SectionDiv2 = styled(motion.div)`
  width: 95%;
  height: calc(100vh * 1);
  position: fixed;
  top: 0;

  //섹션3 만들동안 none처리
  display: none !important;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 1;
`;

const SectionWrap = styled(motion.div)<ViewportProps>`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(${(props) => props.height}px * 5);
  /* background-color: ${(props) => props.backgroundcolors}; */
  display: flex;
  justify-content: center;
  }
`;
const SectionWrap2 = styled(motion.div)<ViewportProps>`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(${(props) => props.height}px * 2);
  background-color: ${(props) => props.backgroundcolors};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrentProg = styled.div`
  position: fixed;
  top: 100px;
  left: 20px;
  color: red;
  z-index: 1000;
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

const Go = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [currentProg, SetCurrentProg] = useState(0);

  // const ref = useRef(null);
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
          setViewport({ width: window.innerWidth, height: window.innerHeight });
        }, 100);
      }
    };
    window.addEventListener('resize', SetPort);
    return () => {
      window.removeEventListener('resize', SetPort);
    };
  }, []);

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (ref.current) {
        ref.current.setAttribute('data-progress', scrollYProgress.get().toString());
        let progressNumber = Number(scrollYProgress.get());
        console.log(`1번섹션 : ${progressNumber}`);
        if (progressNumber > 0.09) {
          (document!.getElementById('header') as HTMLElement).classList.add('show');
        } else {
          (document!.getElementById('header') as HTMLElement).classList.remove('show');
        }

        // if (progressNumber > 0.991) {
        //   (document!.getElementById('header') as HTMLElement).classList.add('text_black');
        // }
        // if (progressNumber < 0.991) {
        //   (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
        // }
      }
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
        width={viewport.width}
        height={viewport.height}
        backgroundcolors={'#1d1d1f'}
        id='firstSection'
      >
        {
          // replace console.* for disable log on production
          process.env.NODE_ENV !== 'production' && <CurrentProg>{currentProg}</CurrentProg>
        }

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
          <Stack_List2 scrollY={scrollYProgress} />
          <Section_Text scrollY={scrollYProgress}>
            리액트를 필두로
            <br />
            다양한 경험을 쌓고있습니다.
          </Section_Text>
          <Stack_List scrollY={scrollYProgress} />
          {/* <Section_Text2 scrollY={scrollYProgress}>Portfolio</Section_Text2> */}
        </SectionDiv>
        <DownArrow style={{ display }}>
          <DownArrowSVG />
        </DownArrow>
      </SectionWrap>

      {/* who am i? */}
      <Section3
        width={viewport.width}
        height={viewport.height}
      ></Section3>

      <Section2
        width={viewport.width}
        height={viewport.height}
      ></Section2>

      <Intro_Poraid />
      <Intro_DungeonNote />
      <Intro_nextboard />
      {/* <Swipers /> */}
    </>
  );
};

const PortfolioImg = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  & img {
    object-fit: cover;
  }
`;

const Section2 = ({ width, height, children }: { width: number; height: number; children?: React.ReactNode }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (ref.current) {
        ref.current.setAttribute('data-progress', scrollYProgress.get().toString());
        let progressNumber = Number(ref.current.getAttribute('data-progress'));
        // console.log(progressNumber);
        // if (progressNumber > 0.983) {
        //   (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
        // }
        // if (progressNumber < 0.983) {
        //   (document!.getElementById('header') as HTMLElement).classList.add('text_black');
        // }
      }
    });
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [0, 0, 1]);
  const display = useTransform(scrollYProgress, [0, 0.9, 1], ['flex', 'flex', 'none']);
  // const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  return (
    <>
      <SectionWrap2
        ref={ref}
        data-progress={scrollYProgress.get()}
        width={width}
        height={height}
        backgroundcolors={'white'}
      >
        <SectionDiv2 style={{ display }}>
          <Section_Text3 scrollY={scrollYProgress}>Portfolio</Section_Text3>
        </SectionDiv2>
        <PortfolioImg style={{}}>
          <Image
            src={포폴}
            alt='사진'
            loading='eager'
            fill
            priority
            quality={100}
          ></Image>
        </PortfolioImg>
      </SectionWrap2>
    </>
  );
};

const SectionWrap3 = styled(motion.div)<ViewportProps>`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(100vh * 4);
  /* background-color: ${(props) => props.backgroundcolors}; */
  display: flex;
  justify-content: center;
  align-items: center;

  /* color: #fff; */
  /* &.white {
    background-color: #fff;
    color: #000;
  } */
  /* @media ${({ theme }) => theme.device.tablet} {
    height: calc(${(props) => props.height}px * 5);
  }
  @media ${({ theme }) => theme.device.mobile} {
  } */
`;

const SectionDiv3 = styled(motion.div)`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  /* justify-content: center; */

  z-index: 1;

  /* margin: 0 200px; */

  @media screen and (max-width: 1680px) {
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: center;
  }
  @media screen and (max-width: 1140px) {
    & .section3_image {
      width: 400px;
      object-fit: contain;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    /* margin: 0 50px; */
    & .section3_image {
      width: 100%;
      height: fit-content;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    /* margin: 0 25px; */
  }
`;

const Section3_title = styled(motion.div)`
  position: sticky;
  height: 100vh;
  flex: 0 0 470px;
  max-width: 470px;
  font-size: 72px;
  line-height: 1.28;
  top: 0;
  margin: 0;
  text-align: left;
  font-weight: bold;
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 54px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 44px;
  }
`;
const Section3_boxWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100vh 0;
`;

const Section3_box = styled.div`
  position: relative;
  flex-shrink: 0;
  max-width: 400px;
  height: 480px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  flex-direction: row-reverse;

  &:nth-child(1) {
    margin-left: 340px;
    & > div {
      padding-right: 30px;
      text-align: right;
    }
  }

  &:nth-child(2) {
    & > div {
      padding-left: 30px;
    }
  }

  &:nth-child(3) {
    margin-left: 340px;
    & > div {
      position: absolute;
      left: -200px;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
    &:nth-child(1) {
      margin-left: 0px;
      & > div {
        padding-right: 0px;
        text-align: left;
      }
    }

    &:nth-child(2) {
      flex-direction: column-reverse;
      & > div {
        padding-left: 0px;
      }
    }

    &:nth-child(3) {
      margin-left: 0px;
      & > div {
        position: relative;
        left: 0px;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    &:nth-child(1) {
      & > div {
      }
    }

    &:nth-child(2) {
      & > div {
      }
    }

    &:nth-child(3) {
      & > div {
      }
    }
  }
`;

const Section3_boxText = styled.div`
  width: 200px;
  font-size: 1.2rem;
  flex-shrink: 0;
  /* width: fit-content; */
  word-break: keep-all;
  line-height: 1.1em;
  margin-top: 20px;

  & .Title {
    display: block;
    font-weight: bold;
    font-size: 30px;
    /* padding-bottom: 5px; */
    @media ${({ theme }) => theme.device.tablet} {
      margin-top: 20px;
    }
  }
`;

const Section3 = ({ width, height, children }: { width: number; height: number; children?: React.ReactNode }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (ref.current) {
        ref.current.setAttribute('data-progress', scrollYProgress.get().toString());
        let progressNumber = Number(ref.current.getAttribute('data-progress'));
        console.log(`섹션3 :${progressNumber}`);
        //섹션3에 돌입하면 1번섹션의 배경을 흰색으로 변경해주기
        //섹션3은 기본 검은색 배경 흰색글씨 -> 흰 배경 검은 글씨로
        //시작구간 값은 약 0.08 정도
        if (progressNumber > 0.1) {
          // (document!.getElementById('firstSection') as HTMLElement).classList.add('white');
          // (document!.getElementById('thirdSection') as HTMLElement).classList.add('white');
          // (document!.getElementById('Body') as HTMLElement).classList.add('white');

          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('white');
        } else {
          // (document!.getElementById('firstSection') as HTMLElement).classList.remove('white');
          // (document!.getElementById('thirdSection') as HTMLElement).classList.remove('white');
          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('white');

          // (document!.getElementById('Body') as HTMLElement).classList.remove('white');
        }
      }
    });
  }, []);

  const opacity = useTransform(scrollYProgress, [0.22, 0.48, 0.75, 0.9], [1, 0, 0, 1]);
  return (
    <>
      <SectionWrap3
        ref={ref}
        data-progress={scrollYProgress.get()}
        width={width}
        height={height}
        backgroundcolors={'#1d1d1f'}
        id={'thirdSection'}
      >
        <SectionDiv3 style={{}}>
          {/* width 뷰포트가 769미만이면 opacity를 호출하고 이상이면 opacity를 1로 설정해준다. */}
          <Section3_title style={width < 1681 ? { opacity } : { opacity: '1' }}>
            이런 개발자가
            <br /> 되기 위해
            <br /> 노력합니다.
          </Section3_title>
          {/* 기존의 스타일 */}
          <Section3_boxWrap>
            <Section3_box>
              <Image
                className='section3_image'
                src={존중}
                alt='존중'
                width={600}
                quality={100}
              ></Image>
              <Section3_boxText>
                <span className='Title'>상호존중</span>
                <br />늘 존중하는 자세, 하지만 리뷰는 확실하게!
              </Section3_boxText>
            </Section3_box>
            <Section3_box>
              <Section3_boxText>
                <span className='Title'>주인의식</span>
                <br />
                주어지는것뿐 아니라 스스로 찾아낼 수 있게!
              </Section3_boxText>
              <Image
                className='section3_image'
                src={주인}
                alt='주인'
                width={600}
                quality={100}
              ></Image>
            </Section3_box>
            <Section3_box>
              <Image
                className='section3_image'
                src={메타}
                alt='메타'
                width={470}
                quality={100}
              ></Image>
              <Section3_boxText>
                <span className='Title'>메타인지</span>
                <br />
                무엇을 모르고, 무엇을 아는지 스스로 따져보는!
              </Section3_boxText>
            </Section3_box>
          </Section3_boxWrap>
        </SectionDiv3>
      </SectionWrap3>
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
  const opacity = useTransform(scrollY, [0, 0.151, 0.3, 0.62, 0.9], [0, 0, 1, 1, 0]);
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
  const opacity = useTransform(scrollY, [0.81, 0.9], [0, 1]);
  return <SectionText_Portfolio style={{ opacity }}>{children}</SectionText_Portfolio>;
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
  const opacity = useTransform(scrollY, [0, 0.5, 0.9], [0, 1, 0]);
  return <SectionText_Portfolio style={{ opacity, color: '#1d1d1f' }}>{children}</SectionText_Portfolio>;
};

const Stack_List2 = ({ scrollY, children }: { scrollY: MotionValue<number>; children?: React.ReactNode }) => {
  const opacity = useTransform(scrollY, [0, 0.22, 0.3, 0.55, 0.78], [0, 0, 1, 1, 0]);
  // const x = useTransform(scrollY, [0, 0.22, 0.6], [-1500, -1500, 1000]);
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

const Stack_List = ({ scrollY, children }: { scrollY: MotionValue<number>; children?: React.ReactNode }) => {
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

export default Go;
