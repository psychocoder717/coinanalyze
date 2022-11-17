import React from "react";
import img from "../imag/icons8-futures.gif";

export default function Header() {
  return (
    <>
    {/* header of our app  */}
      <header class="text-gray-600  w-screen  body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img
              src={img}
              alt=""
              class="w-12 h-12  text-white p-2  rounded-full"
            />
            <span class="ml- text-xl">CoinsAnalyze</span>
          </a>

          <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <a class="mr-9 hover:text-gray-900"></a>
          </nav>
        </div>
      </header>
    </>
  );
}
