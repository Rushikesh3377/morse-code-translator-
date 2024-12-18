import React, { useState, useEffect, useCallback } from "react";
import "./index.css";
import DarkModeToggle from "react-dark-mode-toggle";

// Sound files 
const dotSound = new Audio("/dot.mp3");
const dashSound = new Audio("/dash.mp3");

// Morse code Dictionary
const morseCodeDict = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", 1: ".----", 2: "..---", 3: "...--",
  4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..",
  9: "----.", 0: "-----",
};

const randomWords = ["HELLO", "WORLD", "MORSE", "CODE", "GAMIFY", "REACT"];

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [gameMorse, setGameMorse] = useState("");
  const [gameWord, setGameWord] = useState("");
  const [gameInput, setGameInput] = useState("");
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    const word = randomWords[Math.floor(Math.random() * randomWords.length)];
    setGameWord(word);
    setGameMorse(textToMorse(word));
    setGameInput("");
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const textToMorse = (text) => {
    let result = "";
    for (let char of text.toUpperCase()) {
      if (morseCodeDict[char]) {
        result += morseCodeDict[char] + " ";
      } else if (char === " ") {
        result += "/ ";
      }
    }
    return result.trim();
  };

  const morseToText = (morse) => {
    const reversedDict = Object.fromEntries(
      Object.entries(morseCodeDict).map(([key, value]) => [value, key])
    );
    return morse
      .split(" ")
      .map((code) => (code === "/" ? " " : reversedDict[code] || ""))
      .join("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (/^[.\-/\s]+$/.test(value)) {
      setOutputText(morseToText(value));
    } else {
      setOutputText(textToMorse(value));
    }
    setInputText(value);
  };

  const playMorseSound = () => {
    const morse = /^[.\-/\s]+$/.test(inputText) ? inputText : textToMorse(inputText);

    let delay = 0;
    for (let char of morse) {
      setTimeout(() => {
        if (char === ".") dotSound.play();
        if (char === "-") dashSound.play();
      }, delay);
      delay += 300;
    }
  };

  const checkGameAnswer = () => {
    if (gameInput.toUpperCase() === gameWord) {
      setScore(score + 1);
      alert("Correct! Starting new round...");
      startGame();
    } else {
      alert("Try Again!");
    }
  };

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <header className="header">
        <h1 className="app-title">Morse Code Translator</h1>
        <div className="dark-mode-toggle">
          <DarkModeToggle
            onChange={setDarkMode}
            checked={darkMode}
            size={60}
          />
        </div>
      </header>

      <main className="main-container">
        <section className="translator-section">
          <textarea
            className="input-area"
            placeholder="Type here (Text or Morse Code)"
            value={inputText}
            onChange={handleInputChange}
          />
          <textarea
            className="output-area"
            placeholder="Output will appear here"
            value={outputText}
            readOnly
          />
          <button onClick={playMorseSound} className="play-button">
            Play Morse Code
          </button>
        </section>

        <section className="game-section">
          <h2>Guess the Word!</h2>
          <p>Translate this Morse Code: <strong>{gameMorse}</strong></p>
          <input
            type="text"
            placeholder="Your Answer"
            value={gameInput}
            onChange={(e) => setGameInput(e.target.value)}
          />
          <button onClick={checkGameAnswer} className="game-submit">
            Submit
          </button>
          <p>Score: {score}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
