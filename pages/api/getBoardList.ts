import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await excuteQuery({
      query: 'SELECT * FROM board_table',
      values: '',
    }).then((respones) => {
      res.status(200).send(respones);
    });
  } catch (err) {
    console.log(err);
  }
};

export default handler;
