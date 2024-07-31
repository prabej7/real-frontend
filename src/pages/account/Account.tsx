import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import useRedirect from "@/hooks/useRedirect";
import useUser from "@/hooks/useUser";
import { useAppSelector } from "@/Store/hook";
import { useEffect } from "react";

const Account: React.FC = () => {
  useRedirect("account");
  const userData = useUser();
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    console.log(userData);
  }, [user]);
  if (userData) {
    return (
      <>
        <div className="section flex overflow-clip ">
          <MobileNav title="Dashboard" />
          <DesktopSection account title="Dashboard"></DesktopSection>
        </div>
      </>
    );
  }

  return <Loading />;
};

export default Account;
