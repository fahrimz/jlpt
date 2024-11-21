import { Links } from "./constants";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const removeDomain = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.pathname + urlObj.search + urlObj.hash;
};

export const urlMatch = (url: string, link: keyof typeof Links): boolean => {
  const urlDomainRemoved = removeDomain(url);
  return urlDomainRemoved === Links[link];
};
