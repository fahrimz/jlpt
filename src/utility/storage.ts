import { ScoreboardItem } from "src/data/types/scoreboard";
import { StorageKeys } from "./constants";

const setItem = (key: string, value: unknown): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): unknown => {
  const item = localStorage.getItem(key);
  console.log("item with name ", key, " is ", item);
  return item ? JSON.parse(item) : null;
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const setN5DictBookmark = (ids: number[]) => {
  const dict = JSON.parse(
    getItem(StorageKeys.n5DictBookmark) as string
  ) as number[];
  const newDict = new Set([...dict, ...ids]);
  setItem(StorageKeys.n5DictBookmark, Array.from(newDict));
};

const getN5DictBookmark = () => {
  return (getItem(StorageKeys.n5DictBookmark) ?? []) as number[];
};

const toggleN5DictBookmark = (id: number) => {
  const dict = getN5DictBookmark();
  const newDict = dict.includes(id)
    ? dict.filter((item) => item !== id)
    : [...dict, id];
  setItem(StorageKeys.n5DictBookmark, newDict);
};

const isN5WordBookmarked = (id: number) => {
  return getN5DictBookmark().includes(id);
};

const addScoreboard = (score: ScoreboardItem) => {
  const rawScoreboards = localStorage.getItem(StorageKeys.scoreboard);

  if (rawScoreboards?.includes(JSON.stringify(score))) {
    return;
  }

  const scoreboards = getItem(StorageKeys.scoreboard);
  const scoreboardsArr = Array.isArray(scoreboards)
    ? (scoreboards as ScoreboardItem[])
    : [];

  setItem(StorageKeys.scoreboard, [...scoreboardsArr, score]);
};

const removeScoreboard = (index: number) => {
  const scoreboards = getItem(StorageKeys.scoreboard) as ScoreboardItem[];
  scoreboards.splice(index, 1);
  setItem(StorageKeys.scoreboard, scoreboards);
};

const getAllScoreboards = (): ScoreboardItem[] => {
  const items = getItem(StorageKeys.scoreboard);
  return items ? (items as ScoreboardItem[]) : [];
};

export const Storage = {
  setItem,
  getItem,
  removeItem,
  setN5DictBookmark,
  getN5DictBookmark,
  toggleN5DictBookmark,
  isN5WordBookmarked,
  addScoreboard,
  removeScoreboard,
  getAllScoreboards,
};
