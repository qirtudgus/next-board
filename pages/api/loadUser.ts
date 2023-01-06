import { NextApiRequest, NextApiResponse } from 'next';
import { createJoseAccessToken, verifyJoseToken } from '../../utils/createToken';
import { deleteCookie, setCookie, setCookies } from 'cookies-next';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accessToken, refreshToken } = req.cookies;
  //쿠키에 토큰이 없으면 바로 리턴
  if (refreshToken === undefined && accessToken === undefined) return res.status(204).end();
  let accessResult = await verifyJoseToken(accessToken);
  let refreshResult = await verifyJoseToken(refreshToken);
  //액세스 토큰 유효
  if (accessResult) {
    let id = accessResult.id as string;
    let idx = accessResult.idx as string;
    console.log('액세스 토큰 유효');
    res.status(200).json({ id, idx });
  }
  //액세스 토큰 만료
  else {
    console.log('액세스 토큰 만료');
    //리프레시 토큰 체크
    if (refreshResult) {
      //리프레시 토큰 유효
      console.log('액세스 토큰 재발급');
      let id = refreshResult.id as string;
      let idx = refreshResult.idx as string;
      const newAccessToken = await createJoseAccessToken(id, idx);
      setCookie('accessToken', newAccessToken, { req, res, httpOnly: true, sameSite: 'lax' });
      res.status(200).json({ id, idx });
    }
    //리프레시 토큰 만료
    else {
      console.log('리프레시 토큰도 만료되어 모두 삭제');
      deleteCookie('accessToken', { req, res });
      deleteCookie('refreshToken', { req, res });
      res.status(204).end();
    }
  }
};

export default handler;
