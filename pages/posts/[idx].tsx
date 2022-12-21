import axios from 'axios';
import { useRouter } from 'next/router';
import { boardArr } from '../home/title';

export default function Post(props: any) {
  const router = useRouter();
  //하단에 getServerSideProps를 통해 응답받아온 데이터가 props에 들어있다.
  console.log(props);
  console.log(router);
  const post = boardArr[Number(router.query.idx) - 1];

  return (
    <>
      <h1>정적 데이터를 받아온 포스트 데이터</h1>
      <h3>{post.index}</h3>
      <h3>{post.title}</h3>
      <h3>{post.date}</h3>
      <h1>api 라우트로 받아온 포스트 데이터</h1>
      <h3>{props.data.index}</h3>
      <h3>{props.data.title}</h3>
      <h3>{props.data.date}</h3>
    </>
  );
}

//getServerSideProps를 호출하면 프론트에 렌더링되기전에 서버에서 데이터를 받아와 사용할 수 있다.
//getServerSideProps를 사용하는 페이지는 요청 시 서버 측에서 렌더링되며 캐시 제어 헤더가 구성된 경우에만 캐시된다.
//해당 함수는 요청하는 동안 데이터를 렌더링 할 필요가 있을 때 사용되는것이 Best다. ex)게시물 등..
//요청하는동안 데이터를 렌더링할 필요가 없는 경우 클라이언트측이나 StaticProps를 가져오는것을 고려
export async function getServerSideProps(context: any) {
  //context 인자에는 다양한 키가 들어있다. 아래 코드는 context에서 동적 경로 페이지 정보를 가져와서 그 번호로 axios 요청을 한것
  let { data } = await axios(
    `http://localhost:3000/api/hello?idx=${context.params.idx}`,
    {
      method: 'GET',
    },
  );

  console.log('패치 결과');
  console.log(data);

  return {
    props: {
      data,
    },
  };
}
