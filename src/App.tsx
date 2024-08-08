import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/general/Home";
import Register from "./pages/general/Register";
import Login from "./pages/general/Login";
import Account from "./pages/account/Account";
import AccountSetting from "./pages/account/AccountSetting";
import Verify from "./pages/account/Veriy";
import RoomFullView from "./pages/general/RoomFullView";
import Admin from "./pages/admin/Admin";
import AdminAdd from "./pages/admin/AdminAdd";
import AdminTenant from "./pages/admin/AdminTenant";
import AdminSetting from "./pages/admin/AdminSetting";
import AdminLogin from "./pages/admin/AdminRL/AdminLogin";
import AdminRegister from "./pages/admin/AdminRL/AdminRegister";
import Message from "./pages/account/Messages";
import Chat from "./pages/account/Chat";
import ChatsAdmin from "./pages/admin/Chats";
import HostelFullView from "./pages/general/HostelFullView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/messages" element={<Message />} />
        <Route path="/account/messages/:chatid" element={<Chat />} />
        <Route path="/account/setting" element={<AccountSetting />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="rooms/:id" element={<RoomFullView />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<AdminAdd />} />
        <Route path="/admin/tenant" element={<AdminTenant />} />
        <Route path="/admin/chats/:id" element={<ChatsAdmin />} />
        <Route path="/admin/setting" element={<AdminSetting />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/hostels/:id" element={<HostelFullView />} />
      </Routes>
    </>
  );
}

export default App;
