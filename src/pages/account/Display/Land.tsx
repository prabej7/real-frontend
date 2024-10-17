import Loading from "@/components/ui/Loading";
import RoomCard from "@/components/ui/RoomsCard";
import LandCard from "@/components/user/LandCard";
import { useLands } from "@/Provider/LandContext";

const Land: React.FC = () => {
  const { lands, isLoading } = useLands();
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="lg:max-h-[365px] xs:bg-black overflow-y-auto xl:w-[120%] 2xl:w-[170%] 2xl:max-h-[650px]">
        <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 2xl:grid-cols-4">
          {lands.map((land) => {
            return (
              <LandCard
                coords={land.coord}
                description=""
                id={land._id}
                thumbnail={land.img[0]}
                title={land.address}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Land;
