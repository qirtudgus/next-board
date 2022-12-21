import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await excuteQuery({
      query: 'SELECT * FROM board_table WHERE idx = ?',
      values: req.query.idx,
    }).then((respones) => {
      console.log(respones);
      res.status(200).json(respones);
    });
  } catch (err) {
    console.log(err);
  }
};

export default handler;
