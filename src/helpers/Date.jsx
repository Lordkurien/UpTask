export const FormatDate = (date) => {
  const [year, month, day] = date.split("T")[0].split("-");
  const newDate = new Date(year, month - 1, day); 
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleDateString("en-US", options);
};
