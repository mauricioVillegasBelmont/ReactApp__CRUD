type UseArrayPipesType<T> = {
  push: (a: T[], element: T) => T[];
  filter: (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => T[];
  update: (a: T[], index: number, newElement: T) => T[];
  remove: (a: T[], index: number) => T[];
  clear: () => T[];
  pop: (a: T[]) => T[];
  find: (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => T | undefined;
  findIndex: (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => number;
  includes: (a: T[], element: T) => boolean;
  isEmpty: (a: T[]) => boolean;
  sortAttr: <T extends Record<string, any>>(a: T[],  attr: keyof T, direction?: "asc" | "desc") => T[];
  shuffle: (a: T[], shufleIndexes?: number[]) => T[];
};

const useArrayPipes = <T,>(): UseArrayPipesType<T> => {
  // const [array, setArray] = useState<T[]>(initialValue);
  // const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const push = (a: T[], element: T) => [...a, element];
  const filter = (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => a.filter(callback);

  const update = (a: T[], index: number, newElement: T) => {
    return index >= 0 && index < a.length
      ? [...a.slice(0, index), newElement, ...a.slice(index + 1)]
      : a;
  };

  const remove = (a: T[], index: number) => {
    return index >= 0 && index < a.length
      ? [...a.slice(0, index), ...a.slice(index + 1)]
      : a;
  };

  const clear = () => [];

  const pop = (a: T[]) => {
    return a.slice(0, a.length - 1);
  };

  const find = (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => a.find(callback);

  const findIndex = (
    a: T[],
    callback: (element: T, index: number, array: T[]) => boolean
  ) => a.findIndex(callback);

  const includes = (a: T[], element: T) => a.includes(element);

  const isEmpty = (a: T[]) => a.length === 0;

  // const sort = (direction: "asc" | "desc" = "desc") => {
  const sortAttr = <T extends Record<string, any>>(
    a: T[],
    attr: keyof T = "id",
    direction: "asc" | "desc" = "desc"
  ): T[] => {
    if (!attr) return a;
    return [...a].sort((firstItem, secondItem) => {
      const firstValue = firstItem[attr];
      const secondValue = secondItem[attr];

      if (typeof firstValue === "number" && typeof secondValue === "number") {
        return direction === "asc"
          ? firstValue - secondValue
          : secondValue - firstValue;
      }

      if (typeof firstValue === "string" && typeof secondValue === "string") {
        return direction === "asc"
          ? firstValue.localeCompare(secondValue)
          : secondValue.localeCompare(firstValue);
      }
      return 0; // No se puede comparar, devuelve sin cambios
    });
  };

  const shuffle = <T,>(a: T[], shufleIndexes?: number[]): T[] => {
    const indexes = shufleIndexes?.length
      ? shufleIndexes
      : a.map((_, index) => index);

    var _N = indexes.length;
    let arr = [...a];

    for (let i = indexes.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      const temp = arr[indexes[i]];
      arr[indexes[i]] = arr[indexes[rand]];
      arr[indexes[rand]] = temp;
    }
    return arr;
  };

  return {
    // array,
    // set: setArray,
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
    sortAttr,
    shuffle,
  };
};

export default useArrayPipes;
