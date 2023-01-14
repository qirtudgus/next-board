import styled from 'styled-components';
import { RefObject, useEffect, useRef } from 'react';
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import me from '../img/me.webp';

const SectionWrap = styled.div`
  height: fit-content;
  padding: 70px 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
`;

const SectionBox = styled.div`
  width: 95%;
  max-width: 1000px;
`;

const ConnectBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  max-width: 1000px;
`;

const MeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 1000px;
`;

const ConnectBorder = styled(motion.div)`
  width: 0px;
  margin-left: 20px;
  height: 5px;
  background: #000;
`;

const MeBorder = styled(motion.div)`
  width: 0px;
  margin-right: 20px;
  height: 5px;
  background: #000;
`;

const Title = styled(motion.div)`
  font-size: 52px;
  color: #202124;
  font-weight: bold;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 44px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 30px;
  }
`;

const InfoWrap = styled.div`
  width: 100%;
  height: 500px;
  color: #202124;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  @media ${({ theme }) => theme.device.tablet} {
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column-reverse;
    justify-content: space-around;
    height: 570px;
  }
`;

const Info = styled.div``;

const InfoTitle = styled.span`
  display: block;
  font-weight: bold;
  padding: 5px 0 0;
`;

const InfoDesc = styled.span`
  display: block;
  margin-left: 5px;
`;

const Me = styled.div`
  width: 200px;
  height: 250px;

  position: relative;
  & img {
    object-fit: cover;
  }

  @media ${({ theme }) => theme.device.tablet} {
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 160px;
    height: 210px;
  }
`;

const Intro_connect = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  return (
    <>
      <SectionWrap ref={ref}>
        <SectionBox>
          <ConnectBox1 scrollY={scrollYProgress} />

          <InfoWrap>
            <Info>
              <InfoTitle>🙋‍♂️인적 사항</InfoTitle>
              <InfoDesc>- 박성현</InfoDesc>
              <InfoDesc>- 1996.01.12</InfoDesc> <InfoDesc>- wlslek0015@gmail.com</InfoDesc>
              <InfoTitle>🧥경력</InfoTitle>
              <InfoDesc>- 스마트웰컴퍼니 웹디자이너 2020.02 ~ 2021.05</InfoDesc>
              <InfoTitle>🏤학력</InfoTitle>
              <InfoDesc>- 인덕대학교 멀티미디어디자인과 졸업 2020.02</InfoDesc>
              <InfoTitle>👨‍🎓교육 이수</InfoTitle>
              <InfoDesc>- 스파르타 코딩클럽 10기 2021.05~2021.06</InfoDesc>
              <InfoTitle>📜자격증</InfoTitle>
              <InfoDesc>- 웹디자인기능사 2021.09.17</InfoDesc>
              <InfoDesc>
                <a
                  href='https://github.com/qirtudgus'
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  Git
                </a>
                /
                <a
                  href='https://sungt.tistory.com/'
                  target={'_blank'}
                  rel={'noreferrer'}
                >
                  Blog
                </a>
              </InfoDesc>
            </Info>
            <Me>
              <Image
                src={me}
                alt='me'
                fill
              ></Image>
            </Me>
          </InfoWrap>
          <ConnectBox2 scrollY={scrollYProgress} />
        </SectionBox>
      </SectionWrap>
    </>
  );
};

const ConnectBox1 = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  let widhts = document.getElementById('connectBox')?.clientWidth;
  let titleWidths = document.getElementById('connectTitle')?.clientWidth;
  let resultWidth = () => {
    if (widhts && titleWidths) {
      return widhts - titleWidths + 'px';
    }
  };
  const width = useTransform(scrollY, [0, 0.4, 1], ['0px', '0px', `${widhts ? resultWidth() : '100vh'}`]);
  return (
    <>
      <ConnectBox id='connectBox'>
        <Title id='connectTitle'>Contact</Title>
        <ConnectBorder style={{ width }}></ConnectBorder>
      </ConnectBox>
    </>
  );
};
const ConnectBox2 = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  let widhts = document.getElementById('meBox')?.clientWidth;
  let titleWidths = document.getElementById('meTitle')?.clientWidth;
  let resultWidth = () => {
    if (widhts && titleWidths) {
      return widhts - titleWidths + 'px';
    }
  };

  const width = useTransform(scrollY, [0, 0.4, 1], ['0px', '0px', `${widhts ? resultWidth() : '100vh'}`]);
  return (
    <>
      <MeBox id='meBox'>
        <MeBorder style={{ width }}></MeBorder>
        <Title id='meTitle'>Me</Title>
      </MeBox>
    </>
  );
};

export default Intro_connect;
