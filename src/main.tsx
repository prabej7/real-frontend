import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Store/store.ts";
import UserContextProvide from "./Provider/UserContext.tsx";
import RoomProvider from "./Provider/RoomsContext.tsx";
import HostelProvider from "./Provider/HostelContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserContextProvide>
    <HostelProvider>
      <RoomProvider>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </RoomProvider>
    </HostelProvider>
  </UserContextProvide>
);
