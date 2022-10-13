

export const TimerHandle = (test) => {
  var count = Number(test);
  var counter = null;

  window.onload = function() {
    initCounter();
    };

    function initCounter() {
    // get count from localStorage, or set to initial value of 1000
    count = getLocalStorage('count');

  console.log(timer)

    counter = setInterval(timer, 1000); //1000 will run it every 1 second
    }

    function setLocalStorage(key, val) {
    if (window.localStorage) {
        window.localStorage.setItem(key, val);
    }

    return val;
    }

    function getLocalStorage(key) {
    return window.localStorage ? window.localStorage.getItem(key) : '';
    }

    function timer() {
    count = setLocalStorage('count',  count - 1);
    if (Number(count) < 0) {
        clearInterval(counter);
        window.localStorage.removeItem('count');
        return;
    }
  }
}