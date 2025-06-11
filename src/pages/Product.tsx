import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export const Product: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<Product>({
    id: "",
    title: "",
    price: 0,
    imageUrl: "",
    sizes: [],
    rating: 0,
    memory: [],
    colors: [],
    category: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [memoryItem, setMemoryItem] = useState(0);
  const [colorItem, setColorItem] = useState(0);
  const [priceItem, setPriceItem] = useState<number>(data.price);

  function selectedMemory(id: number) {
    let memoryData = data.memory[id];

    if (memoryData.priceFactor > 0) {
      setPriceItem(data.price + memoryData.priceFactor);
    } else {
      setPriceItem(data.price);
    }

    setMemoryItem(id);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://68074860e81df7060eb986cf.mockapi.io/products/" + id
        );
        setData(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-page">
      <img className="product-block__image" src={data.imageUrl} alt="product" />

      <div className="product-info">
        <h1>{data.title}</h1>
        <div className="product-block__selector">
          {data.memory && (
            <ul>
              {data.memory.map((item, index) => (
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

          {data.colors && (
            <ul>
              {data.colors.map((color, index) => (
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore velit,
          reprehenderit totam sunt deleniti voluptas fugiat nostrum dolorem
          repellat saepe corrupti ea nihil ducimus, tempora, eos esse temporibus
          atque quod.
        </p>
      </div>
    </div>
  );
};
