const checkItemTuple = (item: any): boolean =>
  Array.isArray(item) &&
  item.length === 3 &&
  typeof item[0] === "number" &&
  typeof item[1] === "number" &&
  typeof item[2] === "number";

const checkBookFormat = (value: any): boolean => {
  if (!(Array.isArray(value) && value.length === 2 && Array.isArray(value[1])))
    return false;

  if (!(checkItemTuple(value[1]) || value[1].every((e) => checkItemTuple(e))))
    return false;

  return true;
};

export { checkBookFormat, checkItemTuple };
