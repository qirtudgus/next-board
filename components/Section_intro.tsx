import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';
import 메타 from '../img/메타인지0.webp';
import 주인 from '../img/주인의식0.webp';
import 존중 from '../img/상호존중0.webp';
import Image from 'next/image';

const SectionWrap3 = styled(motion.div)`
  width: 100%;
  height: calc(100vh * 3);
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
  z-index: 1;
  @media screen and (max-width: 1680px) {
    flex-direction: column;
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
    & .section3_image {
      width: 100%;
      height: fit-content;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
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
  padding: 50vh 0;
`;

const Section3_box = styled(motion.div)`
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
    margin-left: 300px;
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
    margin-left: 160px;
    & > div {
      text-align: right;
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

const Section3_boxText = styled(motion.div)`
  width: fit-content;
  font-size: 1.2rem;
  flex-shrink: 0;
  /* width: fit-content; */
  word-break: keep-all;
  line-height: 1.1em;
  margin-top: 20px;

  & .Title {
    display: block;
    font-weight: bold;
    font-size: 40px;
    /* padding-bottom: 5px; */
    @media ${({ theme }) => theme.device.tablet} {
      margin-top: 20px;
    }
  }
  & .Number1 {
    top: 136px;
    left: -294px;
    letter-spacing: -10px;
    font-weight: bold;
    font-size: 140px;
    color: rgba(0, 0, 0, 0.1);
    position: absolute;
  }
  & .Number2 {
    top: 137px;
    left: 274px;
    letter-spacing: -10px;
    font-weight: bold;
    font-size: 140px;
    color: rgba(0, 0, 0, 0.1);
    position: absolute;
  }
  & .Number3 {
    top: 143px;
    left: -112px;
    letter-spacing: -10px;
    font-weight: bold;
    font-size: 140px;
    color: rgba(0, 0, 0, 0.1);
    position: absolute;
  }
  @media ${({ theme }) => theme.device.mobile} {
    & .Number1 {
      top: 62px;
      left: -33px;
    }
    & .Number2 {
      left: 177px;
    }
    & .Number3 {
      top: -5px;
      left: -7px;
    }
  }
`;

const SubText = styled(motion.span)`
  font-size: 22px;
  position: relative;
`;

const Section_intro = ({ width }: { width: number }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest: any) => {
      if (ref.current) {
        let progressNumber = Number(scrollYProgress.get());
        console.log(`섹션3 :${progressNumber}`);

        if (progressNumber > 0.1) {
          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('white');
          (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.add('dark');
        } else {
          (document!.getElementsByTagName('body') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('white');
          (document!.getElementsByTagName('header') as HTMLCollectionOf<HTMLBodyElement>)[0].classList.remove('dark');
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
        id={'thirdSection'}
      >
        <SectionDiv3 style={{}}>
          {/* width 뷰포트가 1681보다 작으면 opacity를 호출하고 이상이면 opacity를 1로 설정해준다. */}
          <Section3_title style={width < 1681 ? { opacity } : { opacity: '1' }}>
            이런 개발자가
            <br /> 되기 위해
            <br /> 노력합니다.
          </Section3_title>
          {/* 기존의 스타일 */}
          <Section3_boxWrap>
            <Section3_box
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{
                opacity: 1,
                translateY: 0,
                transition: {
                  delay: 0.1,
                  type: 'spring',
                  duration: 1,
                },
              }}
            >
              <Image
                className='section3_image'
                src={존중}
                alt='존중'
                width={600}
              ></Image>
              <Section3_boxText>
                <span className='Number1'>01</span>
                <span className='Title'>긍정적이고</span>
                <br />
                <SubText>
                  늘 긍정적인 마인드로
                  <br /> 스트레스를 받지않아요!
                </SubText>
              </Section3_boxText>
            </Section3_box>
            <Section3_box
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{
                opacity: 1,
                translateY: 0,
                transition: { delay: 0.1, type: 'spring', duration: 1 },
              }}
            >
              <Section3_boxText>
                <span className='Number2'>02</span>
                <span className='Title'>기록하고</span>
                <br />
                <SubText>
                  처음 보는 버그는 블로그에
                  <br /> 기록하여 두번 겪지않으려해요.
                </SubText>
              </Section3_boxText>
              <Image
                className='section3_image'
                src={주인}
                alt='주인'
                width={600}
              ></Image>
            </Section3_box>
            <Section3_box
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{
                opacity: 1,
                translateY: 0,
                transition: { delay: 0.1, type: 'spring', duration: 1 },
              }}
            >
              <Image
                className='section3_image'
                src={메타}
                alt='메타'
                width={470}
              ></Image>
              <Section3_boxText>
                <span className='Number3'>03</span>
                <span className='Title'>함께하는</span>
                <br />
                <SubText>
                  항상 주위를 격려해주는 편이에요.
                  <br />
                  함께 가고싶은 사람이 되고싶어요.{' '}
                </SubText>
              </Section3_boxText>
            </Section3_box>
          </Section3_boxWrap>
        </SectionDiv3>
      </SectionWrap3>
    </>
  );
};

export default Section_intro;
