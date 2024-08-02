import { Button } from "@/components/ui/button";
import DesktopSection from "@/components/ui/DesktopSection";
import Galery from "@/components/ui/Galery";
import { MobileNav } from "@/components/ui/sideBar";
import { useParams } from "react-router-dom";

const RoomFullView: React.FC = () => {
  const { id } = useParams();
  return (
    <>
      <div className="section flex overflow-x-clip">
        <MobileNav>
          <div>
            <h1 className="font-bold text-center text-xl">Room title</h1>
            <div className="mt-3">
              <h2 className="font-medium">Desciption :</h2>
              <p className="mt-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                numquam debitis rerum vero in assumenda nesciunt quaerat
                excepturi, fugit dignissimos perspiciatis similique tempora
                animi? Maiores dignissimos id ipsum quas voluptates?
              </p>
            </div>
            <h2 className="font-medium wi-[450px] text-left mt-3">Galery :</h2>
            <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
              <Galery />
            </div>
            <div className="mb-6">
              <h2 className="font-medium wi-[450px] text-left mt-3">
                Facilities :
              </h2>
              <ul className="">
                <li>Single room</li>
                <li>Water faculties</li>
                <li>Maximum people 4</li>
                <li>Balcony</li>
                <li>Wi-fi</li>
              </ul>
            </div>
          </div>
          <Button className="mb-12 w-[340px]">Book Now!</Button>
        </MobileNav>
        <DesktopSection>
          <div className="flex flex-col px-80">
            <div>
              <h1 className="font-bold  text-xl">Room title</h1>
              <div className="mt-3">
                <h2 className="font-medium">Desciption :</h2>
                <p className="mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  numquam debitis rerum vero in assumenda nesciunt quaerat
                  excepturi, fugit dignissimos perspiciatis similique tempora
                  animi? Maiores dignissimos id ipsum quas voluptates?
                </p>
              </div>
              <h2 className="font-medium wi-[450px] text-left mt-3">
                Galery :
              </h2>
              <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
                <Galery />
              </div>
              <div className="mb-6">
                <h2 className="font-medium wi-[450px] text-left mt-3">
                  Facilities :
                </h2>
                <ul className="">
                  <li>Single room</li>
                  <li>Water faculties</li>
                  <li>Maximum people 4</li>
                  <li>Balcony</li>
                  <li>Wi-fi</li>
                </ul>
              </div>
            </div>
            <Button className="mb-12 w-[340px] sticky">Book Now!</Button>
          </div>
        </DesktopSection>
      </div>
    </>
  );
};

export default RoomFullView;
