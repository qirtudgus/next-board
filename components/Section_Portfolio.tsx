import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import 포폴3 from '../img/포폴5.webp';

const SectionWrap2 = styled(motion.div)`
  width: 100%;
  height: calc(100vh * 2);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionDiv2 = styled(motion.div)`
  width: 95%;
  height: calc(100vh * 1);
  position: fixed;
  top: 0;

  //섹션3 만들동안 none처리
  /* display: none !important; */
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 1;
`;

const SectionText_Portfolio = styled(motion.div)`
  /* font-size: 4rem; */
  font-weight: bold;
  z-index: 10000;
  word-break: keep-all;
  text-align: center;
  /* @media ${({ theme }) => theme.device.tablet} {
    font-size: 3rem;
  } */
`;

const PortfolioImg = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  & img {
    /* width: 100%; */
    object-fit: cover;
  }
`;

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
  const opacity = useTransform(scrollY, [0.15, 0.5, 0.9], [0, 1, 0]);

  const border = useTransform(scrollY, [0.15, 0.5, 0.9], ['0px solid#000', '100px solid#000', '100px solid#000']);
  return (
    <SectionText_Portfolio
      className='SectionMainText'
      style={{ opacity, color: '#1d1d1f', border }}
    >
      {children}
    </SectionText_Portfolio>
  );
};

const Section_Portfolio = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const display = useTransform(scrollYProgress, [0, 0.9, 1], ['flex', 'flex', 'none']);
  return (
    <>
      <SectionWrap2 ref={ref}>
        <SectionDiv2 style={{ display }}>
          <Section_Text3 scrollY={scrollYProgress}>Portfolio</Section_Text3>
        </SectionDiv2>

        <PortfolioImg>
          <Image
            src={포폴3}
            alt='사진'
            fill
            quality={100}
          ></Image>
        </PortfolioImg>
      </SectionWrap2>
    </>
  );
};

export default Section_Portfolio;
