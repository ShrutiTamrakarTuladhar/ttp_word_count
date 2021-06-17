import "./App.css";
import React, { useState } from "react";
import { Button, FormGroup, Label, Input, Form, Row } from "reactstrap";
import StatCard from "./components/StatCard";

function App() {
  const wordsMap = new Map();
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

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

  // TODO: off by one - check
  const getSentanceCount = (str) => {
    let sentances = str.match(/[.!?]\s{1,2}/g);
    return sentances ? sentances.length : 0;
  };

  // TODO: off by one - check
  const getParagraphCount = (str) => {
    let paragraphs = str.split(/\r?\n|\r/g);
    return paragraphs ? paragraphs.length : 0;
  };

  const getWordMap = (str) => {
    let arrWords = getWords(str);
    if (arrWords) {
      arrWords.forEach((word) => {
        if (wordsMap.has(word)) {
          wordsMap.set(word, wordsMap.get(word) + 1);
        } else {
          wordsMap.set(word, 1);
        }
      });
    }
    return wordsMap;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("characters count ", text.length);
    console.log("words count ", getWordCount(text));
    console.log("sentances count ", getSentanceCount(text));
    console.log("paragraph count ", getParagraphCount(text));
    console.log("character count without whitespaces ", getCharCount(text));
    console.log("the frequnce of each word is ", getWordMap(text));
    console.log(getBigramsCount());
  };

  const handleChange = (e) => {
    setText(e.target.value);
    setCharCount(e.target.value.length);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="textArea" />
          <Input
            type="textarea"
            name="text"
            id="textArea"
            value={text}
            onChange={handleChange}
          />
        </FormGroup>
      </Form>

      <Row>
        <StatCard title="Character Count" value={text.length}></StatCard>
        <StatCard
          title="Character without whitespaces Count"
          value={getCharCount(text)}
        ></StatCard>
        <StatCard title="Word Count" value={getWordCount(text)}></StatCard>
      </Row>
      <Row>
        <StatCard
          title="Paragraph Count"
          value={getSentanceCount(text)}
        ></StatCard>
        <StatCard title="Bigrams Count" value={getBigramsCount()}></StatCard>
        {/* TODO: Will need to be changed later */}
        <StatCard title="Word Frequnce" value={getWordMap(text)}></StatCard>
      </Row>
    </div>
  );
}

export default App;
