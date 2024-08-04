import DesktopSection from "@/components/ui/DesktopSection";
import { MobileNav } from "@/components/ui/sideBar";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/Provider/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "@/constant/url";
import { useCookies } from "react-cookie";
import Message from "@/constant/types/message";
interface Msg {
  isAdmin?: boolean;
  adminMsg?: string;
  userMsg?: string;
}
const Chat: React.FC = () => {
  const [allMessages, setMessage] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["token"]);
  const [text, setText] = useState<string>("");
  const { chatid } = useParams();
  const user = useUserContext();
  useEffect(() => {
    if (user.email.length > 0) {
      setLoading(false);
      setMessage(user.messages.messages);
    }
  }, [user]);
  if (loading) return <>Loading...</>;
  const { messages } = user;
  const handleSend = async () => {
    try {
      const response = await axios.post(`${url}message`, {
        token: cookie.token,
        messageBoxId: chatid,
        text: text,
      });
      if (response.status == 200) {
        setMessage((prev) => [
          ...prev,
          {
            isAdmin: false,
            userMsg: text,
          },
        ]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setText("");
    }
  };
  return (
    <>
      <div className="section flex overflow-clip">
        <MobileNav title="Messages">
          <div>
            <div className="h-24 w-[102%] bg-slate-200 rounded-md mt-6 mb-6 flex items-center px-6">
              <div className="bg-black rounded-full h-12 w-12 justify-center items-center">
                <p className="text-white text-center mt-3">A</p>
              </div>
              <Link to="/chat" className="py-6 px-6">
                <h2 className="font-medium">Admin</h2>
                <p className="text-sm">Tap to start a conversation!</p>
              </Link>
            </div>
          </div>
        </MobileNav>
        <DesktopSection rooms title="Messages" isNav>
          <div>
            <div className="">
              <div className=" chat-box">
                {messages.messages.map((msg, index) => {
                  return (
                    <div className="">
                      {msg.isAdmin && index !== 0 && (
                        <div className="chat chat-start">
                          <div className="chat-bubble">{msg.adminMsg}</div>
                        </div>
                      )}
                      {!msg.isAdmin && index !== 0 && (
                        <div className="chat chat-end">
                          <div className="chat-bubble">You: {msg.userMsg}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-6 mt-6">
                <Input
                  placeholder="Message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button disabled={text.length == 0} onClick={handleSend}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </DesktopSection>
      </div>
    </>
  );
};

export default Chat;
