import { Button } from "@/components/ui/button";
import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";

import useAuth from "@/hooks/useAuth";
import { useUserContext } from "@/Provider/UserContext";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Message: React.FC = () => {
  const [cookie] = useCookies(["token"]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useUserContext();
  useEffect(() => {
    if (user && user.email.length > 0) {
      console.log(user);
      setLoading(false);
    }
  }, []);

  useAuth("account/messages");
  if (loading) return <div>Loading...</div>;
  if (user) {
    return (
      <>
        <div className="section flex overflow-clip">
          <MobileNav title="Messages">
            <div>
              <div className="h-24 w-[102%] bg-slate-200 rounded-md mt-6 mb-6 flex items-center px-6">
                <div className="bg-black rounded-full h-12 w-12 justify-center items-center">
                  <p className="text-white text-center mt-3">A</p>
                </div>
                <Link
                  to={`/account/messages/${user.messageId}`}
                  className="py-6 px-6"
                >
                  <h2 className="font-medium">Admin</h2>
                  <p className="text-sm">Tap to start a conversation!</p>
                </Link>
              </div>
            </div>
          </MobileNav>
          <DesktopSection rooms title="Messages" isNav>
            <div>
              <div className="h-24 w-[102%] bg-slate-200 rounded-md mt-6 mb-6 flex items-center px-6">
                <div className="bg-black rounded-full h-12 w-12 justify-center items-center">
                  <p className="text-white text-center mt-3">A</p>
                </div>
                <Link
                  to={`/account/messages/${user.messageId}`}
                  className="py-6 px-6"
                >
                  <h2 className="font-medium">Admin</h2>
                  <p className="text-sm">Tap to start a conversation!</p>
                </Link>
              </div>
            </div>
          </DesktopSection>
        </div>
      </>
    );
  }
};

export default Message;
