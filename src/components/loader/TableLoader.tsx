import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const TableLoader = () => {
  const [isSmall, setIsSmall] = useState(false);
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 992) setIsSmall(true);
  //     else setIsSmall(false);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div
      style={{
        minHeight: "20vh",
        minWidth: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: isSmall ? "translate(-50%, 0)" : "",
        }}
      >
        <BarLoader width={200} color="#001529" />
      </div>
    </div>
  );
};

export default TableLoader;
