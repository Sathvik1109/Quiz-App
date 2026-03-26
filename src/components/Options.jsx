const Options = ({ questions, index }) => {
  return (
    <div className="options">
      {questions[index].options.map((op) => (
        <button className="btn btn-option" key={op}>
          {op}
        </button>
      ))}
    </div>
  );
};

export default Options;
