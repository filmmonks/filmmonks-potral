import { useState } from "react";
import { toast } from "react-toastify";

const MonksForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
console.log(selectedFile)
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("monks-galary", selectedFile);

      fetch("https://filmmonks-server.onrender.com/api/monks-galary", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("File uploaded successfully");
            toast("file is added")
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
    <form onSubmit={handleSubmit}>
    <input type="file" name="monks-galary" onChange={handleFileChange} />
    <button type="submit" disabled={!selectedFile}>
      Upload
    </button>
  </form>
  );
};

export default MonksForm;
