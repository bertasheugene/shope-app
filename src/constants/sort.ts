interface Sort {
  id: number;
  name: string;
  orderBy: string;
  order: string;
  alias: string;
}

export const sortItems: Sort[] = [
  {
    id: 1,
    name: "popularity",
    orderBy: "rating",
    order: "asc",
    alias: "popularity",
  },
  {
    id: 2,
    name: "price (low to high)",
    orderBy: "price",
    order: "asc",
    alias: "min-price",
  },
  {
    id: 3,
    name: "price (high to low)",
    orderBy: "price",
    order: "desc",
    alias: "max-price",
  },
];

export const findSortByAlias = (alias: string | undefined | null): Sort => {
  if (alias === undefined || alias === null) {
    return sortItems[0];
  }
  const foundSort = sortItems.find((item) => item.alias === alias);
  return foundSort || sortItems[0];
};
