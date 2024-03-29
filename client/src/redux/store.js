import { configureStore } from '@reduxjs/toolkit';
import sliceDogs from './sliceDogs';

export const store = configureStore({
  reducer: {
    dogs: sliceDogs
  }
})