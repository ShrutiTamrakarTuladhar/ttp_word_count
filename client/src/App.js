import "./App.css";
import React, { useState } from "react";
import { FormGroup, Label, Form, CardDeck } from "reactstrap";
import StatCard from "./components/StatCard";

function App() {
  const wordsMap = new Map();
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  let mostFreq = "n/a";

  const getCharCount = (str) => {
    let chars = str.split("").filter((word) => word !== " ");
    return chars.length;
  };

  const getWords = (str) => {
    let wordsList = str.match(/\S+/g);
    return wordsList;
  };

  const getWordCount = (str) => {
    let wordsList = getWords(str);
    return wordsList ? wordsList.length : 0;
  };

  const getSentenceCount = (str) => {
    let sentences = str.match(/\w[.?!](\s|$)/g);
    return sentences ? sentences.length : 0;
  };

  const getParagraphCount = (str) => {
    let paragraphs = str.split(/\r?\n|\r/g).filter((par) => par !== "");
    console.log(paragraphs);
    return paragraphs ? paragraphs.length : 0;
  };

  function* ngrams(a) {
    let buf = [];

    for (let x of a) {
      buf.push(x);
      if (buf.length === 2) {
        yield buf;
        buf.shift();
      }
    }
  }

  const getBigramsCount = () => {
    let bigramsCount = 0;
    let words = getWords(text);
    let allBigrams = new Map();

    if (words) {
      for (let g of ngrams(words)) {
        let temp = g.join(" ");

        if (allBigrams.has(temp)) {
          allBigrams.set(temp, allBigrams.get(temp) + 1);
        } else {
          allBigrams.set(temp, 1);
        }
      }
      allBigrams.forEach((value, key) => {
        if (value === 1) {
          bigramsCount += 1;
        }
      });
    }
    return bigramsCount;
  };

  const getMostFreq = (str) => {
    let max = 0;
    let arrWords = getWords(str);
    if (arrWords) {
      arrWords.forEach((word) => {
        if (wordsMap.has(word)) {
          wordsMap.set(word, wordsMap.get(word) + 1);
        } else {
          wordsMap.set(word, 1);
        }

        let tempVal = wordsMap.get(word);
        if (tempVal > max) {
          max = tempVal;
          mostFreq = word;
        }
      });
    }
    return mostFreq;
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
    getParagraphCount(text);
  };

  return (
    <div className="App">
      <h1>Word Count Challenge</h1>
      <Form style={{ margin: "10px" }}>
        <FormGroup>
          <Label className="input" for="textarea" />
          <textarea
            type="textarea"
            name="text"
            id="textArea"
            value={text}
            onChange={handleChange}
          />
        </FormGroup>
      </Form>

      <CardDeck>
        <StatCard title="Characters" value={charCount}></StatCard>
        <StatCard
          title="Characters excluding spaces"
          value={getCharCount(text)}
        ></StatCard>
      </CardDeck>
      <CardDeck>
        <StatCard title="Words" value={getWordCount(text)}></StatCard>
        <StatCard title="Sentences" value={getSentenceCount(text)}></StatCard>
      </CardDeck>

      <CardDeck>
        <StatCard title="Paragraphs" value={getParagraphCount(text)}></StatCard>
        <StatCard title="Bigrams" value={getBigramsCount()}></StatCard>
      </CardDeck>
      <StatCard title="Most Frequent Word" value={getMostFreq(text)}></StatCard>
    </div>
  );
}

export default App;
