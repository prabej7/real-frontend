import SideBar from "./sideBar";

interface Props {
  children?: React.ReactNode;
  title?: string;
}
const Section: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <div className="section">
        <SideBar></SideBar>
      </div>
    </>
  );
};

export default Section;
