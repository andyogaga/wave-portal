import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/index";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "caption-cards",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
  middlewares = [...middlewares]
}

const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);
const persistor = persistStore(store);
export default { store, persistor };
