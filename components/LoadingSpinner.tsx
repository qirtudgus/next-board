import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
`;
const P = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  font-size: 2em;
  color: blue;
  .loader {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 32px 0 #fff, -32px 0 #fff;
    position: relative;
    animation: flash 0.5s ease-out infinite alternate;
    margin-bottom: 1rem;
  }
  .loadingText {
    font-weight: bold;
    font-size: 1.5rem;
    color: #fff;
    text-shadow: 0px 0px 5px rgb(0 0 0 / 10%);
  }

  @keyframes flash {
    0% {
      background-color: #fff2;
      box-shadow: 32px 0 #fff2, -32px 0 #fff;
    }
    50% {
      background-color: #fff;
      box-shadow: 32px 0 #fff2, -32px 0 #fff2;
    }
    100% {
      background-color: #fff2;
      box-shadow: 32px 0 #fff, -32px 0 #fff2;
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <>
      <Wrap></Wrap>
      <P>
        <p className='loader'></p>
        <p className='loadingText'>불러오는 중..</p>
      </P>
    </>
  );
};

export default LoadingSpinner;
