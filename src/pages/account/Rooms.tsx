import DesktopSection from "@/components/ui/DesktopSection";
import { MobileNav } from "@/components/ui/sideBar";


const Rooms: React.FC = () => {


  return (
    <>
      <div className="section flex overflow-clip">
        <MobileNav title="Rooms" />
        <DesktopSection rooms title="Rooms"></DesktopSection>
      </div>
    </>
  );
};

export default Rooms;
