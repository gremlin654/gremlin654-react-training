import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SearchSlice from './reducers/SearchSlice';
import FormSlice from './reducers/FormSlice';

const rootReducer = combineReducers({
  SearchSlice,
  FormSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
