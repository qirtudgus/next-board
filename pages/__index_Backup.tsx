import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import Intro_Poraid from '../components/Intro_Poraid';
import Intro_DungeonNote from '../components/Intro_DungeonNote';
import Intro_First from '../components/Intro_first';

interface WrapInterface {
  backgroundcolors: string;
}

const ContentWrap = styled.div<WrapInterface>`
  width: 100%;
  height: calc((100vh) * 1);
  background-color: ${(props) => props.backgroundcolors};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & div {
    width: 90%;
    max-width: 1000px;
  }
  & > div > p {
    font-weight: bold;
    font-size: 4rem;
    color: #fff;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & > div > p {
      font-size: 3rem;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    & > div > p {
      font-size: 2rem;
    }
  }
`;

export const ContentText = styled(motion.p)`
  font-weight: bold;
  font-size: 4rem;
  color: #000;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 3rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 2rem;
  }
`;

const ContentWrapWhite = styled.div`
  width: 100%;
  min-height: calc((100vh) * 1);
  max-height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > div {
    width: 100%;
    max-width: 1200px;
  }
  & > div > p {
    font-weight: bold;
    font-size: 4rem;
    color: #000;
    margin-left: 20px;
  }
  @media ${({ theme }) => theme.device.tablet} {
    & > div > p {
      font-size: 3rem;
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    & > div > p {
      font-size: 2rem;
    }
  }
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: black;
  transform-origin: 0%;
  z-index: 1000;
`;

const StackDiv = styled.div`
  width: 100%;
  justify-content: space-evenly;
  display: flex;
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
`;

const StackTitle = styled.p`
  font-size: 1.2rem !important;
  color: #000;
  margin-top: 5px;
  font-weight: normal !important;
`;

const StackCard = styled(motion.div)`
  width: 150px;
  max-width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
  margin: 30px;

  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
    height: 100px;
    & > svg {
      width: 70px !important;
      height: 70px !important;
    }
    & > p {
      font-size: 1rem !important;
    }
  }
`;

const ReactSvg = styled(motion.svg)`
  width: 100px;
  height: 100px;
`;
const NextSvg = styled(motion.svg)`
  width: 100px;
  height: 100px;
`;

const TsSvg = styled.svg`
  width: 100px;
  height: 100px;
`;

const NodeSvg = styled.svg`
  width: 100px;
  height: 100px;
`;

const ReduxSvg = styled.svg`
  width: 100px;
  height: 100px;
`;

const JsSvg = styled.svg`
  width: 100px;
  height: 100px;
`;

const CurrentYScroll = styled.div`
  position: fixed;
  color: red;
  top: 100px;
  left: 0;
  z-index: 100;
`;

