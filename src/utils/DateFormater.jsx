const DateFormater = ({ createdDate }) => {
  const date = new Date(createdDate)
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    day: "numeric",
    month: "long",
  });
  return readableDate;
}

export default DateFormater