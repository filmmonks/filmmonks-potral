import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Circles
        height="80"
        width="80"
        color="#001529"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
