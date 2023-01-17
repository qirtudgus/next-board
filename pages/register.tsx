import { BasicInput } from '../components/BasicInput';
import styled from 'styled-components';
import BasicTitle from '../components/BasicTitle';
import customAxios from '../utils/customAxios';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  blankPassword,
  canTakeRegExpressionPassword,
  duplicateId,
  DuplicationCheckId,
  missingPassword,
  outOfSyncRegExpressionId,
  pageUnmountResetValue,
} from '../store/registerSlice';
import { SolidButton } from '../components/BasicButton';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { isLoading, isSuccess } from '../store/isLoadingSlice';
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
export default function Register() {
  const { idValue, idStatusText, passwordValue, passwordStatusText, passwordConfirmValue, passwordConfirmStatusText } =
    useAppSelector((state) => state.registerSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const idReg = /^[a-z0-9_-]{5,15}$/;
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,15}$/;
  const idRef = useRef() as any;
  const nameRef = useRef() as any;
  const passwordRef = useRef() as any;
  const passwordConfirmRef = useRef() as any;

  const join = () => {
    const pwdValue = passwordRef.current.lastChild.value;
    const pwdConfirmValue = passwordConfirmRef.current.lastChild.value;
    const idValue = idRef.current.lastChild.value;
    const nameValue = nameRef.current.lastChild.value;
    if (idReg.test(idValue)) {
      console.log('아이디 정규식 테스트를 성공했습니다.');
      //아이디는 합격이고 비밀번호 검사 분기
      if (!passwordReg.test(pwdValue)) {
        console.log('패스워드 정규식 테스트 실패');
        passwordRef.current.lastChild.focus();
        dispatch(canTakeRegExpressionPassword());
        return;
      } else {
        console.log('패스워드 정규식 테스트 성공');
        if (pwdValue === '') {
          //비밀번호 정규식을 여기서 실행하자
          dispatch(blankPassword());
          console.log('비밀번호가 비어있습니다');
          passwordRef.current.lastChild.focus();
          return;
        } else if (pwdValue !== pwdConfirmValue) {
          console.log('비밀번호가 일치 하지않습니다..');
          dispatch(missingPassword());
          passwordConfirmRef.current.lastChild.value = '';
          passwordConfirmRef.current.lastChild.focus();
        } else {
          //가입 진행 API
          console.log('이상 무, 회원 가입을 진행합니다.');
          dispatch(isLoading());
          customAxios('POST', '/join/join', {
            name: nameValue,
            id: idValue,
            password: pwdValue,
            joinedDate: new Date(),
          }).then((res) => {
            if (res.status === 201) {
              console.log('회원가입 완료');
              router.push('/');
            }
            if (res.status === 200) {
              console.log('아이디가 중복');
              dispatch(duplicateId());
              dispatch(isSuccess());
            }
          });
        }
      }
    } else {
      console.log('아이디 정규식 테스트에 실패했습니다.');
      dispatch(outOfSyncRegExpressionId());
    }
  };

  useEffect(() => {
    //페이지를 나갈 시 회원가입 로직 전역상태값을 초기화해준다.
    return () => {
      dispatch(pageUnmountResetValue());
      dispatch(isSuccess());
    };
  }, []);
  return (
    <Box>
      <Wrap>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            router.push('/');
          }}
        >
          홈으로
        </div>
        <BasicTitle BasicTitleValue='회원 가입'></BasicTitle>
        <BasicInput
          ref={nameRef}
          placeholderValue='이름'
        ></BasicInput>
        <BasicInput
          PropsOnBlurFunc={() => {
            const idValue = idRef.current.lastChild.value;
            if (idReg.test(idValue)) {
              console.log('아이디 정규식 테스트를 성공했습니다.');
              dispatch(DuplicationCheckId.duplicationCheckId(idValue));
            } else {
              console.log('아이디 정규식 테스트에 실패했습니다.');
              dispatch(outOfSyncRegExpressionId());
            }
          }}
          ref={idRef}
          isError={idValue}
          statusText={idStatusText}
          placeholderValue='아이디'
        ></BasicInput>

        <BasicInput
          type='password'
          ref={passwordRef}
          isError={passwordValue}
          statusText={passwordStatusText}
          placeholderValue='비밀번호'
        ></BasicInput>
        <BasicInput
          type='password'
          ref={passwordConfirmRef}
          isError={passwordConfirmValue}
          statusText={passwordConfirmStatusText}
          placeholderValue='비밀번호 확인'
        ></BasicInput>

        <SolidButton
          OnClick={join}
          width={400}
          BasicButtonValue='가입하기'
        ></SolidButton>
      </Wrap>
    </Box>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
