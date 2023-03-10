import styled from 'styled-components';
import { RefObject, useEffect, useRef } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Swipers from './Swiper';

import p0 from '../img/poraid0_1200.webp';
import p1 from '../img/poraid1_1200.webp';
import p2 from '../img/poraid2_1200.webp';
import SVG_Card from './SVG_Card';
import TsSVG from './svg/TsSVG';
import SVG_StackLabel, {
  LabelAWS,
  LabelExpress,
  LabelFigma,
  LabelGitActions,
  LabelMysql,
  LabelNode,
  LabelReact,
  LabelRedux,
  LabelReduxToolkit,
  LabelSC,
  LabelSingle,
  LabelTS,
} from './SVG_StackLabel';
import ReduxSVG from './svg/ReduxSVG';

export const ContentWrap = styled(motion.div)`
  width: 100%;
  /* height: calc((100vh) * 1); */
  height: fit-content;
  /* background: #1d1d1f; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 10;
  position: relative;
  @media ${({ theme }) => theme.device.tablet} {
  }
  @media ${({ theme }) => theme.device.mobile} {
    /* height: 750px; */
  }
`;

const ContentBox = styled(motion.div)`
  width: 90%;
  max-width: 1500px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 20px;
  box-shadow: 0 0 70px 10px rgb(0 0 0 / 60%);
  background-color: #1d1d1f;
  padding: 60px 20px;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 15px;
    flex-direction: column;
    box-shadow: 0 0 40px 7px rgb(0 0 0 / 60%);
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 20px 15px;
    flex-direction: column;
    box-shadow: 0 0 15px 5px rgb(0 0 0 / 60%);
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 20px;
    width: calc(100% + 5px);
    height: calc(100% + 5px);

    background-image: linear-gradient(
      var(--rotate),
      rgba(241, 87, 87, 1) 0%,
      rgba(249, 167, 78, 1) 45%,
      rgba(255, 214, 0, 1) 100%
    );
    animation: spin 2.5s linear infinite;
  }
`;

export const NewContentBox = styled(motion.div)`
  width: 90%;
  max-width: 1500px;
  position: relative;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 20px;
  margin-bottom: 40px;
  /* box-shadow: 0 0 10px 2px rgb(0 0 0 / 30%); */
  /* background-color: #1d1d1f; */
  padding: 40px 20px;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 15px;
    flex-direction: column;
    /* box-shadow: 0 0 40px 7px rgb(0 0 0 / 60%); */
  }
  @media ${({ theme }) => theme.device.mobile} {
    padding: 20px 15px;
    flex-direction: column;
    /* box-shadow: 0 0 15px 5px rgb(0 0 0 / 60%); */
  }

  /* &::before {
    content: '';
    position: absolute;
    z-index: -1;
    border-radius: 20px;
    width: calc(100% + 5px);
    height: calc(100% + 5px);

    background-image: linear-gradient(
      var(--rotate),
      rgba(241, 87, 87, 1) 0%,
      rgba(249, 167, 78, 1) 45%,
      rgba(255, 214, 0, 1) 100%
    );
    animation: spin 2.5s linear infinite;
  } */
`;

export const DescDiv = styled.div`
  width: 600px;
  margin-right: 40px;
  /* min-height: 460px; */
  flex-direction: column;
  display: flex;
  /* color: #fff; */

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    margin-right: 0px;
  }
`;
export const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ContentName = styled.div`
  font-size: 50px;
  /* border-bottom: 1px solid#cacaca; */
  /* padding-bottom: 10px; */
  /* margin-bottom: 15px; */
  font-weight: bold;
  display: flex;

  /* align-items: center; */
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }

  & span {
    /* color: #fff; */
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  & > div span svg:hover {
    cursor: pointer;
    /* fill: #ef5a34; */
    fill: ${({ theme }) => theme.colors.main};
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 44px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 34px;
  }
`;

