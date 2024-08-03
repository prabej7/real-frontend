import AdminNav from "@/components/ui/AdminNav";

const Admin: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen flex">
        <AdminNav dashboard />
        <div className="mt-12 ml-12">
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
      </div>
    </>
  );
};

export default Admin;
