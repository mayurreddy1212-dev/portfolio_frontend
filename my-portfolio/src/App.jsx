import React from "react";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <div>
    <Navbar/>
    <Home/>
    <About/>  
    <Projects/>
    <Skills/>
    <Experience/>
    <Testimonials/>
    <Footer/>
    </div>
  )
}

export default App
