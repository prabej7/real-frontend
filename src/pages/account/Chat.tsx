import DesktopSection from "@/components/ui/DesktopSection";
import { MobileNav } from "@/components/ui/sideBar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../App.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/Provider/UserContext";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import url from "@/constant/url";
import { useCookies } from "react-cookie";
import Message from "@/constant/types/message";
import { io, Socket } from "socket.io-client";
import Loading from "@/components/ui/Loading";

export interface Msg {
  isAdmin?: boolean;
  adminMsg?: string;
  userMsg?: string;
}
const Chat: React.FC = () => {
  const [allMessages, setMessage] = useState<Msg[]>([]);

  const [cookie] = useCookies(["token"]);
  const [sending, setSending] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    if (state && state._id) {
      const message = `Hi, I am looking for this ${
        state.noOfRooms ? "room" : "hostel"
      }: ${window.location.origin}/rooms/${state._id}`;
      setText(message);

      // Clear state by navigating to the same page without state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [state, navigate]);

  const [text, setText] = useState<string>("");
  const { chatid } = useParams();
  const { error, loading, user } = useUserContext();

  useEffect(() => {
    if (user && user.email.length > 0) {
      setMessage(user.messages.messages);
    }
  }, [user]);
  if (loading) return <Loading />;
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
                  ref={inputRef}
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
                  ref={inputRef}
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
