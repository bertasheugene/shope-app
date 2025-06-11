import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart/cartSlice";
import { selectAddedCount } from "../../store/cart/cartSelectors";

export const ProductsCard: React.FC<Product> = ({
  id,
  title,
  price,
  imageUrl,
  memory,
  colors,
  category,
}) => {
  const dispatch = useDispatch();

  const [memoryItem, setMemoryItem] = useState<number>(0);
  const [colorItem, setColorItem] = useState<number>(0);
  const [priceItem, setPriceItem] = useState<number>(price);

  const selectCartItem = useMemo(() => selectAddedCount(), []);
  const addedCount = useSelector((state) => selectCartItem(state, id));

  function selectedMemory(id: number) {
    let memoryData = memory[id];

    if (memoryData.priceFactor > 0) {
      setPriceItem(price + memoryData.priceFactor);
    } else {
      setPriceItem(price);
    }

    setMemoryItem(id);
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        imageUrl,
        colors,
        category,
        color: colors[colorItem],
        memory: memory[memoryItem],
        price: priceItem,
      })
    );
  };

  return (
    <div className="product-block">
      <img className="product-block__image" src={imageUrl} alt="product" />
      <h4 className="product-block__title">
        <Link to={`/product/${id}`}>{title}</Link>
      </h4>
      <div className="product-block__selector">
        {memory && (
          <ul>
            {memory.map((item, index) => (
              <li
                onClick={() => selectedMemory(index)}
                className={index === memoryItem ? "active" : ""}
                key={index}
              >
                {item.size}
              </li>
            ))}
          </ul>
        )}

        {colors && (
          <ul>
            {colors.map((color, index) => (
              <li
                onClick={() => setColorItem(index)}
                className={index === colorItem ? "active" : ""}
                key={index}
              >
                <div className="color">
                  <div
                    style={{ background: color }}
                    className="color__wrapper"
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="product-block__bottom">
        <div className="product-block__price">{priceItem} $</div>
        <button
          className="button button--outline button--add"
          onClick={handleAddToCart}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Buy</span>
          {addedCount ? <i>{addedCount}</i> : ""}
        </button>
      </div>
    </div>
  );
};
