import styled from 'styled-components';
import { Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion } from 'framer-motion';
import 포레이드1 from '../img/포레이드1.png';
import Image from 'next/image';
import Swipers from './Swiper';

import p0 from '../img/poraid0_1200.webp';
import p1 from '../img/poraid1_1200.webp';
import p2 from '../img/poraid2_1200.webp';

const ContentWrapPoraid = styled.div`
  width: 100%;
  height: calc((100vh) * 1);
  background-color: #1d1d1f;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContentBox = styled.div`
  width: 90%;
  max-width: 1200px;
  position: relative;
  z-index: 10;
  align-items: center;
  justify-content: center;
  display: flex;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
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
  color: #fff;

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
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
    color: #fff;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
  & > div span svg:hover {
    cursor: pointer;
    fill: #ef5a34;
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

const Intro_Poraid = () => {
  return (
    <>
      <ContentWrapPoraid>
        <ContentBox>
          <DescDiv>
            <ContentName>
              <span>포레이드</span>
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
                      fill='#ffffff'
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
                      fill='#ffffff'
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
            닌텐도사의 포켓몬스터 게임 유저에게 도움을 줄 목적으로 제작한 사이트입니다. 실제로 서비스를 불특정다수에게
            배포하였습니다.
            <br />
            - 사용자간 실시간 소통 및 접속자 수 안내
            <br />
            - 기기별 알람 기능 구현
            <br />- 주기별 서버 데이터 정리
            <br />- 반응형 웹 구축
          </DescDiv>
          <ImgDiv>
            <Swipers
              imgArr={[p0, p1, p2]}
              bulletActiveColor='#ef5a34'
              bulletBgColor='#ffffff'
            ></Swipers>
          </ImgDiv>
        </ContentBox>
      </ContentWrapPoraid>
    </>
  );
};

export default Intro_Poraid;
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
