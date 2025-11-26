// src/components/Home.jsx (combina todas las secciones)
import React from "react";
import Hero from "./Hero";
import WhatIs from "./WhatIs";
import HowItBorn from "./HowItBorn";
import Zones from "./Zones";
import Program from "./Program";
import Sponsors from "./Sponsors";
import Organizers from "./Organizers";
import PracticalInfo from "./PracticalInfo";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Hero />
      <WhatIs />
      <HowItBorn />
      <Zones />
      <Program />
      <Sponsors />
      <Organizers />
      <PracticalInfo />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
