import DesktopSection from "@/components/ui/DesktopSection";
import DialogBox from "@/components/ui/EditProfile";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import { useUserContext } from "@/Provider/UserContext";

import { ChangeEvent, useState } from "react";

interface Form {
  fullName?: string;
  file?: File;
}

const AccountSetting: React.FC = () => {
  const user = useUserContext();
  const [formData, setForm] = useState({
    email: user.email,
    fullName: user.fullName,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (user.email.length > 0)
    return (
      <>
        <div className="section flex overflow-x-clip">
          <MobileNav title="Account">
            <div className="flex flex-col gap-3 w-screen ">
              <div className="flex justify-center mt-6">
                <div className="image-container ">
                  <img
                    src={`${user.avatar}`}
                    alt=""
                    className="image circle-frame"
                  />
                </div>
              </div>
              <div className="flex gap-12 mt-6">
                <div>
                  <ul>
                    <li>Email</li>
                    <li>Full Name</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>{user.email}</li>
                    <li>{user.fullName}</li>
                  </ul>
                </div>
              </div>

              <DialogBox />
            </div>
          </MobileNav>
          <DesktopSection title="Account Setting" setting>
            <div className="flex gap-12 mt-6 flex-col">
              <div className="image-container ">
                <img
                  src={`${user.avatar}`}
                  alt=""
                  className="image circle-frame ml-16"
                />
              </div>
              <div className="flex gap-12">
                <div>
                  <ul>
                    <li>Email</li>
                    <li>Full Name</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>{user.email}</li>
                    <li>{user.fullName}</li>
                  </ul>
                </div>
              </div>

              <DialogBox />
            </div>
          </DesktopSection>
        </div>
      </>
    );

  return <Loading route="setting" />;
};

export default AccountSetting;
