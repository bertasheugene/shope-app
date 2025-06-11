import { FC } from "react";
import { Link } from "react-router-dom";
import cartEmptyImg from "../../assets/img/empty-cart.png";

export const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Basket empty</h2>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link to="/shope-app/" className="button button--black">
        <span>Main</span>
      </Link>
    </div>
  );
};
