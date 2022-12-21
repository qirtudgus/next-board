/* eslint-disable import/no-anonymous-default-export */
//https://stackoverflow.com/questions/68783347/eslint-warning-assign-arrow-function-to-a-variable-before-exporting-as-module
import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

/*익명함수*/
// export default async (req: any, res: any) => {
//   try {
//     const result = await excuteQuery({
//       query:
//         'INSERT INTO board_table (title,content,date,nickname) VALUES (?,?,?,?)',
//       values: [req.body.title, '콘텐츠', req.body.date, '닉네임'],
//     }).then((request) => {
//       console.log(request);
//       res.status(201).end();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
/*기명함수*/
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<any>,
// ) {
//   try {
//     const result = await excuteQuery({
//       query:
//         'INSERT INTO board_table (title,content,date,nickname) VALUES (?,?,?,?)',
//       values: [req.body.title, '콘텐츠', req.body.date, '닉네임'],
//     }).then((request) => {
//       console.log(request);
//       res.status(201).end();
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }
/*함수표현식*/
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const result = await excuteQuery({
      query:
        'INSERT INTO board_table (title,content,date,nickname) VALUES (?,?,?,?)',
      values: [req.body.title, '콘텐츠', req.body.date, '닉네임'],
    }).then((request) => {
      res.status(201).end();
    });
  } catch (err) {
    console.log(err);
  }
};
export default handler;
