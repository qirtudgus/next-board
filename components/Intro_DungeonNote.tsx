import styled from 'styled-components';
import { RefObject, Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion, useScroll } from 'framer-motion';
import 던전노트1 from '../img/던전노트1.png';
import Image from 'next/image';
import Swipers from './Swiper';

import note0 from '../img/note_1200.webp';
import note1 from '../img/note0_1200.webp';
import note2 from '../img/note1_1200.webp';
import note3 from '../img/note2_1200.webp';

const ContentWrapPoraid = styled(motion.div)`
  width: 100%;
  height: calc((100vh) * 1);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1d1d1f;
  /* background: rgb(61, 61, 61);
  background: radial-gradient(circle, rgba(61, 61, 61, 1) -50%, rgba(18, 18, 19, 1) 100%); */
`;

const ContentBox = styled.div`
  /* width: 90%;
  max-width: 1200px;
  align-items: center;
  justify-content: center;
  display: flex;
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  } */
  width: 90%;
  max-width: 1300px;
  position: relative;
  z-index: 10;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 40px 40px;
  border-radius: 20px;
  box-shadow: 0 0 70px 10px rgb(0 0 0 / 60%);
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    box-shadow: 0 0 40px 7px rgb(0 0 0 / 60%);
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
    box-shadow: 0 0 15px 5px rgb(0 0 0 / 60%);
  }
`;

function Scene(props: any) {
  //   const gltf = useLoader(GLTFLoader, './Emoji.gltf');
  const { scene } = useGLTF('./Emoji.gltf');
  return (
    <primitive
      object={scene}
      scale={15}
      {...props}
    />
  );
}

const DescDiv = styled.div`
  width: 500px;
  flex-direction: column;
  display: flex;
  position: relative;
  z-index: 10;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const DesckBlock = styled.div`
  display: flex;
  font-size: 1.3rem;
`;

const DescP = styled.p`
  margin-bottom: 10px;
  flex-shrink: 0;
`;
const DescText = styled.p`
  margin-bottom: 10px;
`;

const ContentName = styled.div`
  font-size: 2rem;
  border-bottom: 1px solid#fff;
  padding-bottom: 10px;
  margin-bottom: 15px;
  font-weight: bold;
  display: flex;

  /* align-items: center; */
  justify-content: space-between;
  & > div {
    display: flex;
    align-items: center;
  }

  & span {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  & > div span svg:hover {
    cursor: pointer;
    fill: #757575;
  }
`;
const ContentNameUnderline = styled.div``;

const ImgDiv = styled.div`
  display: block;
  width: 60%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    margin-top: 30px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;
const Intro_DungeonNote = () => {
  const ref = useRef() as RefObject<HTMLDivElement>;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  //해당 함수를 통해 data attribute 세팅
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (ref.current) {
        ref.current.setAttribute('data-progress', scrollYProgress.get().toString());
        let progressNumber = Number(ref.current.getAttribute('data-progress'));
        // console.log(`던전노트 : ${progressNumber}`);
        if (progressNumber > 0.964) {
          (document!.getElementById('header') as HTMLElement).classList.remove('text_black');
        }
        if (progressNumber > 0 && progressNumber < 0.96) {
          (document!.getElementById('header') as HTMLElement).classList.add('text_black');
        }
      }
    });
  }, []);

  return (
    <>
      <ContentWrapPoraid ref={ref}>
        <ContentBox>
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
                      fill='#fff'
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
                      fill='#fff'
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
            RPG 형식의 웹 게임입니다.
            <br />
            - 레벨업을 통해 스텟과 스킬포인트를 모아 캐릭터를 강하게!
            <br />
            - 미니게임과 던전을 탐험하여 돈과 경험치를 획득!
            <br />- 내가 만났던 몬스터를 확인하는 도감 기능
            <br />- 제일 높은 던전까지 탐험한 자는 누구? 랭킹 기능
          </DescDiv>
          <ImgDiv>
            <Swipers
              imgArr={[note0, note1, note2, note3]}
              bulletBgColor='#8b8b8b'
              bulletActiveColor='#fff'
            ></Swipers>
          </ImgDiv>
        </ContentBox>
      </ContentWrapPoraid>
    </>
  );
};

export default Intro_DungeonNote;
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
