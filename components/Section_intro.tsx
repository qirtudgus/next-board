import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import 메타 from '../img/메타인지0.webp';
import 주인 from '../img/주인의식0.webp';
import 존중 from '../img/상호존중0.webp';
import Image from 'next/image';

const SectionWrap3 = styled(motion.div)`
  //스크롤바 너비를 빼준다
  width: 100%;
  height: calc(100vh * 3.5);
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.tablet} {
    height: calc(100vh * 4.5);
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: calc(100vh * 4.5);
  }
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
      width: 350px;
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

const Section_intro = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest: any) => {
      if (ref.current) {
        // ref.current.setAttribute('data-progress', scrollYProgress.get().toString());
        // let progressNumber = Number(ref.current.getAttribute('data-progress'));
        let progressNumber = Number(scrollYProgress.get());
        console.log(`섹션3 :${progressNumber}`);
        //섹션3에 돌입하면 1번섹션의 배경을 흰색으로 변경해주기
        //섹션3은 기본 검은색 배경 흰색글씨 -> 흰 배경 검은 글씨로
        //시작구간 값은 약 0.08 정도
        if (progressNumber > 0.1) {
          // (document!.getElementById('firstSection') as HTMLElement).classList.add('white');
          // (document!.getElementById('thirdSection') as HTMLElement).classList.add('white');
          // (document!.getElementById('Body') as HTMLElement).classList.add('white');

          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('white');
          (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('dark');
        } else {
          // (document!.getElementById('firstSection') as HTMLElement).classList.remove('white');
          // (document!.getElementById('thirdSection') as HTMLElement).classList.remove('white');
          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('white');
          (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('dark');
          // (document!.getElementById('Body') as HTMLElement).classList.remove('white');
        }
      }
    });
  }, []);

  const opacity = useTransform(scrollYProgress, [0.22, 0.48, 0.75, 0.9], [1, 0, 0, 1]);

  let currentWidth = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth as number;
    }
  };

  return (
    <>
      <SectionWrap3
        ref={ref}
        data-progress={scrollYProgress.get()}
        id={'thirdSection'}
      >
        <SectionDiv3 style={{}}>
          {/* width 뷰포트가 769미만이면 opacity를 호출하고 이상이면 opacity를 1로 설정해준다. */}
          <Section3_title style={(currentWidth() as number) < 1681 ? { opacity } : { opacity: '1' }}>
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
              ></Image>
            </Section3_box>
            <Section3_box>
              <Image
                className='section3_image'
                src={메타}
                alt='메타'
                width={470}
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

export default Section_intro;