export const ImgDiv = styled.div`
  display: block;
  width: 50%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 75%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export const BottomBorder = styled.div`
  width: 100%;
  height: 1px;
  background-color: #858585;
  margin: 10px 0;
`;

const Intro_Poraid = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  //?????? ????????? ?????? data attribute ??????
  // useEffect(() => {
  //   return scrollYProgress.onChange((latest) => {
  //     if (ref.current) {
  //       console.log(`???????????? : ${Number(scrollYProgress.get())}`);
  //       //0.479?????? ?????? white ????????????, ????????? white ????????????
  //       if (Number(scrollYProgress.get()) > 0.4789) {
  //         (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('white');
  //         (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('dark');
  //       }
  //       if (Number(scrollYProgress.get()) > 0 && Number(scrollYProgress.get()) < 0.4789) {
  //         (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('white');
  //         (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('dark');
  //       }
  //     }
  //   });
  // }, []);

  //height??? ??????????????? ????????? 1??? ???????????????..
  function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
  }
  const y = useParallax(scrollYProgress, 1000);
  return (
    <>
      <ContentWrap ref={ref}>
        <NewContentBox>
          <DescDiv>
            <ContentName>
              <span>????????????</span>
              <div>
                <a
                  href='https://github.com/qirtudgus/saemoi'
                  rel='noreferrer'
                  target={'_blank'}
                >
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='30px'
                      height='30px'
                      viewBox='0 0 24 24'
                      fill='#202124'
                    >
                      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z' />
                    </svg>
                  </span>
                </a>
                <a
                  href='https://poraid.com'
                  rel='noreferrer'
                  target={'_blank'}
                >
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      enableBackground='new 0 0 24 24'
                      height='40px'
                      viewBox='0 0 24 24'
                      width='40px'
                      fill='#202124'
                    >
                      <g>
                        <rect
                          fill='none'
                          height='24'
                          width='24'
                        />
                      </g>
                      <g>
                        <g>
                          <polygon points='17,17 22,12 17,7 15.59,8.41 18.17,11 9,11 9,13 18.17,13 15.59,15.59' />
                          <path d='M19,19H5V5h14v2h2V5c0-1.1-0.89-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.11,0,2-0.9,2-2v-2h-2V19z' />
                        </g>
                      </g>
                    </svg>
                  </span>{' '}
                </a>
              </div>
            </ContentName>
            <BottomBorder />
            Socket.IO??? ????????? ????????? ????????? ????????? ?????? ??? ??????????????????.
            <br />
            - Web Notification API??? Vibrate API??? ?????? PC, mobile ?????? ??? ?????? ?????? ?????? ??????
            <br />- Git Actions??? ?????? ?????? ??? ?????? ????????? ??????
            <br /> - Redux-Toolkit??? ?????? ?????? ??????
            <br />
            - Socket Session?????? ???????????? ???????????? ????????? ??? ??????
            <br />- node schedule??? ???????????? ????????? ?????? ????????? ??????
            <br />- ????????? ????????? Socket Message??? ???????????? ?????? ????????? ??? ?????? ?????? ??????
            <br />- AWS EC2 amazon-linux2 ???????????? ?????? ??????
            <br />- LetsEncrypt??? ???????????? SSL ????????? ?????? ??? https ??????
            <BottomBorder />
            <StackList>
              <LabelSingle />
              <LabelTS />
              <LabelReact />
              <LabelRedux />
              <LabelReduxToolkit />
              <LabelSC />
              <LabelAWS />
              <LabelMysql />
              <LabelNode />
              <LabelExpress />
              <LabelGitActions />
            </StackList>
          </DescDiv>
          <ImgDiv>
            <Swipers
              imgArr={[p0, p1, p2]}
              bulletActiveColor='#ef5a34'
              bulletBgColor='#858585'
            ></Swipers>
          </ImgDiv>
        </NewContentBox>
      </ContentWrap>
    </>
  );
};

export default Intro_Poraid;
