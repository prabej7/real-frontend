import DesktopSection from "@/components/ui/DesktopSection";
import { MobileNav } from "@/components/ui/sideBar";
import useAuth from "@/hooks/useAuth";

const Rooms: React.FC = () => {
  useAuth("account/rooms");
  return (
    <>
      <div className="section flex overflow-clip">
        <MobileNav title="Rooms">
          <div>
            <p className="text-center text-gray-400 mt-72">
              Your rooms will appear here!
            </p>
          </div>
        </MobileNav>
        <DesktopSection rooms title="Rooms" isNav>
          <div className="">
            <p className="text-center text-gray-400 mt-6 ">
              Your rooms will appear here!
            </p>
          </div>
        </DesktopSection>
      </div>
    </>
  );
};

export default Rooms;
