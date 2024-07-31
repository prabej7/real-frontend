import Section from "@/components/ui/Section";
import SideBar, { MobileNav } from "@/components/ui/sideBar";
import useRedirect from "@/hooks/useRedirect";
import { UserContextType, useUserContext } from "@/Provider/Context";

import { useCookies } from "react-cookie";

const Rooms: React.FC = () => {
  useRedirect();
  const userContext: UserContextType | null = useUserContext();

  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { userData } = userContext;
  return (
    <>
      <div className="section flex">
        <SideBar />
        <MobileNav />
        <Section title="Rooms"></Section>
      </div>
    </>
  );
};

export default Rooms;
