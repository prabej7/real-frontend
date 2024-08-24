import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./Store/store.ts";
import UserContextProvide from "./Provider/UserContext.tsx";
import RoomProvider from "./Provider/RoomsContext.tsx";
import HostelProvider from "./Provider/HostelContext.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import LandProvider from "./Provider/LandContext.tsx";

const querClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={querClient}>
    <UserContextProvide>
      <LandProvider>
        <HostelProvider>
          <RoomProvider>
            <Provider store={store}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </Provider>
          </RoomProvider>
        </HostelProvider>
      </LandProvider>
    </UserContextProvide>
  </QueryClientProvider>
);
