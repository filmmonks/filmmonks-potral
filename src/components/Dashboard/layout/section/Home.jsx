import { useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      fetch("https://filmmonks-server.onrender.com/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            toast("Files uploaded successfully");
            setSelectedFiles([]);
          } else {
            toast("Error uploading files");
          }
        })
        .catch((error) => {
          toast.error("Error uploading files", error);
        });
    }
  };

  return (
    <div>
      <h1>Home Cover</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} multiple />

        <button type="submit" disabled={selectedFiles.length === 0}>
          Upload
        </button>
        <b>
          <small style={{ color: "red", display: "block" }}>
            {" "}
            Please add 3 images
            <br /> mobile-size (375px × 475px) <br />
            tablet-size (1040px ×742px) <br /> desktop-size (1920px × 885px)
          </small>
        </b>
      </form>
    </div>
  );
};

export default Home;
