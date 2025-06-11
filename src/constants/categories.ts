interface Category {
  id: number;
  name: string;
}

export const categoriesList: Category[] = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "MacBook",
  },
  {
    id: 2,
    name: "iPhone",
  },
  {
    id: 3,
    name: "Watch",
  },
  {
    id: 4,
    name: "AirPods",
  },
];

export const findCategory = (id: number | undefined | null): Category => {
  if (id === undefined || id === null) {
    return categoriesList[0];
  }

  const foundCategory = categoriesList.find((category) => category.id === id);
  return foundCategory || categoriesList[0];
};
