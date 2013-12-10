/**
 * Class for animation
 */
(function (window, undefined) {
    "use strict";

    /**
     * time when we start counting fps
     * @type {number}
     */
    var fpsStart = 0,
        /**
         * counted fps in current second
         * @type {Number}
         */
            fpsCounting = 0,
        /**
         * number of fps per second
         * @type {Number}
         */
            fps = 0,
        /**
         * request animation frame id
         */
            reqId = 0,
        /**
         * task thich need to be performed
         */
            tasks = [],
        /**
         * currently running animations
         */
            animations = [],
        /**
         * fps counter is initialized
         * @type {Boolean}
         */
            fpsInit = false,
        /**
         * debug mode
         * @type {Boolean}
         */
            debug = false,
        /**
         * array of callbacks when DOM is ready
         */
            animatorOnReady = [],
        /**
         * content of fps counter
         */
            fpsText,
        /**
         * CSS polyfill
         */
            CSS3,
        Bezier;

    /**
     *
     * @type {Number}
     */
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            onReady();
        }
    }, 10);

    /**
     * run when DOM is ready
     */
    function onReady() {
        Bezier = window.Animator.Bezier;
        CSS3 = (window.CSS3 && window.CSS3.init()) || (function () {
            throw new Error("CSS3 polyfill was not found");
        }());
        for (var i = 0, l = animatorOnReady.length; i < l; i++) {
            animatorOnReady[i]();
        }
    }

    /**
     * calculate current frame rate
     *
     */
    function fpsTick() {
        var thisFrame = new Date().getTime();
        fpsStart = fpsStart || new Date().getTime();
        if (thisFrame - fpsStart >= 1000) {
            fpsStart += 1000;
            fps = fpsCounting;
            fpsCounting = 0;
            fpsText.innerHTML = fps + " fps";
        }
        fpsCounting++;
        if (debug)
            addTaskForFrame(fpsTick);
    }

    /**
     * create placeholder for FPS counter
     *
     */
    function initFps() {
        if (!fpsInit && debug) {
            var body = document.getElementsByTagName('body')[0],
                el = document.createElement('div');
            el.id = "fpsText";
            body.appendChild(el);
            fpsInit = true;
            fpsText = el;
            addTaskForFrame(fpsTick);
        }
    }

    /**
     * recalculate value using Bezier algorithm's
     *
     * @private
     * @param step
     * @param thisFrame
     * @param lastFrame
     * @returns {number}
     */
    function calcValue(step, thisFrame, lastFrame) {
        step.xFunc += calcUnit(step.duration, thisFrame, lastFrame);
        return step.start + step.distance * Bezier[step.easing](step.xFunc, step.duration);
    }

    /**
     *  calculate current unit
     *
     * @param duration
     * @param frame
     * @param lastFrame
     * @returns {number}
     */
    function calcUnit(duration, frame, lastFrame) {
        return 1 / (duration / (frame - lastFrame))
    }

    /**
     * check if queue is empty
     *
     * @param queue
     * @returns {boolean}
     */
    function isQueueEmpty(queue) {
        var empty = true;
        for (var i = 0, l = queue.length; i < l; i++) {
            if (queue[i].length) {
                empty = false;
            }
        }
        return empty;
    }

    /**
     * start animation engine
     *
     */
    function startTicking() {
        reqId = requestAnimationFrame(tick);
    }

    /**
     * stop animation engine
     *
     */
    function stopTicking() {
        cancelAnimationFrame(reqId);
    }

    /**
     * render a frame
     *
     */
    function tick() {
        var tmp = tasks;
        tasks = [];
        for (var i = 0, l = tmp.length; i < l; i++) {
            tmp[i]();
            tmp[i] = null;
        }
        tmp = null;
        reqId = requestAnimationFrame(tick);
    }

    /**
     * add new task which need to be perform
     * between frames
     *
     * @param task
     */
    function addTaskForFrame(task) {
        tasks.push(task);
        if (reqId === 0)
            startTicking();
    }


    /**
     * @constructor
     * @param el
     * @type {Function}
     */
    var Animator = Base.extend(function (el) {
        Base.prototype.constructor.call(this);
        var me = this, s = me.set.bind(me);
        s('el', el);
        s('elStyle', el.style);
        s('elCSSText', el.style.CSSText);
        s('fpsReal', 30);//fps
        s('fpsLen', 1000 / me.get('fpsReal'));
        s('stopped,', undefined);
        s('requestId', 0);
        s('lastFrame', 0);
        s('doneQueue', []);
        s('loops', 0);
        animations.push(this);
    });

    /**
     * start animation
     */
    Animator.prototype.start = function () {
        var m = this,
        // shortcut for setter
            s = this.set.bind(m),
            time = new Date().getTime();
        s('animStart', time);
        s('stopped', false);
        s('lastFrame', time);
        m.suspendEvents(true);
        addTaskForFrame(m.tick.bind(m));
    };

    /**
     * stop animation
     */
    Animator.prototype.stop = function () {
        var me = this;
        if (me.get('requestId')) {
            cancelAnimationFrame(me.get('requestId'));
        }
        me.suspendEvents(false);
        me.set('stopped', true);
    };

    /**
     * assign animation steps
     * @param props
     * @returns {*}
     */
    Animator.prototype.steps = function (props) {
        if (typeof props === 'string')
            throw new Error('string passed as property object');
        var l = props.length,
            q = [];
        if (l) {
            for (var i = 0; i < l; i++) {
                for (var key in props[i]) {
                    if (props[i].hasOwnProperty(key)) {
                        if (q[props[i][key].path] === undefined) {
                            q[props[i][key].path] = [];
                        }
                        props[i][key].property = key;
                        props[i][key].xFunc = 0;
                        props[i][key].easing = props[i][key].easing || "linear";
                        if (i > 0) {
                            props[i][key].start = props[i - 1][key].value;
                            props[i][key].distance = props[i][key].value - props[i - 1][key].value;
                        } else {
                            props[i][key].start = 0;
                            props[i][key].distance = props[i][key].value;
                        }
                        q[props[i][key].path].push(props[i][key]);
                    }
                }
            }
            this.set('queue', q);
        } else {
            this.set('queue', props);
        }
        return this;
    };

    /**
     * do in each request animation frame
     */
    Animator.prototype.tick = function animatorTick() {
        var me = this,
        // current frame time
            thisFrame = new Date().getTime(),
        // queue
            queue = me._queue,
            done = me._doneQueue,
            value = 0,
            step;
        // recalculate unit for each animation
        for (var i = 0, l = queue.length; i < l; i++) {
            if (!queue[i].length) {
                continue;
            }
            step = queue[i][0];
            step.startTime = step.startTime || thisFrame;
            if ((thisFrame - step.startTime) < (step.delay || 0)) {
                continue;
            }
            value = calcValue(step, thisFrame, me._lastFrame);
            if (step.xFunc >= 1) {
                value = step.value;
                step.xFunc = 0;
                if (!me._doneQueue[i]) {
                    me._doneQueue[i] = [];
                }
                done[i].push(queue[i].shift());
            }
            me._elStyle[CSS3.get('transform')] = 'translate3d(' + value + 'px, 0px, 0px)';
        }
        // set when last frame occurred
        me._lastFrame = thisFrame;
        if (!isQueueEmpty(queue)) {
            addTaskForFrame(me.tick.bind(me));
        } else {
            if (typeof me._loops === 'string' && me._loops === 'infinity') {
                me._queue = me._doneQueue;
                me._doneQueue = [];
                addTaskForFrame(me.tick.bind(me));
            } else {
                if (me._loops === 0 || me._loops === undefined) {
                    me.stop();
                } else {
                    --me._loops;
                    me._queue = me._doneQueue;
                    me._doneQueue = [];
                    addTaskForFrame(me.tick.bind(me));
                }
            }
        }
    };

    /**
     * set number of repeats
     * @param loops
     * @returns {*}
     */
    Animator.prototype.repeat = function (loops) {
        this.set('loops', loops);
        return this;
    };

    /**
     * static function to animate element
     * @param el
     * @param prop
     * @param loops
     */
    Animator.animate = function (el, prop, loops) {
        (new Animator(el))
            .steps(prop)
            .repeat(loops)
            .start();
    };

    /**
     * static function to turn on debug mode
     * shows FPS counter
     */
    Animator.toggleDebug = function () {
        if (debug) {
            debug = false;
            fpsInit = false;
            fpsText.parentNode.removeChild(fpsText);
        } else {
            debug = true;
            initFps();
        }
    };

    /**
     * stop all animations
     */
    Animator.stop = function () {
        for (var i = 0, l = animations.length; i < l; i++) {
            animations[i].stop();
        }
        stopTicking();
    };

    Animator.onReady = function (callback) {
        animatorOnReady.push(callback.bind(this));
    };

    window.Animator = Animator;
}(window));