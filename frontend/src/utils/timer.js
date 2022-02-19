export default function AdjustingInterval(workFunc, interval, errorFunc) {
  const that = this;
  let expected, timeout;
  this.interval = interval;

  this.start = function () {
    expected = Date.now() + this.interval;
    timeout = setTimeout(step, this.interval);
  };

  this.stop = function () {
    clearTimeout(timeout);
  };

  function step() {
    const drift = Date.now() - expected;
    if (drift > that.interval) {
      // You could have some default stuff here too...
      if (errorFunc) errorFunc();
    }
    workFunc();
    expected += that.interval;
    timeout = setTimeout(step, Math.max(0, that.interval - drift));
  }
}
