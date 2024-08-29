import React from "react";
import Intro from "../components/MainPage/Intro";
import Categories from "../components/MainPage/Categories";
import FeaturedCourses from "../components/MainPage/FeaturedCourses";
import Info from "../components/MainPage/Info";
import Buycourse from "../components/MainPage/Buycourse";
import PaymentCard from "../components/PaymentCard";
import Starrating from "../components/General/Starrating";

const mainPage = () => {
  return (
    <div className="">
      <Intro />
      <Categories />
      <FeaturedCourses />
      <Info />
      <Buycourse />  
      <Starrating/>
      {/* <PaymentCard/>  */}
    </div>
  );
};

export default mainPage;
