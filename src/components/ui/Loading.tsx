const Loading: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        <span className="loading loading-infinity loading-lg"></span>
        Loading...
      </div>
    </>
  );
};

export default Loading;
