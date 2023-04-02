import React from "react";
import hero from "../../assets/images/welcome.jpg";
import { useNavigate } from "react-router-dom";

export default function WelcomePages() {
  const Navigation = useNavigate();
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
            Hi [Full Name], it's great to have you here! Your current role is
            [Role].
          </h1>
          <button
            className="bg-gray-100 p-3 rounded-xl shadow-xl hover:bg-gray-950 hover:text-gray-300 mt-8"
            onClick={() => Navigation(`/home`)}
          >
            Let's Get Started
          </button>
        </section>
      </main>
    </div>
  );
}
