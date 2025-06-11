import React from "react";
import mainImage from "../../assets/img/404.png";
import style from "./style.module.scss";

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={style.root}>
      <img src={mainImage} alt="Not found" />
      <p>Oops! The page you're looking for doesn't exist.</p>
    </div>
  );
};
