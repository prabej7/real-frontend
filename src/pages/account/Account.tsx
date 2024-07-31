import Section from "@/components/ui/Section";
import SideBar, { MobileNav } from "@/components/ui/sideBar";
import User from "@/constant/types/user";
import useRedirect from "@/hooks/useRedirect";
import { UserContextType, useUserContext } from "@/Provider/Context";

import { useCookies } from "react-cookie";

const Account: React.FC = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  useRedirect();
  const userContext: UserContextType | null = useUserContext();

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { userData } = userContext;
  return (
    <>
      <div className="section flex relative">
        <SideBar />
        <MobileNav />
        <Section title="Dashboard"></Section>
      </div>
    </>
  );
};

export default Account;
