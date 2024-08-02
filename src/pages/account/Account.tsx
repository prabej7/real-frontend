import DesktopSection from "@/components/ui/DesktopSection";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import { useUserContext } from "@/Provider/UserContext";
import Verify from "./Veriy";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Account: React.FC = () => {
  useAuth("account");

  const user = useUserContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && user.email !== "") {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loading route="account" />;
  if (user && !user.isVerified) return <Verify />;

  return (
    <div className="section flex overflow-clip">
      <MobileNav title="Dashboard" />
      <DesktopSection account title="Dashboard">
        {/* Other content here */}
      </DesktopSection>
    </div>
  );
  return <Loading route="account" />;
};

export default Account;
