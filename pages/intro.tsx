import { GetStaticProps } from 'next';
import Head from 'next/head';
import BasicTitle from '../components/BasicTitle';

//Intro.tsx
export default function Intro({ data, buildDate }: { data: string; buildDate: any }) {
  return (
    <>
      <Head>
        <title>인트로</title>
      </Head>
      <BasicTitle BasicTitleValue='안녕하세요?'></BasicTitle>
      <p>{buildDate}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let day = new Date().toJSON();
  return {
    props: {
      buildDate: day,
    }, // will be passed to the page component as props
    revalidate: false,
  };
};
