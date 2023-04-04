import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardEbook = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  const id = localStorage.getItem("@userId");
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/ebook/${id}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-10 grid grid-cols-4 gap-7 p-3 mx-[1rem]">
      {data.map((item) => (
        <div
          onClick={() => navigate(`/products/${item.id}`)}
          className="card bg-base-100 shadow-xl  hover:cursor-pointer "
        >
          <figure>
            <object
              className="rounded-full h-28 w-28 shadow-xl mt-2"
              data={`http://localhost:5000/uploads/files/${item.ebook_name}`}
              type="application/pdf"
            >
              <p>
                Alternative text - include a link{" "}
                <a
                  href={`http://localhost:5000/uploads/files/${item.ebook_name}`}
                >
                  to the PDF!
                </a>
              </p>
            </object>
          </figure>
          <div className="card-body  items-center text-center p-1 mt-2 mb-2">
            <h2 className="card-title font-bold">{item.ebook_name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardEbook;
