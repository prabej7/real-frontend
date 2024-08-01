import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/general/Home";
import Register from "./pages/general/Register";
import Login from "./pages/general/Login";
import Account from "./pages/account/Account";
import Rooms from "./pages/account/Rooms";
import AccountSetting from "./pages/account/AccountSetting";
import Verify from "./pages/account/Veriy";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/rooms" element={<Rooms />} />
        <Route path="/account/setting" element={<AccountSetting />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </>
  );
}

export default App;
