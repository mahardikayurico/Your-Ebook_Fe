// import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import axios from "axios";

// function AdobePDFReader({ ebook, annotations, onSave }) {
//   const [selectedPage, setSelectedPage] = useState(1);
//   const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
//   const [annotationText, setAnnotationText] = useState("");

//   const handleAnnotationStart = () => {
//     setIsAddingAnnotation(true);
//   };

//   const handleAnnotationCancel = () => {
//     setIsAddingAnnotation(false);
//     setAnnotationText("");
//   };

//   const handleAnnotationSave = async () => {
//     const annotation = {
//       page: selectedPage,
//       text: annotationText,
//     };
//     await onSave(annotation);
//     setIsAddingAnnotation(false);
//     setAnnotationText("");
//   };

//   const handleTextChange = (event) => {
//     setAnnotationText(event.target.value);
//   };

//   return (
//     <div className="flex w-full">
//       <div className="w-3/4 mr-4">
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-xl font-bold">{`Page ${selectedPage} of ${ebook.pages}`}</h4>
//           <div className="flex">
//             {isAddingAnnotation ? (
//               <>
//                 <textarea
//                   className="w-64 h-32 p-2 border rounded mr-4"
//                   value={annotationText}
//                   onChange={handleTextChange}
//                 />
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md mr-4"
//                   onClick={handleAnnotationSave}
//                 >
//                   Save
//                 </button>
//                 <button
//                   className="px-4 py-2 bg-gray-500 text-white rounded-md"
//                   onClick={handleAnnotationCancel}
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                 onClick={handleAnnotationStart}
//               >
//                 Add Annotation
//               </button>
//             )}
//           </div>
//         </div>
//         <Document file={ebook.path} onLoadError={() => setSelectedPage(null)}>
//           <Page key={`page_${selectedPage}`} pageNumber={selectedPage}>
//             {annotations
//               .filter((annotation) => annotation.page === selectedPage)
//               .map((annotation) => (
//                 <div
//                   key={annotation.id}
//                   className="absolute border rounded-md border-yellow-500"
//                   style={{
//                     top: annotation.position.y,
//                     left: annotation.position.x,
//                   }}
//                 >
//                   <div className="bg-yellow-500 text-white p-1">
//                     {annotation.text}
//                   </div>
//                 </div>
//               ))}
//           </Page>
//         </Document>
//       </div>
//       <div className="w-1/4">
//         <h4 className="text-lg font-bold mb-4">Annotations</h4>
//         <ul className="list-disc list-inside">
//           {annotations.map((annotation) => (
//             <li
//               key={annotation.id}
//             >{`Page ${annotation.page}: ${annotation.text}`}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AdobePDFReader;
