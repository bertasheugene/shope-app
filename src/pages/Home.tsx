import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Categories, Sort, ProductsCard, ProductLoader } from "../components";

import { setFilters } from "../store/filter/filterSlice";
import { fetchProducts } from "../store/product/productsSlice";
import { selectProductsData } from "../store/product/productsSelectors";
import { selectCategory, selectSort } from "../store/filter/filterSelectors";
import { AppDispatch, RootState } from "../store/store";

import { findSortByAlias } from "../constants/sort";
import { findCategory } from "../constants/categories";

type FetchParams = {
  orderBy: string;
  order: string;
  category?: number;
};

type HomeParams = {
  sortType?: string;
  categoryId?: string;
};

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { sortType, categoryId } = useParams<HomeParams>();
  const category = useSelector(selectCategory);
  const sort = useSelector(selectSort);

  const { items: data, status } = useSelector(selectProductsData);

  const fetchData = async () => {
    const params: FetchParams = {
      orderBy: sort.orderBy,
      order: sort.order,
    };

    if (category) {
      params.category = category;
    }
    dispatch(fetchProducts(params));
  };

  useEffect(() => {
    const sortItem = findSortByAlias(sortType);
    const categoryItem = categoryId ? Number(categoryId) : 0;

    if (sortItem.id !== sort.id || categoryItem !== category) {
      dispatch(
        setFilters({
          sort: sortItem,
          category: categoryItem,
        })
      );
    }
  }, [sortType, categoryId]);

  useEffect(() => {
    fetchData();
  }, [category, sort]);

  const currentCategory = findCategory(category);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {status === "error" && (
        <div>
          <h2>Something went wrong.</h2>
        </div>
      )}

      {status === "loading" && (
        <>
          <h2 className="content__title">{currentCategory.name}</h2>
          <div className="content__items">
            {status === "loading" &&
              [...new Array(8)].map((_, index) => (
                <ProductLoader key={index} />
              ))}
          </div>
        </>
      )}

      {status === "completed" && (
        <>
          <h2 className="content__title">{currentCategory.name}</h2>
          <div className="content__items">
            {data.length &&
              data.map((item, index) => <ProductsCard key={index} {...item} />)}
          </div>
        </>
      )}
    </>
  );
};
