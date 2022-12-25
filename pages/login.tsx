import BasicButton, { SolidButton } from '../components/BasicButton';
import { BasicInput } from '../components/BasicInput';

const login = () => {
  return (
    <>
      <BasicInput placeholderValue='아이디'></BasicInput>
      <BasicInput placeholderValue='비밀번호'></BasicInput>
      <SolidButton
        BasicButtonValue='로그인'
        width={250}
        OnClick={() => {
          console.log('로그인 시도');
        }}
      ></SolidButton>
    </>
  );
};

export default login;
