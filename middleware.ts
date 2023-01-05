import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createJoseAccessToken, { verifyJoseToken } from './utils/createToken';
// https://nextjs.org/docs/messages/nested-middleware
// 미들웨어가 중첩될 시 경로를 정의해야한다.

// export async function middleware(req: NextRequest) {
//   const jwtRoutes = ['/posts/write'];
//   //jwt 검사가 필요한 경로일 때!
//   if (jwtRoutes.includes(req.nextUrl.pathname)) {
//     const accessCookie = req.cookies.get('accessToken');
//     const refreshCookie = req.cookies.get('refreshToken');
//     //토큰이 정상적으로 둘 다 있을 때
//     if (accessCookie && refreshCookie) {
//       const accessResult = await verifyJoseToken(accessCookie.value);
//       const refreshResult = await verifyJoseToken(refreshCookie.value);
//       // 액세스 토큰이 만료되었을 시
//       if (!accessResult) {
//         console.log('액세스 토큰이 만료되었습니다.');
//         //리프레쉬 토큰도 만료되었을 시
//         if (!refreshResult) {
//           //https://github.com/vercel/next.js/discussions/34822
//           //redirect로 쓰면 로그인 후 뒤로가기했을 시 주소에 세션때문에 로그아웃디스패치가 실행되어 rewrite로 변경
//           const response = NextResponse.rewrite(
//             new URL(`/login?returnUrl=${req.nextUrl.pathname}&session=true`, req.url),
//           );
//           response.cookies.delete('accessToken');
//           response.cookies.delete('refreshToken');
//           return response;
//         } else {
//           //액세스는 만료, 리프레쉬는 유효할 때
//           console.log('리프레쉬는 살아있어서 액세스 토큰 발급');
//           let id = refreshResult.id as string;
//           const newAccessToken = await createJoseAccessToken(id);
//           const response = NextResponse.next();
//           response.cookies.set('accessToken', newAccessToken, { httpOnly: true });
//           return response;
//         }
//       }
//       //토큰 검증 로직 배우기
//       //https://levelup.gitconnected.com/how-to-add-jwt-authentication-to-nextjs-apps-a0dc83bd257d
//     } else {
//       //토큰이 비정상일 때 로그인창으로 리다이렉트
//       console.log('액세스 토큰이 undifined입니다.');
//       return NextResponse.redirect(new URL(`/login?returnUrl=${req.nextUrl.pathname}&session=false`, req.url));
//     }
//   }
// }

//경우의 수는 몇개인가?
// 1. 특정 경로일때
// 2. 토큰이 없을 때
// 3. 액세스토큰만 만료일 때
// 4. 리프레쉬토큰도 만료일 때

export async function middleware(req: NextRequest) {
  const jwtRoutes = ['/posts/write', '/posts/:path*'];
  //jwt가 필요한 경로에 미들웨어를 설정
  // if (jwtRoutes.includes(req.nextUrl.pathname)) {

  //여기서 각 http 메소드를 구분하여 더 분기할 수 있다..

  const accessCookie = req.cookies.get('accessToken');
  const refreshCookie = req.cookies.get('refreshToken');
  //일단 가져와서 리절트를 뽑으면 null or Payload 가 있을것이다.
  const accessResult = await verifyJoseToken(accessCookie?.value);
  const refreshResult = await verifyJoseToken(refreshCookie?.value);

  console.log(`액세스 토큰 검사 : ${accessResult}`);
  console.log(`리프레시 토큰 검사 : ${refreshResult}`);
  console.log('메소드확인');
  // console.log(req.method);
  console.log(req.nextUrl);
  // console.log(req.nextUrl.search);
  // if (req.method === 'DELETE' || req.method === 'POST')
  if (!refreshResult) {
    //리프레쉬가 만료면 액세스는 무조건 만료다. 리프레쉬가 만료면 로그인창으로
    console.log('리프레쉬 만료 / 로그인 창으로');
    //https://github.com/vercel/next.js/discussions/34822
    //redirect로 쓰면 로그인 후 뒤로가기했을 시 주소에 세션때문에 로그아웃디스패치가 실행되어 rewrite로 변경

    // const response = NextResponse.rewrite(new URL(`/login?returnUrl=${req.nextUrl.pathname}&session=true`, req.url));
    const response = NextResponse.redirect(new URL(`/login`, req.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  } else {
    //리프레쉬가 유효할 때 액세스를 체크하고 만료일 때
    if (!accessResult) {
      console.log('리프레쉬 유효 / 액세스 토큰 발급');
      let id = refreshResult.id as string;
      let idx = refreshResult.id as string;
      const newAccessToken = await createJoseAccessToken(id, idx);
      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, { httpOnly: true, sameSite: 'lax' });
      return response;
    } else {
      console.log('액세스 토큰 유효');
      //액세스가 유효하여 그냥 진행
    }
  }
  // }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/posts/write',
    // 이렇게 작성하면 패스네임까지 포함한 경로를 추적 ex) /posts = X, /posts/write = O
    // '/posts/:path*',
  ],
};
