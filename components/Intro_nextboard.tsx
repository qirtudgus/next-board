import styled from 'styled-components';
import { RefObject, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Swipers from './Swiper';
import p0 from '../img/neb1.webp';
import p1 from '../img/neb2.webp';
import p2 from '../img/neb3.webp';
import { BottomBorder, ContentName, ContentWrap, DescDiv, ImgDiv, NewContentBox, StackList } from './Intro_Poraid';
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
  LabelNext,
  LabelReduxToolkit,
  LabelVercel,
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
      rgba(122, 156, 255, 1) 0%,
      rgba(82, 161, 255, 1) 50%,
      rgba(17, 78, 255, 1) 100%
    );
    animation: spin 2.5s linear infinite;
  }
`;

const Intro_nextboard = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // useEffect(() => {
  //   return scrollYProgress.onChange((latest) => {
  //     //0.479보다 크면 white 추가하기, 작으면 white 삭제하기
  //     if (Number(scrollYProgress.get()) < 0.98279) {
  //       (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('white');
  //       (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('dark');
  //     } else {
  //       (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('white');
  //       (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('dark');
  //     }
  //   });
  // }, []);

  return (
    <>
      <ContentWrap ref={ref}>
        <NewContentBox>
          <DescDiv>
            <ContentName>
              <span>NeB</span>
              <div>
                <a
                  href='https://github.com/qirtudgus/next-board'
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
              </div>
            </ContentName>
            <BottomBorder />
            Next.js를 학습하기위해 시작한 프로젝트입니다.
            <br />
            - 게시판 좋아요, 게시물 검색, 댓글 기능 구현
            <br />- jwt토큰과 쿠키를 통한 로그인, 회원가입 기능 구현
            <br />- onBlur를 이용하여 아이디 중복 방지 기능 구현
            <br />- Vercel을 통한 배포 경험 후, AWS EC2로 서버 이전
            <br />- framer를 통한 스크롤 기반의 애니메이션 구현
            <br />- AWS EC2 amazon-linux2 환경에서 서버 구축
            <BottomBorder />
            <StackList>
              <LabelSingle />
              <LabelTS />
              <LabelNext />
              <LabelRedux />
              <LabelReduxToolkit />
              <LabelSC />
              <LabelVercel />
              <LabelAWS />
              <LabelMysql />
            </StackList>
          </DescDiv>
          <ImgDiv>
            <Swipers
              imgArr={[p0, p1, p2]}
              bulletActiveColor='#366bff'
              bulletBgColor='#858585'
            ></Swipers>
          </ImgDiv>
        </NewContentBox>
      </ContentWrap>
    </>
  );
};

export default Intro_nextboard;
