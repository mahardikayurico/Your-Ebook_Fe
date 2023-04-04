import React, { useState } from "react";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardEbook from "../../components/CardEbook/CardEbook";
// import { v4 as uuidv4 } from "uuid";

function HomePages() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    const userId = localStorage.getItem("@userId");
    formData.append("ebook", selectedFile);
    axios
      .post(`http://localhost:5000/api/v1/ebook/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">E-Book Reader</h1>
      <div className="flex justify-between w-full mb-8">
        <h2 className="text-xl font-bold">{`Welcome, hisihih `}</h2>
        <input type="file" onChange={handleFileSelect} />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          disabled={!selectedFile}
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 mr-4">
          <h3 className="text-lg font-bold mb-4">My E-Books</h3>
          <CardEbook />
        </div>
      </div>
    </div>
  );
}

export default HomePages;
