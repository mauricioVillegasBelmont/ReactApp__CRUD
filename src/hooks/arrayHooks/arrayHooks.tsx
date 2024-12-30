import { useState } from "react";

type useArrayHooksType<T> = {
  array: T[];
  set: React.Dispatch<React.SetStateAction<T[]>>;
  push: (element: T) => void;
  filter: (
    callback: (element: T, index: number, array: T[]) => boolean
  ) => void;
  update: (index: number, newElement: T) => void;
  remove: (index: number) => void;
  clear: () => void;
  pop: () => void;
  find: (
    callback: (element: T, index: number, array: T[]) => boolean
  ) => T | undefined;
  findIndex: (
    callback: (element: T, index: number, array: T[]) => boolean
  ) => number;
  includes: (element: T) => boolean;
  isEmpty: () => boolean;
  sort: (direction: "asc" | "desc") => void;
  sortDirection: "asc" | "desc";
  shuffle: (shufleIndexes?: number[]) => void;
};

const useArrayHooks = <T,>(initialValue: T[] = []): useArrayHooksType<T> => {
  const [array, setArray] = useState<T[]>(initialValue);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const push = (element: T) => setArray((a) => [...a, element]);

  const filter = (
    callback: (element: T, index: number, array: T[]) => boolean
  ) => setArray((a) => a.filter(callback));

  const update = (index: number, newElement: T) => {
    setArray((a) =>
      index >= 0 && index < a.length
        ? [...a.slice(0, index), newElement, ...a.slice(index + 1)]
        : a
    );
  };

  const remove = (index: number) => {
    setArray((a) =>
      index >= 0 && index < a.length
        ? [...a.slice(0, index), ...a.slice(index + 1)]
        : a
    );
  };

  const clear = () => setArray([]);

  const pop = () => {
    setArray((a) => a.slice(0, a.length - 1));
  };

  const find = (callback: (element: T, index: number, array: T[]) => boolean) =>
    array.find(callback);

  const findIndex = (
    callback: (element: T, index: number, array: T[]) => boolean
  ) => array.findIndex(callback);

  const includes = (element: T) => array.includes(element);

  const isEmpty = () => array.length === 0;

  const sort = (direction: "asc" | "desc" = "desc") => {
    if (
      sortDirection === direction ||
      (direction !== "asc" && direction !== "desc")
    ) return;
    const _arr = [...array];
    setArray(_arr.reverse());
    setSortDirection(direction);
  };

  const shuffle = (shufleIndexes: number[] | undefined = []) => {
    const indexes =
      shufleIndexes.length === 0
        ? array.map(function (item, index) {
            return index;
          })
        : shufleIndexes;

    const sorteableIndexes = indexes.sort(function (a, b) {
      return a - b;
    });
    var _N = sorteableIndexes.length;
    let arr = array;

    while (_N--) {
      var __rand = Math.floor(Math.random() * (_N - 0 + 1)) + 0;
      var __swap = arr.splice(sorteableIndexes[_N], 1);
      arr.splice(sorteableIndexes[__rand], 0, __swap[0]);
    }
    setArray(arr);
  };

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear,
    pop,
    find,
    findIndex,
    includes,
    isEmpty,
    sort,
    sortDirection,
    shuffle,
  };
};

export default useArrayHooks;
