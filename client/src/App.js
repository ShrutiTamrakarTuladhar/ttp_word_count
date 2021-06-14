import "./App.css";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    console.log(text.length);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Text
          <textarea type="text" value={text} onChange={handleChange}></textarea>
        </label>
        <button type="submit" value="Submit">
          submit
        </button>
      </form>
      <p>Current chars : {charCount}</p>
    </div>
  );
}

export default App;
