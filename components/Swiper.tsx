//포트폴리오 소개 시 쓰이는 스와이퍼 컴포넌트입니다.

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { Lazy, Pagination, Navigation } from 'swiper';

import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';

interface StyleInterface {
  bulletBgColor: string;
  bulletActiveColor: string;
}

const SwiperStyle = styled.div<StyleInterface>`
  & .swiper-slide {
    padding: 15px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    & .swiper-slide {
      padding: 10px;
    }
  }

  & .swiper-pagination {
    bottom: 0px;
  }

  & .swiper-pagination-bullet {
    width: 20px;
    height: 5px;
    border-radius: 0px;
    background: #464646;
    /* background: ${(props) => props.bulletBgColor}; */
    opacity: 0.7;
  }

  & .swiper-pagination-bullet-active {
    background: #366bff;
    /* background: ${(props) => props.bulletActiveColor}; */
    opacity: 1;
  }

  & .swiper-button-prev {
    left: -3px;
  }
  & .swiper-button-next {
    right: -3px;
  }

  & .swiper-button-prev,
  .swiper-rtl,
  .swiper-button-next {
    z-index: 11;
    color: #366bff;
    /* color: ${(props) => props.bulletActiveColor}; */
  }

  & .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 2rem !important;
    font-weight: bold;
  }

  & img {
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
    position: static !important;
  }
`;

const Swipers = ({
  imgArr,
  bulletActiveColor,
  bulletBgColor,
}: {
  imgArr: StaticImageData[];
  bulletActiveColor: string;
  bulletBgColor: string;
}) => {
  return (
    <SwiperStyle
      bulletActiveColor={bulletActiveColor}
      bulletBgColor={bulletBgColor}
    >
      <Swiper
        grabCursor
        lazy={true}
        pagination={true}
        navigation={true}
        modules={[Lazy, Pagination, Navigation]}
        slidesPerView={1}
      >
        {imgArr &&
          (imgArr as StaticImageData[]).map((i, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  className='swiper-lazy'
                  src={i}
                  alt='image'
                  width={1000}
                  height={727}
                ></Image>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </SwiperStyle>
  );
};

export default Swipers;
