import React from 'react';
// the npm package that is used: https://www.npmjs.com/package/reading-time
const readingTime = require('reading-time');

class Stats extends React.Component {
  // returns the amount of words in the current prop text
  wordCount = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    // creates an arr of words
    const splitText = text.trim().split('');
    // returns 0 if there are no words
    if(!splitText.length)
      return 0;
    
    const spaces = splitText.filter(char => char === ' ');
    return (this.props.text.length > 0 && spaces.length === 0) ? 1 : spaces.length+1;
  }

  // returns the amount of letters in the current prop text
  numOfLetters = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    return splitText.join('').length;
  }

  // returns the word with the longest length in the current prop text
  longestWord = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
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

  // returns the average length of the words in the current prop text
  averageWordLength = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const numOfChars = splitText.join('').length;
    return (numOfChars / this.wordCount() > 0) ? (numOfChars / this.wordCount()).toFixed(2) : 0;
  }

  // returns the reading duration in seconds of the current prop text
  readingDuration = () => {
    // replaces everything but letters and numbers with a space
    let text = this.props.text.replace(/[^A-Za-z0-9]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');;
    const stats = readingTime(text);
    return `${(stats.minutes * 60).toFixed(2) > 0 ? (stats.minutes * 60).toFixed(2) : 0} s`;
  }

  // returns the length of the median word of the current prop text
  medianWordLength = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const middle = Math.floor(splitText.length / 2);
    return splitText[middle].length;
  }

  // returns the length of the median word,
  // in the ascending order of length, of the current prop text
  sortedMedianWordLength = () => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    const splitText = text.trim().split(' ');
    const middle = Math.floor(splitText.length / 2);
    // sorts the arr in the ascending order
    const orderedText = splitText.sort((a,b) => a.length - b.length);
    return orderedText[middle].length;
  }

  // returns the top *num* common words in the current prop text
  topCommonWords = (num) => {
    // replaces everything but letters with a space
    let text = this.props.text.replace(/[^A-Za-z]/g, ' ');
    // gets rid of duplicate spaces
    text = text.replace( /  +/g, ' ');
    let splitText = text.trim().split(' ');
    // adds a count value to each word
    splitText = splitText.map((word) => {
      return [word, 0];
    });

    // updates the count of the first repeated occurrence of a word
    for(let i = 0; i < splitText.length; i++) {
      let currWord = splitText[i][0];
      for(let y = 0; y < splitText.length; y++) {
        if(splitText[y][0] === currWord && currWord !== '') {
          splitText[y][1] = splitText[y][1] + 1;
          break;
        }
      }
    }

    // sorts the arr in the descending order of the word count values
    let orderedText = splitText.sort((a,b) => b[1] - a[1]);
    // gets rid of the duplicate words
    orderedText = orderedText.filter(word => word[1] !== 0);
    
    // returns the needed top *num* common words
    let str = '', i = 0;
    while(i < num){
      if(orderedText[i])
        str += `${orderedText[i][0]}, `;
      i++;
    }
    // sets a default value for when there is no words
    return str.match(/[A-Za-z]/g) ? str.slice(0, -2) : '🤷';
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