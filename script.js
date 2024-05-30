let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startButton.disabled = true;
        pauseButton.disabled = false;
        stopButton.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function stop() {
    clearInterval(tInterval);
    running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    startTime = 0;
    lapCounter = 0;
    display.innerHTML = '00:00:00.00';
    lapsContainer.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
}

function recordLap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
