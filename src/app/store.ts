import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { apiSplice } from '../features/launches/launches-api-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSplice.reducerPath]: apiSplice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSplice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
