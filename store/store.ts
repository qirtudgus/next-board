import { configureStore, combineReducers, AnyAction, CombinedState, Reducer } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import counterSlice, { CounterState } from './counterSlice';
import logger from 'redux-logger';
import nameSlice, { NameState } from './nameSlice';
import duplicationCheckIdSlice, { DuplicationCheckIdState } from './checkIdSlice';
import isLoadingSlice, { IsLoadingState } from './isLoadingSlice';
// ### 리듀서 State 타입 정의
export interface ReducerStates {
  counterSlice: CounterState;
  nameSlice: NameState;
  duplicationCheckIdSlice: DuplicationCheckIdState;
  isLoadingSlice: IsLoadingState;
}
// ### 루트 리듀서 생성
// 1) next-redux-wrapper의 HYDRATE 액션을 정의해주고,
// 2) 슬라이스들을 통합한다.
const rootReducer = (state: ReducerStates, action: AnyAction): CombinedState<ReducerStates> => {
  switch (action.type) {
    // next-redux-wrapper의 HYDRATE 액션 처리(그냥 이렇게만 해주면 된다.)
    case HYDRATE:
      return action.payload;
    // 슬라이스 통합
    default: {
      const combinedReducer = combineReducers({
        counterSlice,
        nameSlice,
        duplicationCheckIdSlice,
        isLoadingSlice,
      });
      return combinedReducer(state, action);
    }
  }
};

// ### store 생성 함수
const makeStore = () => {
  // store 생성
  const store = configureStore({
    reducer: rootReducer as Reducer<ReducerStates, AnyAction>, // 리듀서
    middleware: (getDefaultMiddleware) => {
      if (process.env.NODE_ENV === 'development') {
        return getDefaultMiddleware().concat(logger);
      } else {
        return getDefaultMiddleware();
      }
    },
    devTools: process.env.NODE_ENV === 'development', // 개발자도구
  });
  return store;
};

//타입을 미리 추상화하여 번거로움을 덜어낸다.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppStore = ReturnType<typeof makeStore>; // store 타입
export type RootState = ReturnType<typeof rootReducer>; // RootState 타입
export type AppDispatch = AppStore['dispatch']; // dispatch 타입

// ### next-redux-wrapper의 wrapper 생성
const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
});

// wrapper 익스포트
export default wrapper;
