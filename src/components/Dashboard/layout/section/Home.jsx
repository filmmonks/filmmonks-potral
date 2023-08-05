import { useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };
  console.log(selectedFiles);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      fetch("http://localhost:5000/upload", {
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
      </form>
    </div>
  );
};

export default Home;
