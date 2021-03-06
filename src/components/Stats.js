import React from 'react';

class Stats extends React.Component {
  wordCount = () => {
    const splitText = this.props.text.trim().split('');
    if(!splitText.length)
      return 0;

    const spaces = splitText.filter(char => char === ' ');
    return (this.props.text.length > 0 && spaces.length === 0) ? 1 : spaces.length+1;
  }
  
  numOfLetters = () => {
    const splitText = this.props.text.trim().split(' ');
    return splitText.join('').length;
  }

  longestWord = () => {
    const splitText = this.props.text.trim().split(' ');
    let longest = 0;
    splitText.forEach(word => {
      longest = word.length > longest ? word.length : longest;
    });
    return longest;
  }

  averageWordLength = () => {
    const splitText = this.props.text.trim().split(' ');
    const numOfChars = splitText.join('').length;
    return (numOfChars / this.wordCount() > 0) ? (numOfChars / this.wordCount()).toFixed(2) : 0;
  }

  render() {
  const functions = [
    {name: 'Word Count', value: this.wordCount()},
    {name: 'Number of Letters', value: this.numOfLetters()},
    {name: 'Longest Word Length', value: this.longestWord()},
    {name: 'Average Word Length', value: this.averageWordLength()}
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