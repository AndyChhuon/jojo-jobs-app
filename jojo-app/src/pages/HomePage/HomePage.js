import React from "react";
import HomePageHeader from "../../Components/HomePageHeader/HomePageHeader";
import "./HomePage.less";
import Avatar from "../../Components/Avatar_3D/Avatar";

export default function HomePage() {
  return (
    <>
      <div className="homepage">
        <HomePageHeader />
      </div>
      <Avatar />
    </>
  );
}
