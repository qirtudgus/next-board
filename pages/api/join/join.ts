// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import excuteQuery from '../../../db/db';
import createHashPassword from '../../../utils/createHashPassword';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { name, id, password } = req.body;
    const { salt, hashPassword } = createHashPassword(password);
    await excuteQuery({
      query: 'SELECT userId FROM user_table WHERE userId = ?',
      values: id,
    }).then((checkIdRespones) => {
      if ((checkIdRespones as any[]).length === 0) {
        console.log('사용 가능한 아이디');
        excuteQuery({
          query: 'INSERT INTO user_table (name,userId,password,salt) VALUES (?,?,?,?)',
          values: [name, id, hashPassword, salt],
        }).then((result) => {
          console.log(result);
          res.status(201).json('회원 가입이 완료되었습니다.');
        });
      } else {
        console.log('이미 사용중인 아이디');
        res.status(200).json({ value: true, statusText: '이미 사용중인 아이디입니다.' });
      }
    });
  } catch (err) {
    console.log(err);
  }
}
