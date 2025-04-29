import React from "react";
import Header from "../components/Header";
import Gallery from "../components/Gallery";

function Home() {
  return (
    <>
      <Header />
      <hr />
      <main className="home-page">
        <Gallery />
      </main>
    </>
  );
}

export default Home;
