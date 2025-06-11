import React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { setSort } from "../store/filter/filterSlice";
import { selectSort } from "../store/filter/filterSelectors";

import { sortItems } from "../constants/sort";

type RouteParams = {
  [key: string]: string | undefined;
  sortType?: string;
  categoryId?: string;
};

export const Sort = React.memo(() => {
  const [open, setOpen] = useState(false);
  const { sortType = "popularity", categoryId = 0 } = useParams<RouteParams>();

  const sortRef = useRef<HTMLDivElement>(null);

  const sort = useSelector(selectSort);
  const dispatch = useDispatch();

  const onClickSort = React.useCallback((sortData: Sort) => {
    dispatch(setSort(sortData));
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Sort by:</b>
        <span onClick={() => setOpen((prev) => !prev)}>{sort.name}</span>
      </div>

      <div className={`sort__popup ${!open ? "sort__popup_close" : ""}`}>
        <ul>
          {sortItems.map((item, index) => (
            <li
              key={item.id}
              className={sortType === item.alias ? "active" : ""}
            >
              <Link
                key={item.id}
                to={
                  categoryId
                    ? `/sort/${item.alias}/category/${categoryId}`
                    : `/sort/${item.alias}`
                }
                onClick={() => onClickSort(item)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
