import styled from 'styled-components';
import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion, useScroll, useTransform } from 'framer-motion';
import 포레이드1 from '../img/포레이드1.png';
import Image from 'next/image';
import StackCards from './StackCard';
import { useRouter } from 'next/router';
import { duration } from 'moment';

const Intro = styled(motion.div)`
  width: 100%;
  height: calc((100vh) * 6);
  min-height: 4500px;
`;

const ContentWrapPoraid = styled(motion.div)`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  z-index: 10;
`;

const ContentBox = styled(motion.div)`
  width: 90%;
  max-width: 1000px;
`;

export const ContentText = styled(motion.p)`
  font-weight: bold;
  font-size: 4rem;
  color: #fff;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const ContentBox2 = styled(motion.div)`
  width: 90%;
  max-width: 1000px;
  position: absolute;
`;

export const ContentText2 = styled(motion.p)`
  font-weight: bold;
  font-size: 4rem;
  color: #fff;
  word-break: keep-all;
  text-align: center;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
  top: 0;
`;

const TextSkillTitle = styled(motion.p)`
  color: #fff;
  font-size: 3rem;
`;

const Text = () => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [300, 500, 1000, 1900], [-60, 0, 0, 0]);
  const opacity = useTransform(scrollY, [300, 500, 1000, 1900, 3067, 3600], [0, 1, 1, 1, 1, 0]);
  const y = useTransform(scrollY, [3067, 3600], [0, -30]);

  return (
    <ContentBox2>
      <ContentText2 style={{ x, opacity, y }}>항상 필요한 것을 고민합니다.</ContentText2>
      <StackCards></StackCards>
    </ContentBox2>
  );
};

const Portfolio = () => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [3600, 3800], [-60, 0]);
  const opacity = useTransform(scrollY, [3600, 3800, 4000], [0, 1, 1]);
  const display = useTransform(scrollY, [0, 3600, 4000], ['none', 'none', 'block']);
  //   const y = useTransform(scrollY, [4000, 4200], [0, -60]);
  const router = useRouter();
  return (
    <ContentBox2>
      <ContentText2
        style={{ x, opacity, cursor: 'pointer', display }}
        onClick={() => {
          router.push('/posts');
        }}
        animate={{
          //   scale: [1, 1.3],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      >
        Go Portfolio
      </ContentText2>
    </ContentBox2>
  );
};

type ScrollYvalue = number[];

const SkillText = ({ textValue, Yvalue }: { textValue: string; Yvalue: ScrollYvalue }) => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [...Yvalue], [-60, 0, 60]);
  const opacity = useTransform(scrollY, [...Yvalue], [0, 1, 0]);
  return <TextSkillTitle style={{ x, opacity }}>{textValue}</TextSkillTitle>;
};

const DownArrow = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background: red;
`;

const Intro_First = () => {
  const { scrollY } = useScroll(); //이건 픽셀단위의 절대 스크롤 위치
  //   const { scrollYProgress } = useScroll(); // 이건 전체 스크롤에서 0~1?
  //   const backgroundColor = useTransform(scrollY, [0, 3067, 3600], ['black', 'black', 'white']);

  //   const opacity = useTransform(
  //     scrollY,
  //     // Map x from these values:
  //     [0, 300],
  //     // Into these values:
  //     [1, 0],
  //   );
  const x = useTransform(scrollY, [0, 300], [0, -60]);
  const position = useTransform(scrollY, [4300, 4301, 4600], ['fixed', 'fixed', 'relative']);
  const height = useTransform(scrollY, [4300, 4301], ['100vh', '4500px']);
  const top = useTransform(scrollY, [4300, 5000], [0, '-1920']);

  const display = useTransform(scrollY, [0, 4301, 4600], ['flex', 'flex', 'none']);
  const first = [
    [0, 300],
    [1, 0],
  ];

  const opacity = useTransform(
    scrollY,
    // Map x from these values:
    first[0],
    first[1],
  );

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  return (
    <Intro
      ref={ref}
      //해당요소의 진행률 0~1을 확인할 수 있음
      data-a={scrollYProgress.get()}
    >
      <ContentWrapPoraid style={{ top }}>
        <DownArrow></DownArrow>
        <ContentBox>
          <ContentText
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x, opacity }}
          >
            &lt; &gt;
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x, opacity }}
          >
            안녕하세요!
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x, opacity }}
          >
            Web FrontEnd Developer
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x, opacity }}
          >
            박성현입니다.
            <br />
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x, opacity }}
          >
            &lt;&#47;&gt;
          </ContentText>
        </ContentBox>

        <Text />
        <Portfolio></Portfolio>
      </ContentWrapPoraid>
    </Intro>
  );
};

export default Intro_First;
{
  /* <div>

          <Canvas camera={{ position: [0, -0.2, 0.5] }}>
            <ambientLight intensity={0.3} />
            <Suspense fallback={null}>
              <Scene />
              <OrbitControls
                //자동 회전
                // autoRotate={true}
                //줌 방지

                enableZoom={false}
                //   minPolarAngle={Math.PI / 2.5}
                //   maxPolarAngle={Math.PI / 2.5}
              />
              <Environment preset='city' />
            </Suspense>
          </Canvas>
        </div> */
}
