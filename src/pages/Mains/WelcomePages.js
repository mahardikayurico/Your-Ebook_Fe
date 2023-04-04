import React, { useState, useEffect } from "react";
import hero from "../../assets/images/welcome.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePages = () => {
  const Navigation = useNavigate();
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("@userId");
  const getUserById = (id) => {
    return axios.get(`http://localhost:5000/api/v1/users/${id}`);
  };
  useEffect(() => {
    getUserById(id)
      .then((response) => {
        // data yang diterima dari server
        setUser(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  return (
    <div className="bg-gray-300 pt-20 pb-[12rem]">
      <main className="container max-w-5xl mx-auto flex min-[320px]:flex-col md:flex-row lg:flex-row sm:flex-col mt-6">
        <section className="basis-[50%] bg-cover bg- w-full h-full mr-12">
          {" "}
          <img
            className="h-full w-full   shadow-xl mx-auto"
            src={hero}
            alt="profil"
          ></img>
        </section>
        <section className="basis-[50%]">
          <h1 className="text-3xl font-semibold mt-12">
            Hi <span className="text-blue-700">{user.fullname} </span>, it's
            great to have you here! Your current role is users.
          </h1>
          <button
            className="bg-gray-100 p-3 rounded-xl shadow-xl hover:bg-gray-950 hover:text-gray-300 mt-8"
            onClick={() => Navigation(`/home/${user.id}`)}
          >
            Let's Get Started
          </button>
        </section>
      </main>
    </div>
  );
};
export default WelcomePages;
