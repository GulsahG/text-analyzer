import React from 'react';
// the npm package that is used: https://www.npmjs.com/package/reading-time
const readingTime = require('reading-time');

class Stats extends React.Component {
  wordCount = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split('');
    if(!splitText.length)
      return 0;

    const spaces = splitText.filter(char => char === ' ');
    return (this.props.text.length > 0 && spaces.length === 0) ? 1 : spaces.length+1;
  }
  
  numOfLetters = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    return splitText.join('').length;
  }

  longestWord = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    let longest = 0, longestWord = '🤷';
    splitText.forEach(word => {
      if(word.length > longest) {
        longest = word.length;
        longestWord = word;
      }
    });
    return longestWord;
  }

  averageWordLength = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const numOfChars = splitText.join('').length;
    return (numOfChars / this.wordCount() > 0) ? (numOfChars / this.wordCount()).toFixed(2) : 0;
  }

  readingDuration = () => {
    let text = this.props.text.replace(/[^A-Za-z0-9]/g, ' ');
    text = text.replace( /  +/g, ' ');;
    const stats = readingTime(text);
    return `${(stats.minutes * 60).toFixed(2) > 0 ? (stats.minutes * 60).toFixed(2) : 0} s`;
  }

  medianWordLength = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const middle = Math.floor(splitText.length / 2);
    return splitText[middle].length;
  }

  sortedMedianWordLength = () => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const middle = Math.floor(splitText.length / 2);
    const orderedText = splitText.sort((a,b) => a.length - b.length);
    return orderedText[middle].length;
  }

  // the num of words needed can be implemented
  topCommonWords = (num) => {
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    text = text.replace( /  +/g, ' ');
    let splitText = text.trim().split(' ');
    splitText = splitText.map((word) => {
      return [word, 0];
    });

    for(let i = 0; i < splitText.length; i++) {
      let currWord = splitText[i][0];
      for(let y = 0; y < splitText.length; y++) {
        if(splitText[y][0] === currWord && currWord !== '') {
          splitText[y][1] = splitText[y][1] + 1;
          break;
        }
      }
    }

    let orderedText = splitText.sort((a,b) => b[1] - a[1]);
    orderedText = orderedText.filter(word => word[1] !== 0);
    
    let str = '', i = 0;
    while(i < num){
      if(orderedText[i])
        str += `${orderedText[i][0]}, `;
      i++;
    }
    return str !== ' ' ? str.slice(0, -2) : '🤷';
  }

  render() {
  const functions = [
    {name: 'Word Count', value: this.wordCount()},
    {name: 'Number of Letters', value: this.numOfLetters()},
    {name: 'Longest Word', value: this.longestWord()},
    {name: 'Average Word Length', value: this.averageWordLength()},
    {name: 'Reading Duration', value: this.readingDuration()},
    {name: 'Median Word Length', value: this.medianWordLength()},
    {name: 'Sorted Median Word Length', value: this.sortedMedianWordLength()},
    {name: 'Top 5 Common Words', value: this.topCommonWords(5)}
  ]
  
    return(
      <div className="stats-container">
        {
          functions.map((func) => {
            return(   
              <div key={func.name}>
                <hr />
                <div className="stats-line">
                  <h4>{func.name}</h4>
                  <h5>{func.value}</h5>
                </div>
              </div>
            );
          })
        }
        <hr />
      </div>
    );
  }
};


export default Stats;