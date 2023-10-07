import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './commonSlice'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = { key: 'warehouse', version: 1, storage }
const persistedReducer = persistReducer(persistConfig, commonSlice)

export const store = configureStore({
    reducer: {
        commonReducer: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
