import { RefObject, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Swipers from './Swiper';

import note0 from '../img/note_1200.webp';
import note1 from '../img/note0_1200.webp';
import note2 from '../img/note1_1200.webp';
import note3 from '../img/note2_1200.webp';
import { BottomBorder, ContentName, ContentWrap, DescDiv, ImgDiv, NewContentBox, StackList } from './Intro_Poraid';
import styled from 'styled-components';
import {
  LabelSingle,
  LabelTS,
  LabelRedux,
  LabelAWS,
  LabelMysql,
  LabelNode,
  LabelReact,
  LabelExpress,
  LabelSC,
  LabelGitActions,
  LabelReduxSaga,
  LabelFigma,
} from './SVG_StackLabel';

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
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 233, 122, 1) 45%,
      rgba(222, 222, 222, 1) 100%
    );
    animation: spin 2.5s linear infinite;
  }
`;

const Intro_DungeonNote = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  // useEffect(() => {
  //   return scrollYProgress.onChange((latest) => {
  //     if (ref.current) {
  //       if (Number(scrollYProgress.get()) > 0.964) {
  //         (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
  //       }
  //       if (Number(scrollYProgress.get()) > 0 && Number(scrollYProgress.get()) < 0.96) {
  //         (document!.getElementById('header') as HTMLElement).classList.add('text_black');
  //       }
  //     }
  //   });
  // }, []);

  return (
    <>
      <ContentWrap ref={ref}>
        <NewContentBox>
          <DescDiv>
            <ContentName>
              <span>던전노트</span>
              <div>
                <a
                  href='https://github.com/qirtudgus/NoteGame'
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
                  href='https://dungeonnote.com'
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
            추억의 공책게임을 RPG형식의 턴제 웹 게임으로 제작하였습니다.
            <br /> - Redux와 Redux-saga를 통한 상태 관리
            <br />
            - jwt 토큰과 로컬스토리지를 이용한 로그인 구현
            <br />
            - Redux를 통해 유저정보를 업데이트하고, MySql에 유저 정보를 관리.
            <br />
            - 높은 던전에 도달한 유저순으로 보여주는 Ranking 기능 구현
            <br />- MySql 도감 테이블로 잡은 몬스터 기록을 안내해주는 페이지 구현
            <br />- 애니메이션을 통해 Element에 등록되어있는 함수를 실행하는 기능 구현
            <br />- LocalStorage를 사용하여 일회성 팝업 구현
            <br />- react-intersection-observer를 사용해 무한 스크롤 구현
            <br />- 네이버 클라우드 플랫폼에서 Node Express 서버 구축
            <br />- LetsEncrypt를 사용하여 SSL 인증서 발급 후 https 적용
            <br />- Git Actions을 통한 배포 및 빌드 자동화 구축
            <BottomBorder />
            <StackList>
              <LabelSingle />
              <LabelTS />
              <LabelReact />
              <LabelRedux />
              <LabelReduxSaga />
              <LabelSC />
              <LabelAWS />
              <LabelMysql />
              <LabelNode />
              <LabelExpress />
              <LabelGitActions />
              <LabelFigma />
            </StackList>
          </DescDiv>
          <ImgDiv>
            <Swipers
              imgArr={[note0, note1, note2, note3]}
              bulletBgColor='#858585'
              bulletActiveColor='#000'
            ></Swipers>
          </ImgDiv>
        </NewContentBox>
      </ContentWrap>
    </>
  );
};

export default Intro_DungeonNote;
