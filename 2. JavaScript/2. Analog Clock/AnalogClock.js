const mainClock = document.querySelector(".analog-clock");

let time = new Date();

let secondDeg = (360 / 60) * time.getSeconds();
let miniteDeg = (360 / 60) * time.getMinutes();
let hourDeg =
  (360 / (60 * 12)) * (Math.abs(12 - time.getHours()) * 60 + time.getMinutes());

const setClock = (domType, property) => {
  const dom = document.createElement(domType);
  Object.keys(property).map((key) => {
    dom[key] = property[key];
  });
  return dom;
};

const AnalogClock = ($container) => {
  const hour = setClock("div", {
    className: "hand hour",
  });
  const minite = setClock("div", {
    className: "hand minute",
  });
  const second = setClock("div", {
    className: "hand second",
  });

  mainClock.append(hour, minite, second);

  for (let i = 1; i <= 12; i++) {
    const time = setClock("div", {
      className: `time time${i}`,
      innerHTML: "|",
    });
    mainClock.appendChild(time);
  }

  setInterval(() => {
    if (secondDeg === 360) {
      secondDeg = 0;
    }
    secondDeg += 360 / 60;
    second.style.setProperty("--deg", secondDeg % 360);

    if (miniteDeg === 360) {
      miniteDeg = 0;
    }
    miniteDeg += 360 / (60 * 60);
    minite.style.setProperty("--deg", miniteDeg % 360);

    if (hourDeg === 360) {
      hourDeg = 0;
    }
    hourDeg += 360 / (60 * 60 * 12);
    hour.style.setProperty("--deg", hourDeg % 360);
  }, 1000);
};

export default AnalogClock;
