import DesktopSection from "@/components/ui/DesktopSection";
import Section from "@/components/ui/Section";
import SideBar, { MobileNav } from "@/components/ui/sideBar";
import User from "@/constant/types/user";
import useRedirect from "@/hooks/useRedirect";
import { UserContextType, useUserContext } from "@/Provider/Context";
import { useEffect } from "react";

import { useCookies } from "react-cookie";

const Account: React.FC = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const redirect = useRedirect("account");
  
  return (
    <>
      <div className="section flex overflow-clip ">
        <MobileNav title="Dashboard" />
        <DesktopSection />

      </div>
    </>
  );
};

export default Account;
