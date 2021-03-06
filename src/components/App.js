import React, { useState } from 'react';
import Stats from './Stats';

const App = () => {
  const [propText, setPropText] = useState('');
  const [text, setText] = useState('');

  return (
      <div className="container">
        <h1>Text Analyzer</h1>
        <h4>Analyze your text in one click.</h4>
        <textarea onChange={(e)=> setText(e.target.value)} value={text} placeholder="Enter your text..."></textarea>
        <button onClick={() => setPropText(text)}>Analyze</button>
        <Stats text={propText}/>
      </div>
  );
};

export default App;