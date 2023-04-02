import { useState } from "react";
import AdobePDFReader from "../../components/PDFComponents/AdobePDFReader";

function EbookCollection() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to handle file upload
  const handleUpload = (event) => {
    const newFile = event.target.files[0];
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  // Function to filter files uploaded by the current user
  const filterUploadedFiles = (file) => {
    // Here, you can implement a check to verify if the file belongs to the current user
    return true;
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">E-Book Collection</h1>

      <div className="mb-4">
        <input type="file" accept=".pdf" onChange={handleUpload} />
      </div>

      <div>
        {uploadedFiles.filter(filterUploadedFiles).map((file) => (
          <div key={file.name} className="mb-4 flex items-center">
            <span className="mr-4">{file.name}</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Download
            </button>
          </div>
        ))}
      </div>

      <AdobePDFReader />
    </div>
  );
}

export default EbookCollection;
