import { combineReducers, configureStore } from '@reduxjs/toolkit'; // help in setting up your store
import userReducer from './user/userSlice'; // this handles changes to the user state.Its imported from another file
import {persistReducer} from 'redux-persist' 
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore'; // the above 3 help save and restore your redux state
const rootReducer=combineReducers({user:userReducer}) // used to combine multiple reducers into one
const persistConfig={
    key:'root',
    storage,
    version:1,
}  // This is a configuration object for redux-persist. It tells redux-persist to use local storage and assigns a key ('root') to identify the persisted state.
const persistedReducer=persistReducer(persistConfig,rootReducer) // persistReducer wraps the rootReducer with the persistence logic. This means our state will be saved and restored automatically.
export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, 
    }),
});
export const persistor = persistStore(store); // persistStore creates a persistor object that will handle the actual saving and restoring of the state

