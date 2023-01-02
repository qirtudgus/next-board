import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { idx },
    method,
  } = req;

  switch (method) {
    case 'POST':
      try {
        await excuteQuery({
          query: 'INSERT INTO board_table (title,content,date,userId) VALUES (?,?,?,?)',
          values: [req.body.title, req.body.content, req.body.date, req.body.userId],
        }).then((request) => {
          console.log('게시물이 등록되었습니다.');
          res.status(201).end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case 'GET':
      try {
        await excuteQuery({
          query: 'UPDATE board_table SET viewCount = viewCount + 1 WHERE idx = ?',
          values: [idx],
        });
        await excuteQuery({
          query: 'SELECT * FROM board_table WHERE idx = ?',
          values: idx,
        }).then((respones) => {
          console.log(respones);
          res.status(200).json(respones);
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case 'DELETE':
      try {
        await excuteQuery({
          query: 'DELETE FROM board_table WHERE idx = ?',
          values: [idx],
        }).then(() => {
          res.status(200).end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
    case 'PUT':
      try {
        await excuteQuery({
          query: 'UPDATE board_table SET title = ?, content = ? WHERE idx = ?',
          values: [req.body.title, req.body.content, Number(req.body.idx)],
        }).then(() => {
          res.status(200).end();
        });
      } catch (err) {
        console.log(err);
      }
      break;
  }
};

export default handler;
