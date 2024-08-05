import axios from "axios";
import url from "@/constant/url";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "@/constant/types/message";
import Loading from "@/components/ui/Loading";
import DesktopSection from "@/components/ui/DesktopSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCookies } from "react-cookie";
import AdminNav from "@/components/ui/AdminNav";
import { io, Socket } from "socket.io-client";
import { Msg } from "../account/Chat";
const ChatsAdmin: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [cookie] = useCookies(["token"]);
  const [text, setText] = useState<string>("");
  const [msgs, setMsg] = useState<Msg[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [socket, setSocket] = useState<Socket | null>(null);
  const createSocket = useCallback(() => {
    const socket = io(`${url}`, {
      query: {
        token: cookie.token,
      },
    });
    return socket;
  }, [cookie.token]);

  useEffect(() => {
    const s = createSocket();
    setSocket(s);
    return () => {
      if (s) s.disconnect();
    };
  }, [createSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        setMsg((prev) => [...prev, data]);
      });

      // Cleanup function to remove the listener
    }
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${url}get-messagebox/${id}`);
        setUserId(response.data.user._id);
        setMsg(response.data.messages || []);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  const handleSend = async () => {
    try {
      // const response = await axios.post(`${url}message`, {
      //   token: cookie.token,
      //   messageBoxId: id,
      //   text: text,
      // });
      socket.emit("send-message", {
        messageBoxId: id,
        text: text,
        role: "admin",
        user: cookie.token,
        toUser: userId,
      });
      setText("");
    } catch (e) {}
  };

  if (loading && !Array.isArray(msgs)) return <div>Loading...</div>;
  // if (loading && !Array.isArray(msgs)) return <Loading />;
  return (
    <>
      <div className="h-screen w-screen flex ">
        <AdminNav />
        <div className="px-6">
          <div className="">
            <div className=" chat-box overflow-auto">
              <div className=" overflow-y-auto">
                {msgs.map((msg, index) => {
                  return (
                    <div key={index}>
                      {msg.isAdmin && msg.adminMsg ? (
                        <div className="chat chat-end">
                          <div className="chat-bubble bg-blue-600">
                            {msg.adminMsg}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="chat chat-start"
                          style={{ display: msg.userMsg ? "block" : "none" }}
                        >
                          <div className="chat-bubble">{msg.userMsg}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
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
      </div>
    </>
  );
};

export default ChatsAdmin;
