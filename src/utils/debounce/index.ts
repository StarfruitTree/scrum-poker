interface callback {
  (): void;
}

let timeoutID: number;

const debounce = (callback: callback, delay: number): void => {
  if (timeoutID) {
    clearTimeout(timeoutID);
  }

  timeoutID = window.setTimeout(callback, delay);
};

export default debounce;
