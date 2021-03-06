export const wordCount = (text) => {
    return {
      // action
      type: 'WORD_COUNT',
      payload: {
        count: text.length
      }
    };
  };