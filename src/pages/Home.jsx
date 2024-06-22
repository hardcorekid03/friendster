import React, { useState } from "react";
import Recent from "./Recent";
import Trending from "./Trending";
import AppRoutes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

export default function Home() {
  return (
    <main className="grid md:grid-cols-12 text-gray-900 lg:p-6 sm:p-0 md:p-4">
      <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
        <div className="icon-align p-2 bg-white shadow ">
          <AppRoutes />
        </div>
      </section>
      <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-0 md:p-4 ">
        <Trending />
      </section>
    </main>
  );
}
