interface Props {
  children?: React.ReactNode;
  title: string;
}
const Section: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <div className="pt-12 pl-6 mbl ">
        <h1 className=" font-bold">{title}</h1>
        {children}
      </div>
    </>
  );
};

export default Section;
