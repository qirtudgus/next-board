import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const page = req.query.page as string;
  //자동으로 디코딩되는듯..
  const keyword = req.query.keyword as string;
  const sort = req.query.sort as string;
  const theme = (req.query.theme as string) === '제목' ? 'title' : 'userId';
  let pageNumber = (Number(page) - 1) * 10; // 0

  console.log('소트들어온거 확인, 없으면 undifined');
  console.log(req.query);

  try {
    if (sort) {
      console.log('뭐로 정렬할래');
      await excuteQuery({
        query: `SELECT * FROM board_table WHERE ${theme} LIKE ?`,
        values: ['%' + keyword + '%'],
      }).then((queryResult) => {
        let list = (queryResult as any[]).reverse().slice(pageNumber, pageNumber + 9 + 1);
        let listNum = Math.ceil((queryResult as any[]).length / 10);
        res.status(200).send({ list, listNum });
      });
    } else {
      await excuteQuery({
        query: `SELECT * FROM board_table WHERE ${theme} LIKE ?`,
        values: ['%' + keyword + '%'],
      }).then((queryResult) => {
        let list = (queryResult as any[]).slice(pageNumber, pageNumber + 9 + 1);
        let listNum = Math.ceil((queryResult as any[]).length / 10);
        res.status(200).send({ list, listNum });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export default handler;
