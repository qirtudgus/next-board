// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { boardArr } from '../home/title';

interface Data {
  index: number;
  title: string;
  date: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log('리퀘스트 쿼리 결과');
  console.log(req.query);
  res.status(200).json(boardArr[Number(req.query.idx) - 1]);
}
