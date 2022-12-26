import axios from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import customAxios from '../../utils/customAxios';

interface Data {
  idx: number;
  title: string;
  content: string;
  date: string;
  nickname: string;
}

interface BoardInterface {
  data: Data[];
}

export default function Post({ data }: BoardInterface) {
  const router = useRouter();
  //하단에 getServerSideProps를 통해 응답받아온 데이터가 props에 들어있다.
  return (
    <>
      <h1>api 라우트로 받아온 포스트 데이터</h1>
      <h3>{data[0].idx}</h3>
      <h3>{data[0].title}</h3>
      <h3>{data[0].date}</h3>
    </>
  );
}

//getServerSideProps를 호출하면 프론트에 렌더링되기전에 서버에서 데이터를 받아와 사용할 수 있다.
//getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 캐시 제어 헤더가 구성된 경우에만 캐시된다.
//해당 함수는 요청하는 동안 데이터를 렌더링 할 필요가 있을 때 사용되는것이 Best다. ex)게시물 등..
//요청하는동안 데이터를 렌더링할 필요가 없는 경우 클라이언트측이나 StaticProps를 가져오는것을 고려
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data }: BoardInterface = await customAxios('get', `/getBoard?idx=${context.params.idx}`);

  // let { data }: BoardInterface = await axios.get(
  //   `http://172.30.1.19:3000/api/getBoard?idx=${context.params.idx}`,
  // );

  return {
    props: {
      data,
    },
  };
};
