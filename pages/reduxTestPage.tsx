import { decrement, GetTestApiCounter, increment } from '../store/counterSlice';
import { getUserAgentReducer } from '../store/nameSlice';
import { useAppDispatch, useAppSelector } from '../store/store';

export default function ReduxTestPage() {
  const name = useAppSelector((state) => state.nameSlice.value);
  const count = useAppSelector((state) => state.counterSlice.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        onClick={() => {
          dispatch(getUserAgentReducer());
        }}
      >
        당신의 userAgent
      </button>
      <h1>{name}</h1>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        당신의 count ++
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        당신의 count --
      </button>
      <button
        onClick={() => {
          dispatch(GetTestApiCounter.getTestApiCounter());
        }}
      >
        당신의 count API
      </button>
      <h1>{count}</h1>
    </>
  );
}
