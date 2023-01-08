import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { idx, commentIdx, postIdxQuery },
    method,
  } = req;

  const { userId, userIdx, content, date, postIdx } = req.body;

  switch (method) {
    case 'POST':
      try {
        //코맨트 갯수 증가
        await excuteQuery({
          query: 'UPDATE board_table SET commentCount = commentCount + 1 WHERE idx = ?',
          values: [postIdx],
        });

        await excuteQuery({
          query: 'INSERT INTO comment_table (userId,userIdx,content,date,postIdx) VALUES (?,?,?,?,?)',
          values: [userId, userIdx, content, date, postIdx],
        }).then(async (result) => {
          //작성 후 새로 업데이트
          await excuteQuery({
            query: 'SELECT * FROM comment_table WHERE postIdx = ?',
            values: [postIdx],
          }).then((result) => {
            res.status(200).json(result);
          });
        });
      } catch (err) {
        console.log(err);
      }
      break;

    case 'GET':
      try {
        await excuteQuery({
          query: 'SELECT * FROM comment_table WHERE postIdx = ?',
          values: [idx],
        }).then((result) => {
          console.log('새로 가져온 댓글 목록.');
          res.status(200).json(result);
        });
      } catch (err) {
        console.log(err);
      }
      break;

    case 'DELETE':
      try {
        //코맨트 갯수 감소
        await excuteQuery({
          query: 'UPDATE board_table SET commentCount = commentCount - 1 WHERE idx = ?',
          values: [postIdxQuery],
        });
        await excuteQuery({
          query: 'DELETE FROM comment_table WHERE idx = ?',
          values: [commentIdx],
        }).then(async () => {
          await excuteQuery({
            query: 'SELECT * FROM comment_table WHERE postIdx = ?',
            values: [postIdxQuery],
          }).then((result) => {
            console.log('새로 가져온 댓글 목록.');
            res.status(200).json(result);
          });
        });
      } catch (err) {}
  }
}
