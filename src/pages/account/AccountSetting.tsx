import { Button } from "@/components/ui/button";
import DesktopSection from "@/components/ui/DesktopSection";
import DialogBox from "@/components/ui/EditProfile";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import useUser from "@/hooks/useUser";
import { useAppSelector } from "@/Store/hook";
import { ChangeEvent, useState } from "react";
import { FaEdit } from "react-icons/fa";

const AccountSetting: React.FC = () => {
  const userData = useAppSelector((state) => state.user);
  const [formData, setForm] = useState({
    email: userData.email,
    fullName: userData.fullName,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (userData)
    return (
      <>
        <div className="section flex overflow-clip">
          <MobileNav title="Account"></MobileNav>
          <DesktopSection title="Account Setting" setting>
            <div className="flex gap-12 mt-6">
              <div>
                <ul>
                  <li>Email</li>
                  <li>Full Name</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>{userData.email}</li>
                  <li>{userData.fullName}</li>
                </ul>
              </div>

              <DialogBox
                email={formData.email}
                fullName={formData.fullName}
                onChangeEmail={handleChange}
                onChangeFullName={handleChange}
              />
            </div>
          </DesktopSection>
        </div>
      </>
    );

  return <Loading />;
};

export default AccountSetting;
