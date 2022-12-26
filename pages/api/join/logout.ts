// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    deleteCookie('accessToken', { req, res });
    deleteCookie('refreshToken', { req, res });
    res.status(200).end();
  } catch (err) {
    console.log(err);
  }
}
