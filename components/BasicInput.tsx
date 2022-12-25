import React, { forwardRef, RefObject, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const WrapDiv = styled.div<BasicInputStyleInterface>`
  max-width: 250px;
  width: 100%;
  height: 48px;
  margin-top: 25px;

  position: relative;
  font-size: 17px;
  & label {
    font-size: inherit;
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #444;
    cursor: text;
    transition: 0.2s;
    font-weight: 500;
    user-select: none;
    pointer-events: none;
  }

  & label.active {
    font-size: 13px;
    top: -9px;
    color: ${({ theme }) => theme.colors.main};
  }

  ${(props) =>
    props.isError &&
    css`
      & label.active {
        font-size: 13px;
        top: -9px;
        color: red;
      }

      & input {
        border: 2px solid #e70202;
        padding: 12px 14px;
      }

      & input:focus {
        border: 2px solid #e70202;
        padding: 12px 14px;
      }
    `}
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 13px 15px;
  font-size: inherit;
  margin: 1px 1px 0 1px;
  border-radius: 4px;
  border: 1px solid#9c9c9c;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.main};
    padding: 12px 14px;
  }
`;

const StatusText = styled.p`
  font-size: 14px;
  word-break: keep-all;
`;

interface BasicInputStyleInterface {
  isError?: boolean | null | undefined;
}

interface BasicInputInterface {
  placeholderValue: string;
  isError?: boolean | null | undefined;
  PropsOnBlurFunc?: () => void;
  PropsOnFocusFunc?: () => void;
  statusText?: string;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

//https://www.carlrippon.com/react-forwardref-typescript/
//포워드리프를 쓸 때 타입 지정에 대한 포인트는 컴포넌트를 래핑하고, 제네릭함수의 순서는 컴포넌트와 반대로 ref,props 타입의 순서다. 헷갈리지 않도록 하자
// eslint-disable-next-line react/display-name
export const BasicInput = forwardRef<HTMLDivElement, BasicInputInterface>((props, ref) => {
  const [focus, setFocus] = useState(false);
  const inputRef = useRef() as RefObject<HTMLInputElement>;
  const setFocusFalse = () => {
    //input에 value 유무에 따라 라벨이 위치로 돌아옴
    if (inputRef.current?.value) {
      //props로 OnBlur를 받았으면 실행
      if (props.PropsOnBlurFunc) {
        props.PropsOnBlurFunc();
      }
      //input에 value 유무에 따라 라벨이 위치로 돌아옴 #2
      return;
    }
    setFocus(false);
  };
  const setFocusTrue = () => {
    setFocus(true);
  };

  return (
    <>
      <WrapDiv
        ref={ref}
        isError={props.isError}
      >
        {props.placeholderValue && <label className={focus ? 'active' : ''}>{props.placeholderValue}</label>}
        <Input
          ref={inputRef}
          onFocus={setFocusTrue}
          onBlur={setFocusFalse}
        ></Input>
      </WrapDiv>
      {props.isError && <StatusText>{props.statusText}</StatusText>}
    </>
  );
});

export default BasicInput;
