const dateMatchesUsFormat = (date: string | null) => {
  // regex for finding date string from modal query param
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const dateFound = date ? date.toString().match(regex) : null;
  const returnValue = dateFound && dateFound.length > 0 ? dateFound[0] : null;
  return returnValue;
};
export const getCurrentUnixTime = () => Math.floor(Date.now() / 1000);

export default dateMatchesUsFormat;
