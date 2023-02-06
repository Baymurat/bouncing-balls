import { Ball, CreateBall } from "../types/types";

export const createBall = (create: CreateBall): Ball => {
  const id = Math.random();
  const height = create.width;

  return {
    id, height, ...create 
  };
};

export const generateRandomBall = (): Ball => {
  const id = Math.random();
  const width = getRandomInRange(10, 100);
  const height = width;
  const alpha = getRandomInRange(0, 360);
  const speed = getRandomInRange(0.5, 10);
  const color = getRandomFrom(colors);
  const word = getRandomFrom(words);

  return {
    width, height, color, alpha, speed, word, id,
  };
};

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "gray",
];

const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

const getRandomFrom = (arr: string[]) => {
  const index = Math.round(Math.random() * (arr.length - 1));
  return arr[index];
};

const getRandomInRange = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
