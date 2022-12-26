import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

// https://nextjs.org/docs/messages/nested-middleware
// 미들웨어가 중첩될 시 경로를 정의해야한다.
export function middleware(req: NextRequest) {
  //전역에서 실행된다.
  // console.log('전역 미들웨어 실행');

  // '/posts/*'경로에서 실행된다.
  if (req.nextUrl.pathname.startsWith('/posts')) {
    //특정 쿠키를 가져올 수 있다.
    // const cookie = req.cookies.getAll();
    // console.log(cookie);
    //특정 쿠키의 유무를 반환해준다. boolean
    // const hasCookie = req.cookies.has('_ga_HSYFWJC9F7');
    // console.log(hasCookie);
    console.log('게시물을 볼 때 미들웨어');

    //미들웨어에서 쿠키 생성
    // const response = NextResponse.next();
    // response.cookies.set('myCookie', 'Hello~~');
    // return response;
  }
}
