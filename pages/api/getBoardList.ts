import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const page = req.query.page as string;
  //쿼리스트링에 담은 현재 페이지 정보
  let pageNumber = (Number(page) - 1) * 10; // 0
  console.log(req.query);
  try {
    await excuteQuery({
      query: 'SELECT * FROM board_table',
      values: '',
    }).then((queryResult) => {
      //10개 자른 게시판 데이터
      let list = (queryResult as any[]).slice(pageNumber, pageNumber + 9 + 1);
      //총 게시물을 보여주는데 필요한 페이지 수
      let listNum = Math.ceil((queryResult as any[]).length / 10);
      res.status(200).send({ list, listNum });
    });
  } catch (err) {
    console.log(err);
  }
};

export default handler;
