import { Button } from "@/components/ui/button";
import DesktopSection from "@/components/ui/DesktopSection";
import Galery from "@/components/ui/Galery";
import Loading from "@/components/ui/Loading";
import { MobileNav } from "@/components/ui/sideBar";
import Hostel from "@/constant/types/Hostels";
import { useHostelContext } from "@/Provider/HostelContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HostelFullView: React.FC = () => {
  const { allHostels, error, loading } = useHostelContext();
  const [hostel, setHostel] = useState<Hostel>();
  const { id } = useParams();
  useEffect(() => {
    const h = allHostels.find((hostel) => hostel._id == id);
    setHostel(h);
  }, [loading]);
  if (loading) return <div></div>;
  if (error) return <div>Error</div>;

  if (hostel && hostel.address.length > 0)
    return (
      <>
        <div className="section flex overflow-x-clip">
          <MobileNav>
            <div>
              <h1 className="font-bold text-center text-xl">
                {hostel.address}(Hostel)
              </h1>
              <h2 className="font-medium wi-[450px] text-left mt-3">
                Galery :
              </h2>
              <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
                <Galery imgs={hostel.img} />
              </div>
              <div className="mb-6">
                <h2 className="font-medium wi-[450px] text-left mt-3">
                  Facilities :
                </h2>
                <ul className="">
                  {hostel.cctv && <li>CCTv </li>}
                  {hostel.cupboard && <li>Cupboard </li>}
                  {hostel.doctorOnCall && <li>Doctor on call </li>}
                  {hostel.fan && <li>Fan </li>}
                  {hostel.food && <li>Food </li>}
                  {hostel.geyser && <li>Geyser </li>}
                  {hostel.laundry && <li>Laundy </li>}
                  {hostel.locker && <li>Loacker </li>}
                  {hostel.matress && <li>Matress </li>}
                  {hostel.parking && <li>Parking </li>}
                  {hostel.postPayment && <li>Payment : Month end </li>}
                  {hostel.prePayment && <li>Payment : Advance </li>}
                  {hostel.studyTable && <li>Study Table </li>}
                  {hostel.washroom && <li>Washroom </li>}
                  {hostel.wifi && <li>Wi-fi </li>}
                </ul>
              </div>
            </div>
            <Button className="mb-12 w-[340px]">Book Now!</Button>
          </MobileNav>
          <DesktopSection>
            <div className="flex justify-center items-center w-screen pr-32">
              <div className="">
                <h1 className="font-bold  text-xl">{hostel.address}(Hostel)</h1>

                <h2 className="font-medium wi-[450px] text-left mt-3">
                  Galery :
                </h2>
                <div className="mt-3 w-[350px] flex justify-center flex-col items-center">
                  <Galery imgs={hostel.img} />
                </div>
                <div className="mb-6">
                  <h2 className="font-medium wi-[450px] text-left mt-3">
                    Facilities :
                  </h2>
                  <ul className="">
                    {hostel.cctv && <li>CCTv </li>}
                    {hostel.cupboard && <li>Cupboard </li>}
                    {hostel.doctorOnCall && <li>Doctor on call </li>}
                    {hostel.fan && <li>Fan </li>}
                    {hostel.food && <li>Food </li>}
                    {hostel.geyser && <li>Geyser </li>}
                    {hostel.laundry && <li>Laundy </li>}
                    {hostel.locker && <li>Loacker </li>}
                    {hostel.matress && <li>Matress </li>}
                    {hostel.parking && <li>Parking </li>}
                    {hostel.postPayment && <li>Payment : Month end </li>}
                    {hostel.prePayment && <li>Payment : Advance </li>}
                    {hostel.studyTable && <li>Study Table </li>}
                    {hostel.washroom && <li>Washroom </li>}
                    {hostel.wifi && <li>Wi-fi </li>}
                  </ul>
                </div>
                <Button className="mb-12 w-[470px]">Book Now!</Button>
              </div>
            </div>
          </DesktopSection>
        </div>
      </>
    );
};

export default HostelFullView;
