import React from "react";
import hero from "../../assets/images/ebook.jpg";
import { useNavigate } from "react-router-dom";
export default function LandingPages() {
  const Navigation = useNavigate();
  return (
    <div className="bg-gray-300 pt-20 pb-[12rem]">
      <header className="container max-w-5xl mx-auto flex min-[320px]:flex-col md:flex-row lg:flex-row sm:flex-col mt-6">
        <section className="basis-[50%]">
          <h1 className="text-text text-5xl font-semibold mt-12">
            Welcome to our simple web e-book reader application!
          </h1>
          <p className="mt-8 text-xl">
            With this application, you can upload and download e-books, as well
            as make annotations on the e-books you have read.
          </p>
          <button
            className="bg-gray-100 p-3 rounded-xl shadow-xl hover:bg-gray-950 hover:text-gray-300 mt-8"
            onClick={() => Navigation(`/login`)}
          >
            Get Started
          </button>
        </section>
        <section className="basis-[50%] bg-cover bg- w-full h-full ">
          {" "}
          <img
            className="h-full w-full   shadow-xl mx-auto"
            src={hero}
            alt="profil"
          ></img>
        </section>
      </header>
    </div>
  );
}
