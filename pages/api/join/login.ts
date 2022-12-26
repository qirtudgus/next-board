// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import excuteQuery from '../../../db/db';
import checkHashPassword from '../../../utils/checkHashPassword';
import { setCookie } from 'cookies-next';
import { createJoseAccessToken, createJoseRefreshToken } from '../../../utils/createToken';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { id, password } = req.body;
    // id유무를 먼저 체크
    await excuteQuery({
      query: 'SELECT userId,password,salt FROM user_table WHERE userId = ?',
      values: id,
    }).then(async (checkIdRespones: any) => {
      //any가 아니려면 결과값을 인터페이스로 생성하여 as로 지정해주면 될 듯..?
      if ((checkIdRespones as any[]).length === 0) {
        console.log('존재하지 않는 아이디');
        res.status(200).json({
          idValue: true,
          idStatusText: '존재하지않는 아이디입니다.',
          passwordValue: false,
          passwordStatusText: '',
        });
      } else {
        //아이디가 존재한다면 여기서 패스워드를 비교하자
        let result = checkHashPassword(password, checkIdRespones[0].password, checkIdRespones[0].salt);
        if (result) {
          console.log('로그인 성공!');
          const accessToken = await createJoseAccessToken(id);
          const refreshToken = await createJoseRefreshToken(id);
          setCookie('accessToken', accessToken, { req, res, httpOnly: true });
          setCookie('refreshToken', refreshToken, { req, res, httpOnly: true });

          // await excuteQuery({
          //   query: 'UPDATE user_table SET refreshToken = ? WHERE userId = ?',
          //   values: [refreshToken, id],
          // }).then((result) => {
          //   console.log(result);
          //   res.status(200).json({
          //     id: id,
          //     idValue: false,
          //     idStatusText: '로그인 완료!',
          //     passwordValue: false,
          //     passwordStatusText: '비밀번호 일치',
          //   });
          // });
          res.status(200).json({
            id: id,
            idValue: false,
            idStatusText: '로그인 완료!',
            passwordValue: false,
            passwordStatusText: '비밀번호 일치',
          });
        } else {
          res.status(200).json({
            id: '',
            idValue: false,
            idStatusText: '',
            passwordValue: true,
            passwordStatusText: '비밀번호가 틀렸습니다.',
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}
