import React, { useState } from "react";
import Recent from "./Recent";
import Trending from "./Trending";
import CreatePost from "./CreatePost";
import PostDetails from "./PostDetails";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState("Recent");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Recent":
        return <Recent setActiveComponent={setActiveComponent} />;
      case "CreatePost":
        return <CreatePost setActiveComponent={setActiveComponent} />;
      case "PostDetails":
        return <PostDetails setActiveComponent={setActiveComponent} />;
      default:
        return <Recent setActiveComponent={setActiveComponent} />;
    }
  };

  return (
    <>
      <main className="grid md:grid-cols-12 text-gray-900 lg:p-6 sm:p-4">
        <section className="md:col-span-9 md:mb-8 lg:p-6 sm:p-4">
          <div className="icon-align p-2 bg-white shadow">
            {renderComponent()}
          </div>
        </section>

        <section className="sm:block hidden md:col-span-3 md:mb-8 lg:p-6 sm:p-4">
          <Trending />
        </section>
      </main>
    </>
  );
}
