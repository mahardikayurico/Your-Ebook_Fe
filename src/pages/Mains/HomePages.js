// import { useState } from "react";
// import { Document, Page } from "react-pdf";
// import axios from "axios";

// function HomePages() {
//   const [file, setFile] = useState(null);
//   const [numPages, setNumPages] = useState(null);

//   const onFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const onFileUpload = () => {
//     const formData = new FormData();
//     formData.append("file", file);

//     axios
//       .post("https://your-api-endpoint.com/upload-pdf", formData)
//       .then((response) => {
//         console.log(response.data);
//         // handle response
//       });
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-4">My E-Book Collection</h1>
//       <div className="flex flex-col items-center">
//         {file ? (
//           <Document
//             file={file}
//             onLoadSuccess={({ numPages }) => setNumPages(numPages)}
//           >
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//             ))}
//           </Document>
//         ) : (
//           <div className="bg-gray-200 w-full h-64 flex justify-center items-center">
//             <p>Upload your PDF file to get started</p>
//           </div>
//         )}
//         <input type="file" onChange={onFileChange} className="my-4" />
//         <button
//           onClick={onFileUpload}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomePages;

import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function HomePages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ebooks, setEbooks] = useState([]);
  const [user, setUser] = useState({ name: "John Doe", role: "User" });
  const [selectedEbook, setSelectedEbook] = useState(null);
  const [annotations, setAnnotations] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("id", uuidv4());
    formData.append("user", user.name);
    await axios.post("/api/upload", formData);
    setSelectedFile(null);
    loadEbooks();
  };

  const loadEbooks = async () => {
    const response = await axios.get("/api/ebooks");
    const userEbooks = response.data.filter(
      (ebook) => ebook.user === user.name
    );
    setEbooks(userEbooks);
  };

  const handleEbookSelect = (ebook) => {
    setSelectedEbook(ebook);
    loadAnnotations(ebook);
  };

  const loadAnnotations = async (ebook) => {
    const response = await axios.get(`/api/annotations/${ebook.id}`);
    setAnnotations(response.data);
  };

  const handleAnnotationSave = async (annotation) => {
    await axios.post(`/api/annotations/${selectedEbook.id}`, annotation);
    loadAnnotations(selectedEbook);
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">E-Book Reader</h1>
      <div className="flex justify-between w-full mb-8">
        <h2 className="text-xl font-bold">{`Welcome, ${user.name} (${user.role})`}</h2>
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
          <ul className="list-disc list-inside">
            {ebooks.map((ebook) => (
              <li
                key={ebook.id}
                className="cursor-pointer hover:underline"
                onClick={() => handleEbookSelect(ebook)}
              >
                {ebook.filename}
              </li>
            ))}
          </ul>
        </div>
        {selectedEbook && (
          <div className="w-1/2 ml-4">
            <h3 className="text-lg font-bold mb-4">{`Reading: ${selectedEbook.filename}`}</h3>
            <Document
              file={selectedEbook.path}
              onLoadError={() => setSelectedEbook(null)}
            >
              {Array.from(new Array(selectedEbook.pages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1}>
                  {annotations
                    .filter((annotation) => annotation.page === index + 1)
                    .map((annotation) => (
                      <div
                        key={annotation.id}
                        className="absolute"
                        style={{
                          left: `${annotation.x}%`,
                          top: `${annotation.y}%`,
                        }}
                      >
                        <div className="relative inline-block px-1 py-0.5 bg-blue-500 text-white rounded-md">
                          {annotation.content}
                        </div>
                      </div>
                    ))}
                </Page>
              ))}
            </Document>
            <div className="mt-4">
              <h4 className="text-md font-bold mb-2">Annotations</h4>
              {annotations.map((annotation) => (
                <div key={annotation.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">{`Page ${annotation.page}`}</div>
                    <div className="text-sm">{`${annotation.x}%, ${annotation.y}%`}</div>
                  </div>
                  <div className="text-sm">{annotation.content}</div>
                </div>
              ))}
              {/* <AnnotationForm onSave={handleAnnotationSave} /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePages;