export default function Home() {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);
  const [Ystate, SetYstate] = useState(Number(0));
  useEffect(() => {
    return scrollY.onChange((latest) => {
      console.log('Page scroll: ', latest);
      SetYstate(latest);
    });
  }, [scrollY]);

  return (
    <>
      <Head>
        <title>index</title>
        <meta
          name='description'
          content='Generated by create next app'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>{' '}
      {/* <ProgressBar style={{ scaleX }} /> */}
      <CurrentYScroll>{Ystate}</CurrentYScroll>
      {/* <Intro_First></Intro_First> */}
      {/* <Intro_Second></Intro_Second> */}
      {/* <ContentWrapWhite>
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            아래의 기술들로 경험을 쌓고 있습니다!
          </motion.p>
          <StackDiv>
            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReactSvg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='-11.5 -10.23174 23 20.46348'
              >
                <title>React Logo</title>
                <circle
                  cx='0'
                  cy='0'
                  r='2.05'
                  fill='#61dafb'
                />
                <g
                  stroke='#61dafb'
                  stroke-width='1'
                  fill='none'
                >
                  <ellipse
                    rx='11'
                    ry='4.2'
                  />
                  <ellipse
                    rx='11'
                    ry='4.2'
                    transform='rotate(60)'
                  />
                  <ellipse
                    rx='11'
                    ry='4.2'
                    transform='rotate(120)'
                  />
                </g>
              </ReactSvg>
            </StackCard>

            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReduxSvg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
              >
                <g fill='#764ABC'>
                  <path d='M65.6 65.4c2.9-.3 5.1-2.8 5-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 1.5.7 2.8 1.6 3.7-3.4 6.7-8.6 11.6-16.4 15.7-5.3 2.8-10.8 3.8-16.3 3.1-4.5-.6-8-2.6-10.2-5.9-3.2-4.9-3.5-10.2-.8-15.5 1.9-3.8 4.9-6.6 6.8-8-.4-1.3-1-3.5-1.3-5.1-14.5 10.5-13 24.7-8.6 31.4 3.3 5 10 8.1 17.4 8.1 2 0 4-.2 6-.7 12.8-2.5 22.5-10.1 28-21.4z' />
                  <path d='M83.2 53c-7.6-8.9-18.8-13.8-31.6-13.8H50c-.9-1.8-2.8-3-4.9-3h-.2c-3.1.1-5.5 2.7-5.4 5.8.1 3 2.6 5.4 5.6 5.4h.2c2.2-.1 4.1-1.5 4.9-3.4H52c7.6 0 14.8 2.2 21.3 6.5 5 3.3 8.6 7.6 10.6 12.8 1.7 4.2 1.6 8.3-.2 11.8-2.8 5.3-7.5 8.2-13.7 8.2-4 0-7.8-1.2-9.8-2.1-1.1 1-3.1 2.6-4.5 3.6 4.3 2 8.7 3.1 12.9 3.1 9.6 0 16.7-5.3 19.4-10.6 2.9-5.8 2.7-15.8-4.8-24.3z' />
                  <path d='M32.4 67.1c.1 3 2.6 5.4 5.6 5.4h.2c3.1-.1 5.5-2.7 5.4-5.8-.1-3-2.6-5.4-5.6-5.4h-.2c-.2 0-.5 0-.7.1-4.1-6.8-5.8-14.2-5.2-22.2.4-6 2.4-11.2 5.9-15.5 2.9-3.7 8.5-5.5 12.3-5.6 10.6-.2 15.1 13 15.4 18.3 1.3.3 3.5 1 5 1.5-1.2-16.2-11.2-24.6-20.8-24.6-9 0-17.3 6.5-20.6 16.1-4.6 12.8-1.6 25.1 4 34.8-.5.7-.8 1.8-.7 2.9z' />
                </g>
              </ReduxSvg>
            </StackCard>

            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <JsSvg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 630 630'
              >
                <rect
                  width='630'
                  height='630'
                  fill='#f7df1e'
                />
                <path d='m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z' />
              </JsSvg>
            </StackCard>

            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TsSvg
                fill='none'
                height='256'
                viewBox='0 0 256 256'
                width='256'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect
                  fill='#3178c6'
                  height='256'
                  rx='128'
                  width='256'
                />
                <path
                  clip-rule='evenodd'
                  d='m140.463 160.712v25.03c4.017 2.086 8.767 3.651 14.25 4.694 5.484 1.043 11.264 1.564 17.34 1.564 5.921 0 11.547-.574 16.876-1.721s10.002-3.037 14.018-5.671c4.016-2.633 7.196-6.075 9.539-10.325s3.514-9.503 3.514-15.761c0-4.537-.669-8.513-2.008-11.929-1.339-3.415-3.27-6.453-5.793-9.112-2.523-2.66-5.548-5.045-9.075-7.157s-7.505-4.107-11.933-5.984c-3.244-1.356-6.153-2.673-8.728-3.95-2.574-1.278-4.762-2.581-6.565-3.911-1.802-1.33-3.192-2.738-4.17-4.224-.979-1.486-1.468-3.168-1.468-5.045 0-1.721.438-3.272 1.313-4.654.876-1.382 2.111-2.5686 3.707-3.5594 1.597-.9908 3.553-1.7599 5.87-2.3075 2.317-.5475 4.892-.8213 7.724-.8213 2.06 0 4.235.1565 6.526.4694 2.292.3128 4.596.7952 6.913 1.447 2.317.6519 4.57 1.4732 6.758 2.4638 2.188.991 4.209 2.138 6.063 3.442v-23.3879c-3.759-1.4601-7.865-2.5422-12.319-3.2461-4.454-.704-9.564-1.056-15.331-1.056-5.87 0-11.431.6388-16.683 1.9164s-9.873 3.2722-13.864 5.9838-7.144 6.1663-9.461 10.3641-3.476 9.2167-3.476 15.0577c0 7.457 2.124 13.818 6.372 19.085s10.697 9.726 19.348 13.376c3.398 1.408 6.565 2.79 9.5 4.146 2.934 1.355 5.47 2.763 7.607 4.223 2.137 1.461 3.823 3.051 5.059 4.772s1.854 3.676 1.854 5.866c0 1.617-.386 3.116-1.159 4.498-.772 1.382-1.943 2.581-3.514 3.598-1.57 1.017-3.527 1.812-5.87 2.386-2.343.573-5.085.86-8.225.86-5.355 0-10.659-.952-15.911-2.855s-10.118-4.758-14.598-8.565zm-42.7525-62.1709h32.2895v-20.5411h-90v20.5411h32.1316v91.4589h25.5789z'
                  fill='#fff'
                  fill-rule='evenodd'
                />
              </TsSvg>
            </StackCard>
            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NextSvg
                fill='#000000'
                height='18.2741116751'
                viewBox='0 0 394 80'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  d='M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  d='M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  d='M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  clip-rule='evenodd'
                  d='M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z'
                  fill='var(--geist-foreground)'
                  fill-rule='evenodd'
                ></path>
                <path
                  d='M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  d='M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z'
                  fill='var(--geist-foreground)'
                ></path>
                <path
                  d='M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z'
                  fill='var(--geist-foreground)'
                ></path>
              </NextSvg>
            </StackCard>

            <StackCard
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <NodeSvg
                xmlns='http://www.w3.org/2000/svg'
                width='589.827'
                height='361.238'
                version='1.2'
                viewBox='0 0 442.37 270.929'
              >
                <defs>
                  <clipPath id='a'>
                    <path d='M239.03 226.605l-42.13 24.317c-1.578.91-2.546 2.59-2.546 4.406v48.668c0 1.817.968 3.496 2.546 4.406l42.133 24.336c1.575.907 3.517.907 5.09 0l42.126-24.336c1.57-.91 2.54-2.59 2.54-4.406v-48.668c0-1.816-.97-3.496-2.55-4.406l-42.12-24.317c-.79-.453-1.67-.68-2.55-.68-.88 0-1.76.227-2.55.68' />
                  </clipPath>
                  <linearGradient
                    id='b'
                    x1='-.348'
                    x2='1.251'
                    gradientTransform='rotate(116.114 53.1 202.97) scale(86.48)'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop
                      offset='.3'
                      stop-color='#3E863D'
                    />
                    <stop
                      offset='.5'
                      stop-color='#55934F'
                    />
                    <stop
                      offset='.8'
                      stop-color='#5AAD45'
                    />
                  </linearGradient>
                  <clipPath id='c'>
                    <path d='M195.398 307.086c.403.523.907.976 1.5 1.316l36.14 20.875 6.02 3.46c.9.52 1.926.74 2.934.665.336-.027.672-.09 1-.183l44.434-81.36c-.34-.37-.738-.68-1.184-.94l-27.586-15.93-14.582-8.39c-.414-.24-.863-.41-1.32-.53zm0 0' />
                  </clipPath>
                  <linearGradient
                    id='d'
                    x1='-.456'
                    x2='.582'
                    gradientTransform='rotate(-36.46 550.846 -214.337) scale(132.798)'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop
                      offset='.57'
                      stop-color='#3E863D'
                    />
                    <stop
                      offset='.72'
                      stop-color='#619857'
                    />
                    <stop
                      offset='1'
                      stop-color='#76AC64'
                    />
                  </linearGradient>
                  <clipPath id='e'>
                    <path d='M241.066 225.953c-.707.07-1.398.29-2.035.652l-42.01 24.247 45.3 82.51c.63-.09 1.25-.3 1.81-.624l42.13-24.336c1.3-.754 2.19-2.03 2.46-3.476l-46.18-78.89c-.34-.067-.68-.102-1.03-.102-.14 0-.28.007-.42.02' />
                  </clipPath>
                  <linearGradient
                    id='f'
                    x1='.043'
                    x2='.984'
                    gradientTransform='translate(192.862 279.652) scale(97.417)'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop
                      offset='.16'
                      stop-color='#6BBF47'
                    />
                    <stop
                      offset='.38'
                      stop-color='#79B461'
                    />
                    <stop
                      offset='.47'
                      stop-color='#75AC64'
                    />
                    <stop
                      offset='.7'
                      stop-color='#659E5A'
                    />
                    <stop
                      offset='.9'
                      stop-color='#3E863D'
                    />
                  </linearGradient>
                </defs>
                <path
                  fill='#689f63'
                  d='M218.647 270.93c-1.46 0-2.91-.383-4.19-1.12l-13.337-7.896c-1.992-1.114-1.02-1.508-.363-1.735 2.656-.93 3.195-1.14 6.03-2.75.298-.17.688-.11.993.07l10.246 6.08c.37.2.895.2 1.238 0l39.95-23.06c.37-.21.61-.64.61-1.08v-46.1c0-.46-.24-.87-.618-1.1l-39.934-23.04c-.37-.22-.86-.22-1.23 0l-39.926 23.04c-.387.22-.633.65-.633 1.09v46.1c0 .44.24.86.62 1.07l10.94 6.32c5.94 2.97 9.57-.53 9.57-4.05v-45.5c0-.65.51-1.15 1.16-1.15h5.06c.63 0 1.15.5 1.15 1.15v45.52c0 7.92-4.32 12.47-11.83 12.47-2.31 0-4.13 0-9.21-2.5l-10.48-6.04c-2.59-1.5-4.19-4.3-4.19-7.29v-46.1c0-3 1.6-5.8 4.19-7.28l39.99-23.07c2.53-1.43 5.89-1.43 8.4 0l39.94 23.08c2.58 1.49 4.19 4.28 4.19 7.28v46.1c0 2.99-1.61 5.78-4.19 7.28l-39.94 23.07c-1.28.74-2.73 1.12-4.21 1.12'
                />
                <path
                  fill='#689f63'
                  d='M230.987 239.164c-17.48 0-21.145-8.024-21.145-14.754 0-.64.516-1.15 1.157-1.15h5.16c.57 0 1.05.415 1.14.978.78 5.258 3.1 7.91 13.67 7.91 8.42 0 12-1.902 12-6.367 0-2.57-1.02-4.48-14.1-5.76-10.94-1.08-17.7-3.49-17.7-12.24 0-8.06 6.8-12.86 18.19-12.86 12.79 0 19.13 4.44 19.93 13.98.03.33-.09.65-.31.89-.22.23-.53.37-.85.37h-5.19c-.54 0-1.01-.38-1.12-.9-1.25-5.53-4.27-7.3-12.48-7.3-9.19 0-10.26 3.2-10.26 5.6 0 2.91 1.26 3.76 13.66 5.4 12.28 1.63 18.11 3.93 18.11 12.56 0 8.7-7.26 13.69-19.92 13.69m48.66-48.89h1.34c1.1 0 1.31-.77 1.31-1.22 0-1.18-.81-1.18-1.26-1.18h-1.38zm-1.63-3.78h2.97c1.02 0 3.02 0 3.02 2.28 0 1.59-1.02 1.92-1.63 2.12 1.19.08 1.27.86 1.43 1.96.08.69.21 1.88.45 2.28h-1.83c-.05-.4-.33-2.6-.33-2.72-.12-.49-.29-.73-.9-.73h-1.51v3.46h-1.67zm-3.57 4.3c0 3.58 2.89 6.48 6.44 6.48 3.58 0 6.47-2.96 6.47-6.48 0-3.59-2.93-6.44-6.48-6.44-3.5 0-6.44 2.81-6.44 6.43m14.16.03c0 4.24-3.47 7.7-7.7 7.7-4.2 0-7.7-3.42-7.7-7.7 0-4.36 3.58-7.7 7.7-7.7 4.15 0 7.69 3.35 7.69 7.7'
                />
                <path
                  fill='#333'
                  fill-rule='evenodd'
                  d='M94.936 90.55c0-1.84-.97-3.53-2.558-4.445l-42.356-24.37c-.715-.42-1.516-.64-2.328-.67h-.438c-.812.03-1.613.25-2.34.67L2.562 86.105C.984 87.025 0 88.715 0 90.555l.093 65.64c0 .91.47 1.76 1.27 2.21.78.48 1.76.48 2.54 0l25.18-14.42c1.59-.946 2.56-2.618 2.56-4.44V108.88c0-1.83.97-3.52 2.555-4.43l10.72-6.174c.796-.46 1.67-.688 2.56-.688.876 0 1.77.226 2.544.687l10.715 6.172c1.586.91 2.56 2.6 2.56 4.43v30.663c0 1.82.983 3.5 2.565 4.44l25.164 14.41c.79.47 1.773.47 2.56 0 .776-.45 1.268-1.3 1.268-2.21zm199.868 34.176c0 .457-.243.88-.64 1.106l-14.548 8.386c-.395.227-.883.227-1.277 0l-14.55-8.386c-.4-.227-.64-.65-.64-1.106V107.93c0-.458.24-.88.63-1.11l14.54-8.4c.4-.23.89-.23 1.29 0l14.55 8.4c.4.23.64.652.64 1.11zM298.734.324c-.794-.442-1.76-.43-2.544.027-.78.46-1.262 1.3-1.262 2.21v65c0 .64-.34 1.23-.894 1.55-.55.32-1.235.32-1.79 0L281.634 63c-1.58-.914-3.526-.914-5.112 0l-42.37 24.453c-1.583.91-2.56 2.6-2.56 4.42v48.92c0 1.83.977 3.51 2.56 4.43l42.37 24.47c1.582.91 3.53.91 5.117 0l42.37-24.48c1.58-.92 2.56-2.6 2.56-4.43V18.863c0-1.856-1.01-3.563-2.63-4.47zm141.093 107.164c1.574-.914 2.543-2.602 2.543-4.422V91.21c0-1.824-.97-3.507-2.547-4.425l-42.1-24.44c-1.59-.92-3.54-.92-5.13 0l-42.36 24.45c-1.59.92-2.56 2.6-2.56 4.43v48.9c0 1.84.99 3.54 2.58 4.45l42.09 23.99c1.55.89 3.45.9 5.02.03l25.46-14.15c.8-.45 1.31-1.3 1.31-2.22 0-.92-.49-1.78-1.29-2.23l-42.62-24.46c-.8-.45-1.29-1.3-1.29-2.21v-15.34c0-.916.48-1.76 1.28-2.216l13.26-7.65c.79-.46 1.76-.46 2.55 0l13.27 7.65c.79.45 1.28 1.3 1.28 2.21v12.06c0 .91.49 1.76 1.28 2.22.79.45 1.77.45 2.56-.01zm0 0'
                />
                <path
                  fill='#689f63'
                  fill-rule='evenodd'
                  d='M394.538 105.2c.3-.177.676-.177.98 0l8.13 4.69c.304.176.49.5.49.85v9.39c0 .35-.186.674-.49.85l-8.13 4.69c-.304.177-.68.177-.98 0l-8.125-4.69c-.31-.176-.5-.5-.5-.85v-9.39c0-.35.18-.674.49-.85zm0 0'
                />
                <g
                  clip-path='url(#a)'
                  transform='translate(-78.306 -164.016)'
                >
                  <path
                    fill='url(#b)'
                    d='M331.363 246.793l-118.715-58.19-60.87 124.174L270.49 370.97zm0 0'
                  />
                </g>
                <g
                  clip-path='url(#c)'
                  transform='translate(-78.306 -164.016)'
                >
                  <path
                    fill='url(#d)'
                    d='M144.07 264.004l83.825 113.453 110.86-81.906-83.83-113.45zm0 0'
                  />
                </g>
                <g
                  clip-path='url(#e)'
                  transform='translate(-78.306 -164.016)'
                >
                  <path
                    fill='url(#f)'
                    d='M197.02 225.934v107.43h91.683v-107.43zm0 0'
                  />
                </g>
              </NodeSvg>
            </StackCard>
          </StackDiv>
        </div>
      </ContentWrapWhite> */}
      {/* <Intro_Poraid></Intro_Poraid>
      <Intro_DungeonNote></Intro_DungeonNote> */}
    </>
  );
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return <IndexLayout>{page}</IndexLayout>;
// };
