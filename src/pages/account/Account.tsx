import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import { useUserContext } from "@/Provider/UserContext";
import Verify from "./Veriy";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

const Account: React.FC = () => {
  useAuth("account");
  const user = useUserContext();
  if (user && user.email.length < 0) return <Loading route="account" />;
  if (!user.isVerified) return <Verify />;

  return (
    <>
      <div className="section flex overflow-clip ">
        <MobileNav title="Dashboard" />
        <DesktopSection account title="Dashboard"></DesktopSection>
      </div>
    </>
  );
};

export default Account;
