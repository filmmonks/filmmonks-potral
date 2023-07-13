import { useState } from "react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
            setSelectedFile(null);
          } else {
            console.error("Error uploading file");
          }
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });
    }
  };

  return (
    <div>
      <h1>Monks Galary</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Home;
