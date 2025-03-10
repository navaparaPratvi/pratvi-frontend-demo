import React from "react";
import Renderpages from "./routes/renderpages";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}></PersistGate>
          <Renderpages />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
