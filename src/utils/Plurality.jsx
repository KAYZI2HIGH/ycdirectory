
const Plurality = ({value, word}) => {
  if (value > 1) {
    return (
      <div className="flex gap-2">
        <p className="font-extrabold inline">{value}</p> {word + 's'}
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <p className="font-extrabold inline">{value}</p> {word}
    </div>
  );
}

export default Plurality