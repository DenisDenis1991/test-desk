import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { dataCards } from './data.slice'

export const rootReducer = combineReducers ({
  'reducer': dataCards.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
})