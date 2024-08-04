import axios from "axios";
import url from "@/constant/url";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "@/constant/types/message";
import Loading from "@/components/ui/Loading";
import DesktopSection from "@/components/ui/DesktopSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCookies } from "react-cookie";
import AdminNav from "@/components/ui/AdminNav";

const Chats: React.FC = () => {
  const [cookie] = useCookies(["token"]);
  const [text, setText] = useState<string>("");
  const [msgs, setMsg] = useState<Message>();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${url}get-messagebox/${id}`);
        setMsg(response.data);
        setLoading(false);
      } catch (e) {}
    })();
  }, [msgs]);
  const handleSend = async () => {
    try {
      const response = await axios.post(`${url}message`, {
        token: cookie.token,
        messageBoxId: id,
        text: text,
      });
      setText("");
    } catch (e) {}
  };
  if (loading) return <Loading />;
  return (
    <>
      <div className="h-screen w-screen flex ">
        <AdminNav />
        <div className="px-6">
          <div className="">
            <div className=" chat-box">
              <div className="">
                {msgs.messages.map((msg, index) => {
                  return (
                    <div>
                      {msg.isAdmin && index !== 0 ? (
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

export default Chats;
