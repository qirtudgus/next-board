import { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../../db/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userIdx } = req.query;

  console.log(userIdx);

  try {
    excuteQuery({ query: 'SELECT userId,name,joinedDate FROM user_table WHERE idx = ?', values: [userIdx] }).then(
      (result) => {
        res.status(200).json(result[0]);
      },
    );
  } catch (err) {
    console.log(err);
  }
}
