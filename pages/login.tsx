import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SolidButton } from '../components/BasicButton';
import { BasicInput } from '../components/BasicInput';
import BasicTitle from '../components/BasicTitle';
import { useAppDispatch } from '../store/store';
import { loginSuccess, logoutSuccess } from '../store/userInfoSlice';
import customAxios from '../utils/customAxios';
import LoginLayout from './layout/loginLayout';
const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  @media ${({ theme }) => theme.device.tablet} {
    max-width: 400px;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

const RegisterLink = styled.p`

width: 100%;
text-align: left;
& span {
  text-decoration: underline;
  color:${({ theme }) => theme.colors.main}}
}

`;

const Login = (props: { returnUrl: string; isSession: string }) => {
  const [loginResult, setLoginResult] = useState({
    idValue: false,
    idStatusText: '',
    passwordValue: false,
    passwordStatusText: '',
  });
  const dispatch = useAppDispatch();
  const idRef = useRef() as RefObject<HTMLDivElement>;
  const passwordRef = useRef() as RefObject<HTMLDivElement>;
  const router = useRouter();

  const tryLogin = async () => {
    console.log('로그인 시도');
    if (idRef.current && passwordRef.current) {
      const idInput = idRef.current.lastChild as HTMLInputElement;
      const passwordInput = passwordRef.current.lastChild as HTMLInputElement;
      customAxios('POST', '/join/login', { id: idInput.value, password: passwordInput.value }).then((res) => {
        setLoginResult(res.data);
        if (res.data.idValue) {
          idInput.focus();
        } else if (res.data.passwordValue) {
          passwordInput.focus();
        } else if (!res.data.idValue && !res.data.passwordValue) {
          // router.push(`${props.returnUrl}`);
          //로그인 성공
          router.push('/');
          dispatch(loginSuccess({ id: res.data.id, idx: res.data.idx }));
        }
      });
    }
  };

  //로그인 링크마다 세션 유무를 식별할 수 있는 쿼리스트링을 넣는다,
  //세션이 true(미들웨어에서 리다이렉트된 경우)에는 로그아웃 디스패치를 바로 실행한다.
  //false에서 로그인하고 뒤로가기해도 로그인이 잘 유지된다.
  //true에서 로그인하고 뒤로가도 로그아웃이 된다...
  useEffect(() => {
    if (props.isSession === 'true') {
      dispatch(logoutSuccess());
    }
  }, []);

  return (
    <>
      <Box>
        <Wrap>
          <div
            onClick={() => {
              router.push('/');
            }}
          >
            홈으로
          </div>
          <BasicTitle BasicTitleValue='로그인'></BasicTitle>
          <BasicInput
            ref={idRef}
            placeholderValue='아이디'
            isError={loginResult.idValue}
            statusText={loginResult.idStatusText}
          ></BasicInput>
          <BasicInput
            ref={passwordRef}
            placeholderValue='비밀번호'
            isError={loginResult.passwordValue}
            statusText={loginResult.passwordStatusText}
          ></BasicInput>
          <RegisterLink>
            아직 회원이 아니시라면?...
            <span>
              <Link href={'/register'}> 회원가입</Link>
            </span>
          </RegisterLink>
          <SolidButton
            BasicButtonValue='로그인'
            width={400}
            OnClick={tryLogin}
          ></SolidButton>
        </Wrap>
      </Box>
    </>
  );
};

export default Login;
Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const url = new URL(context.req.headers.referer);
//   //url확인
//   //returnUrl이 들어있으면 그걸 넣고 없으면 pathname을 넣는다.
//   let returnUrl = context.query.returnUrl ? context.query.returnUrl : url.pathname;
//   let isSession = context.query.session;
//   return {
//     props: {
//       // returnUrl,
//       // isSession,
//     },
//   };
// };
