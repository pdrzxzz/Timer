class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {

        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause)
    }
    start = () => {
        this.onStart ? this.onStart() : null;
        this.pause(this.interval);
        this.interval = setInterval(this.tick, 1000); //interval is the interval id
    };

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        if (this.timeRemaining > 0) {
            this.onTick ? this.onTick() : null;
            this.timeRemaining -= 1;
        }
        else { //time is over
            this.onComplete ? this.onComplete() : null;
            this.pause();
        }
    }
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}