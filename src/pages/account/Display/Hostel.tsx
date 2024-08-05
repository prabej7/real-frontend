import HostelCard from "@/components/ui/HostelCard";

const Hostel: React.FC = () => {
  return (
    <>
      <div className="max-h-80 overflow-y-auto w-[1000px] grid grid-cols-2 gap-6">
        <HostelCard />
        <HostelCard />
        <HostelCard />
        <HostelCard />
        <HostelCard />
        <HostelCard />
        <HostelCard />
      </div>
    </>
  );
};

export default Hostel;
