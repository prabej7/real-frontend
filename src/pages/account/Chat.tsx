import DesktopSection from "@/components/ui/DesktopSection";
import { MobileNav } from "@/components/ui/sideBar";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/Provider/UserContext";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import url from "@/constant/url";
import { useCookies } from "react-cookie";
import Message from "@/constant/types/message";
import { io, Socket } from "socket.io-client";

export interface Msg {
  isAdmin?: boolean;
  adminMsg?: string;
  userMsg?: string;
}
const Chat: React.FC = () => {
  const [allMessages, setMessage] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie] = useCookies(["token"]);
  const [sending, setSending] = useState<boolean>(false);
  // const [socket, setSocket] = useState<Socket | null>(null);
  // const createSocket = useCallback(() => {
  //   const socket = io(`${url}`, {
  //     query: {
  //       token: cookie.token,
  //     },
  //   });
  //   return socket;
  // }, [cookie.token]);
  const [text, setText] = useState<string>("");
  const { chatid } = useParams();
  const user = useUserContext();
  // useEffect(() => {
  //   const s = createSocket();
  //   setSocket(s);
  //   return () => {
  //     if (s) s.disconnect();
  //   };
  // }, [createSocket]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive-message", (data) => {
  //       setMessage((prev) => [...prev, data]);
  //     });
  //   }
  // }, [socket]);
  useEffect(() => {
    if (user && user.email.length > 0) {
      setLoading(false);
      setMessage(user.messages.messages);
    }
  }, [user]);
  if (loading) return <>Loading...</>;
  const { messages } = user;
  const handleSend = async () => {
    setSending(true);
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
      setSending(false);
    }

    // socket.emit("send-message", {
    //   messageBoxId: user.messageId,
    //   text: text,
    //   role: "user",
    //   user: cookie.token,
    // });
  };

  return (
    <>
      <div className="section flex overflow-clip">
        <MobileNav title="Messages">
          <div>
            <div className="">
              <div className="chat-box overflow-auto">
                {allMessages.map((msg, index) => {
                  return (
                    <div className="" key={index}>
                      {msg.isAdmin && msg.adminMsg && (
                        <div className="chat chat-start">
                          <div className="chat-bubble">{msg.adminMsg}</div>
                        </div>
                      )}
                      {msg.userMsg && (
                        <div className="chat chat-end ">
                          <div className="chat-bubble bg-blue-600">
                            You: {msg.userMsg}
                          </div>
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
                <Button
                  disabled={text.length == 0 || sending}
                  onClick={handleSend}
                >
                  {sending ? "Sending..." : "Send"}
                </Button>
              </div>
            </div>
          </div>
        </MobileNav>
        <DesktopSection rooms title="Messages" isNav>
          <div>
            <div>
              <div className=" chat-box overflow-auto">
                {allMessages.map((msg, index) => {
                  return (
                    <div className="" key={index}>
                      {msg.isAdmin && msg.adminMsg && (
                        <div className="chat chat-start">
                          <div className="chat-bubble">{msg.adminMsg}</div>
                        </div>
                      )}

                      {msg.userMsg && (
                        <div className="chat chat-end">
                          <div className="chat-bubble bg-blue-600">
                            You: {msg.userMsg}
                          </div>
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
                <Button
                  disabled={text.length == 0 || sending}
                  onClick={handleSend}
                >
                  {sending ? "Sending..." : "Send"}
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
