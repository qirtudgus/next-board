import excuteQuery from '../../db/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import * as cheerio from 'cheerio';
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  let { data } = await axios.get('https://sungt.tistory.com/category');

  let $ = cheerio.load(data);
  //   console.log($);
  let title = $('.tit_post');
  let date = $('.txt_date');
  let category = $('.link_cate');
  let img = $('.thumbnail_post img');
  let link = $('.link_post');
  let titleList: string[] = [];
  let dateList: string[] = [];
  let categoryList: string[] = [];
  let imgList: string[] = [];
  let linkList: string[] = [];
  //   console.log(title.text());
  title.each((idx, el) => {
    titleList.push($(el).text());
  });
  date.each((idx, el) => {
    dateList.push($(el).text());
  });
  category.each((idx, el) => {
    categoryList.push($(el).text());
  });
  img.each((idx, el) => {
    let img = 'https:' + $(el).attr('src');
    imgList.push(img);
  });
  link.each((idx, el) => {
    let link = 'https://sungt.tistory.com' + $(el).attr('href');
    linkList.push(link);
  });

  let 제목 = titleList.slice(1, 6);
  let 날짜 = dateList.slice(0, 5);
  let 카테고리 = categoryList.slice(0, 5);
  let 이미지 = imgList.slice(0, 5);
  let 링크 = linkList.slice(1, 6);
  console.log(dateList);

  res.status(200).json({ titleList: 제목, dateList: 날짜, categoryList: 카테고리, imgList: 이미지, linkList: 링크 });
};

export default handler;
