import { GetStaticProps } from 'next';
import BasicTitle from '../components/BasicTitle';

const Intro = ({ data, buildDate }: { data: string; buildDate: any }) => {
  return (
    <>
      <BasicTitle BasicTitleValue='안녕하세요?'></BasicTitle>
      <p>이 곳은 Next의 getStaticProps를 통해</p>
      <p>빌드타임에 데이터를 받아와 정적으로 생성된 페이지입니다.</p>

      <p>revalidate에 false를 주었기때문에 아래 날짜는 다음 빌드때까지 캐시됩니다.</p>
      <p>마지막 빌드 날짜입니다.</p>
      <p>{buildDate}</p>
    </>
  );
};

export default Intro;

export const getStaticProps: GetStaticProps = async (context) => {
  let day = new Date().toJSON();
  return {
    props: {
      data: '겟스태틱프롭스',
      buildDate: day,
    }, // will be passed to the page component as props
    revalidate: false,
  };
};
