import styled from 'styled-components';
import { Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion, useScroll, useTransform } from 'framer-motion';
import 포레이드1 from '../img/포레이드1.png';
import Image from 'next/image';

const ContentWrapPoraid = styled.div`
  width: 100%;
  height: calc((100vh) * 1);
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentBox = styled.div`
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

const Intro_Second = () => {
  const { scrollY } = useScroll(); //이건 픽셀단위의 절대 스크롤 위치
  const { scrollYProgress } = useScroll(); // 이건 전체 스크롤에서 0~1?
  const opacity = useTransform(
    scrollY,
    // Map x from these values:
    [400, 900],
    // Into these values:
    [0, 1],
  );
  const x = useTransform(scrollY, [400, 900], [-60, 0]);

  return (
    <>
      <ContentWrapPoraid>
        <ContentBox>
          <ContentText
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            style={{ x, opacity }}
          >
            &lt; &gt;
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ x, opacity }}
          >
            안녕하세요!
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ x, opacity }}
          >
            Web FrontEnd Developer
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ x, opacity }}
          >
            박성현입니다.
            <br />
          </ContentText>
          <ContentText
            initial={{ opacity: 0, translateY: -20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ x, opacity }}
          >
            &lt;&#47;&gt;
          </ContentText>
        </ContentBox>
      </ContentWrapPoraid>
    </>
  );
};

export default Intro_Second;
