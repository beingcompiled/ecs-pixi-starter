import { Signal } from 'signals'

export default class Loop {
    
    constructor(stats) { 
        this.previousTime = 0
        this.ticked = new Signal()
        this.request = null
        this.stats = stats
    }

    start() {
        this.request = requestAnimationFrame(this.tick.bind(this));
    }
    
    stop() {
        cancelRequestAnimationFrame(this.request);
    }

    add(listener, context) {
        this.ticked.add(listener, context);
    }

    remove(listener, context) {
        this.ticked.remove(listener, context);
    }

    tick(timestamp) {
        if (this.stats) {
            this.stats.begin();
        }

        timestamp = timestamp || Date.now();
        var tmp = this.previousTime || timestamp;
        this.previousTime = timestamp;
        var delta = (timestamp - tmp) * 0.001;
        this.ticked.dispatch(delta);
        requestAnimationFrame(this.tick.bind(this));

        if (this.stats) {
            this.stats.end();
        }
    }
}