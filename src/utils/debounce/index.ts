let timeoutID: number;

const debounce = (callback: () => void, delay: number): void => {
  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  timeoutID = window.setTimeout(callback, delay);
};

export default debounce;
