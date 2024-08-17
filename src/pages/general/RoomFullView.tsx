import { Button } from "@/components/ui/button";
import DesktopSection from "@/components/ui/DesktopSection";
import Galery from "@/components/ui/Galery";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import Rooms from "@/constant/types/rooms";
import url from "@/constant/url";
import { useRoomContext } from "@/Provider/RoomsContext";
import { useUserContext } from "@/Provider/UserContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RoomFullView: React.FC = () => {
  const notify = {
    success: (text: string) => toast.success(text),
    error: (text: string) => toast.error(text),
  };
  const { user } = useUserContext();
  const { id } = useParams();
  const { rooms, loading } = useRoomContext();
  const navigate = useNavigate();
  const handleClick = async (id: string) => {
    try {
      const selectedRoom: Rooms = rooms.find((room) => (room._id = id));
      navigate(`/account/messages/${user?.messageId}`, { state: selectedRoom });
    } catch (e) {
      notify.error("Something went wrong!");
    }
  };
  if (loading) return <Loading />;
  if (rooms) {
    const room = rooms.find((room) => room._id == id);
    return (
      <>
        <div className="section flex overflow-x-clip">
          <MobileNav>
            <div>
              <h1 className="font-bold text-center text-xl">{room.address}</h1>
              <h2 className="font-medium wi-[450px] text-left mt-3">
                Galery :
              </h2>
              <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
                <Galery imgs={room.img} />
              </div>
              <div className="mb-6">
                <h2 className="font-medium wi-[450px] text-left mt-3">
                  Facilities :
                </h2>
                <ul className="">
                  {room.noOfRooms && <li>Rooms: {room.noOfRooms}</li>}
                  {room.flat && <li>Flat: ✅</li>}
                  {room.balcony && <li>Balcony: ✅</li>}
                  {room.maxPeople && (
                    <li>Max poeple can stay: {room.maxPeople}</li>
                  )}
                  {room.waterFacility && <li>Water Facility ✅</li>}
                  {room.waterTank && <li>Water Tank: ✅</li>}
                  {room.wifi && <li>Wi-fi: ✅</li>}
                  {room.furnished && <li>Furnished: ✅</li>}
                  {room.noticePeriod && (
                    <li>Notice Period: {room.noticePeriod}</li>
                  )}
                  {room.paymentmode && (
                    <li>Payment mode: {room.paymentmode}</li>
                  )}
                  {room.restrictions && (
                    <li>Restrictions: {room.restrictions}</li>
                  )}
                </ul>
              </div>
            </div>
            <Button
              className="mb-12 w-[340px]"
              onClick={() => handleClick(room._id)}
            >
              Book Now!
            </Button>
          </MobileNav>

          <div className=" w-screen flex flex-col items-center pr-32 pt-12">
            <div className="">
              <h1 className="font-bold  text-xl">{room.address}</h1>

              <h2 className="font-medium wi-[450px] text-left mt-3">
                Galery :
              </h2>
              <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
                <Galery imgs={room.img} />
              </div>
              <div className="mb-6">
                <h2 className="font-medium wi-[450px] text-left mt-3">
                  Facilities :
                </h2>
                <ul className="">
                  {room.noOfRooms && <li>Rooms: {room.noOfRooms}</li>}
                  {room.flat && <li>Flat: ✅</li>}
                  {room.balcony && <li>Balcony: ✅</li>}
                  {room.maxPeople && (
                    <li>Max poeple can stay: {room.maxPeople}</li>
                  )}
                  {room.waterFacility && <li>Water Facility ✅</li>}
                  {room.waterTank && <li>Water Tank: ✅</li>}
                  {room.wifi && <li>Wi-fi: ✅</li>}
                  {room.furnished && <li>Furnished: ✅</li>}
                  {room.noticePeriod && (
                    <li>Notice Period: {room.noticePeriod}</li>
                  )}
                  {room.paymentmode && (
                    <li>Payment mode: {room.paymentmode}</li>
                  )}
                  {room.restrictions && (
                    <li>Restrictions: {room.restrictions}</li>
                  )}
                </ul>
              </div>
              <Button
                className="mb-12 w-[470px]"
                onClick={() => handleClick(room._id)}
              >
                Book Now!
              </Button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
  <Loading />;
};

export default RoomFullView;
