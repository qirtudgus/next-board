// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export const boardArr = [
  { index: 1, title: '제목이에요.', date: '2020-12-12' },
  { index: 2, title: '자랑입니다.', date: '2020-12-12' },
  { index: 3, title: '공부중이에요.', date: '2020-12-12' },
];

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
