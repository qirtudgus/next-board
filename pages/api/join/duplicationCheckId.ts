// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../../db/db';
import { registerState } from '../../../store/registerSlice';

export default async function handler(req: NextApiRequest, res: NextApiResponse<registerState>) {
  try {
    console.log(req.body.id);
    await excuteQuery({
      query: 'SELECT userId FROM user_table WHERE userId = ?',
      values: req.body.id,
    }).then((checkIdRespones) => {
      if ((checkIdRespones as any[]).length === 0) {
        console.log('사용 가능한 아이디');
        res.status(200).json({ idValue: false, idStatusText: '사용 가능한 아이디입니다.' });
      } else {
        console.log('이미 사용중인 아이디');
        res.status(200).json({ idValue: true, idStatusText: '이미 사용중인 아이디입니다.' });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
