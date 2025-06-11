import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../store/filter/filterSlice";
import { categoriesList } from "../constants/categories";
import { selectCategory } from "../store/filter/filterSelectors";

interface CategoryItem {
  id: number;
  name: string;
}

type RouteParams = {
  [key: string]: string | undefined;
  sortType?: string;
  categoryId?: string;
};
export const Categories: React.FC = React.memo(() => {
  const category = useSelector(selectCategory);

  const { sortType = "popularity", categoryId = 0 } = useParams<RouteParams>();

  const dispatch = useDispatch();

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const baseSortPath =
    sortType !== "popularity" ? `/shope-app/sort/${sortType}` : "";

  return (
    <div className="categories">
      <ul>
        {categoriesList.map((item: CategoryItem) => (
          <li className={+category === item.id ? "active" : ""} key={item.id}>
            <Link
              key={item.id}
              to={
                baseSortPath +
                `${+item.id ? "/category/" + item.id + "/" : "/"}`
              }
              onClick={() => onClickCategory(item.id)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
