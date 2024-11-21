const setItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): unknown => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const setN5DictBookmark = (ids: number[]) => {
  const dict = JSON.parse(getItem("n5DictBookmark") as string) as number[];
  const newDict = (new Set([...dict, ...ids]));
  setItem("n5DictBookmark", Array.from(newDict));
}

const getN5DictBookmark = () => {
  return (getItem("n5DictBookmark") ?? []) as number[];
}

const toggleN5DictBookmark = (id: number) => {
  const dict = getN5DictBookmark();
  const newDict = dict.includes(id)
    ? dict.filter((item) => item !== id)
    : [...dict, id];
  setItem("n5DictBookmark", newDict);
};

const isN5WordBookmarked = (id: number) => {
  return getN5DictBookmark().includes(id);
};

export const Storage = {
  setItem,
  getItem,
  removeItem,
  setN5DictBookmark,
  getN5DictBookmark,
  toggleN5DictBookmark,
  isN5WordBookmarked,
};
