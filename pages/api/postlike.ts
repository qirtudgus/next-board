import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { userIdx, boardIdx, behavior },
    method,
  } = req;
  let likeQuery =
    'UPDATE board_table SET likeCount = likeCount +1, likeList = CONCAT_WS("",likeList, ? ",") WHERE idx =   ?  ';
  let unlikeQuery =
    'UPDATE board_table SET likeCount = likeCount -1, likeList = replace(likeList, ? , "" ) WHERE idx =   ?  ';

  const userIdx2 = userIdx + ',';

  switch (method) {
    case 'PUT':
      try {
        if (behavior === 'like') {
          console.log(`${userIdx}님이 ${boardIdx}글을 추천하였습니다.`);
          await excuteQuery({
            query: likeQuery,
            values: [userIdx, boardIdx],
          }).then(async () => {
            let likeCount = await excuteQuery({
              query: 'SELECT likeCount FROM board_table WHERE idx = ?',
              values: [boardIdx],
            });
            res.status(200).json(likeCount);
          });
        } else {
          console.log(`${userIdx}님이 ${boardIdx}글을 추천 취소하였습니다.`);
          await excuteQuery({
            query: unlikeQuery,
            values: [userIdx2, boardIdx],
          }).then(async () => {
            let likeCount = await excuteQuery({
              query: 'SELECT likeCount FROM board_table WHERE idx = ?',
              values: [boardIdx],
            });
            res.status(200).json(likeCount);
          });
        }
      } catch (err) {
        console.log(err);
      }
      break;
  }
};

export default handler;
