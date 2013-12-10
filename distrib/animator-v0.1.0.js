/*! animator v0.1.0 - 2013-12-10 
 *  License:  */
(function (window, undefined) {
    "use strict";
    /**
     * css functionality tests
     *
     */
    var dom = document.createElement('div'),
        prefixes = '-webkit- -moz- -o- -ms- '.split(' '),
        omPrefixes = 'Webkit Moz O ms ',
        cssomPrefixes = omPrefixes.split(' '),
        available = {
            transform: null,
            transition: null
        },
        has3d = false,
        init;

    function testProperties() {
        var property, t;
        // Add it to the body to get the computed style
        document.body.insertBefore(dom, null);
        /**
         * Transform
         */
        property = "Transform";
        for (t in cssomPrefixes) {
            property = cssomPrefixes[t].length ? property : property.charAt(0).toLowerCase() + property.slice(1);
            if (
                (dom.style[cssomPrefixes[t] + property]) !== undefined
                ) {
                dom.style[cssomPrefixes[t] + property] = 'translate3d(1px,1px,1px)';
                has3d = window.getComputedStyle(dom).getPropertyValue(prefixes[t] + "transform");
                has3d = (has3d !== undefined && has3d.length > 0 && has3d !== "none");
                available.transform = cssomPrefixes[t] + property;
                available.transformCSS = prefixes[t] + "transform";
            }
        }
        /**
         * Transition
         */
        property = "Transition";
        for (t in cssomPrefixes) {
            property = cssomPrefixes[t].length ? property : property.charAt(0).toLowerCase() + property.slice(1);
            if (
                (dom.style[cssomPrefixes[t] + property]) !== undefined
                ) {
                available.transition = cssomPrefixes[t] + property;
                available.transitionCSS = prefixes[t] + "transition";
            }
        }
        document.body.removeChild(dom);
        return true;
    }

    var CSS3 = {
        init: function () {
            init = init || testProperties();
            return this;
        },
        is: function (property) {
            return !!(available[property] !== null);
        },
        get: function (property) {
            return available[property] || property;
        },
        getCSS: function (property) {
            return available[property + "CSS"];
        },
        has3d: function () {
            return has3d;
        }
    };
    window.Animator = window.Animator || {};
    window.Animator.CSS3 = CSS3;

    /**
     * mobile detection
     * @returns {boolean}
     */
    var check = false;

    function isMobile() {
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        if (check) {
            document.documentElement.className += " mobile";
        }
    }

    isMobile();
    window.isMobile = function () {
        return check;
    };
}(window));
/**
 * Paul Irish polyfill for request animation frame
 */
(function (window) {
    var lastTime = 0,
        vendors = ['webkit', 'moz'],
        startTime;
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };

    startTime = (new Date()).getTime();
    window.performance = performance || {};
    window.performance.now = window.performance.now || function () {
        return (new Date()).getTime() - startTime;
    };
}(window));
/*
 The MIT License (MIT)

 Copyright (c) 2013 Sebastian Widelak

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 */
(function (window, undefined) {
    "use strict";
    window.Base = window.Base || (function () {
        function Base() {
            this.set('listeners', {});
            this.set('suspendEvents', false);
            this.bindMethods.apply(this, arguments);
            this.init.apply(this, arguments);
        }

        /**
         * abstract method
         */
        Base.prototype.init = function () {
        };

        /**
         * abstract method
         */
        Base.prototype.initConfig = function () {
        };

        /**
         * binds custom methods from config object to class instance
         */
        Base.prototype.bindMethods = function (initOpts) {
            for (var property in initOpts) {
                if (initOpts.hasOwnProperty(property) && typeof initOpts[property] === 'function') {
                    this[property] = initOpts[property].bind(this);
                }
            }
        };

        /**
         *
         * @param property
         * @param value
         * @returns {*}
         */
        Base.prototype.set = function (property, value) {
            var p = "_" + property,
                oldVal = this[p];
            if (value instanceof Object) {
                this[p] = value;
            } else if (value !== oldVal) {
                this[p] = value;
                this.fireEvent(property + 'Change', this, value, oldVal);
            }
            return this;
        };

        /**
         *
         * @param property
         * @returns {*}
         */
        Base.prototype.get = function (property) {
            return this["_" + property];
        };

        /**
         * fire event
         * @param evName
         * @returns {boolean}
         */
        Base.prototype.fireEvent = function (evName /** param1, ... */) {
            if (!this._suspendEvents)
                return true;
            var ret = true, shift = Array.prototype.shift;
            shift.call(arguments);
            for (var i = 0, li = this._listeners[evName] || [], len = li.length; i < len; i++) {
                if (ret) {
                    ret = li[i].call(shift.apply(arguments), arguments);
                }
            }
            return ret;
        };

        /**
         * fire event
         * @param evName
         * @param callback
         * @returns {this}
         */
        Base.prototype.addListener = function (evName, callback) {
            var listeners = this._listeners[evName] || [];
            listeners.push(callback);
            this._listeners[evName] = listeners;
            return this;
        };

        /**
         * add callback to property change event
         * @param property
         * @param callback
         * @returns {this}
         */
        Base.prototype.onChange = function (property, callback) {
            this.addListener(property + 'Change', callback);
            return this;
        };

        /**
         *
         * unbind callback
         * @param property
         * @param callback
         * @returns {this}
         */
        Base.prototype.unbindOnChange = function (property, callback) {
            var listeners = this._listeners[property + 'Change'] || [];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === callback) {
                    listeners.splice(i, 1);
                }
            }
            this._listeners[property + 'Change'] = listeners;
            return this;
        };

        /**
         * suspend all events
         * @param {Boolean} suspend
         */
        Base.prototype.suspendEvents = function (suspend) {
            suspend = suspend || true;
            this.set('suspendEvents', suspend);
        };

        /**
         * extend passed function
         * @static
         * @param Func
         * @returns {Function}
         */
        Base.extend = function (Func) {
            var Parent = this,
                Class = function () {
                    Func.prototype.constructor.apply(this, arguments);
                };
            for (var method in Parent.prototype) {
                if (Parent.prototype.hasOwnProperty(method)) {
                    Class.prototype[method] = Parent.prototype[method];
                }
            }
            Class.extend = Base.extend;
            return Class;
        };
        return Base;
    }());
}(window));
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
         *
         */
            measureFrames = 0,
        /**
         *
         */
            measureSize = 101,
        idCounter = 0,
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
        workerTask,
        /**
         * CSS polyfill
         */
            CSS3,
        /**
         * animations algorithms
         */
            Bezier,
        Properties;

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
        /**
         * Initialize CSS3 polyfill
         * @type {*}
         */
        CSS3 = (window.Animator.CSS3 && window.Animator.CSS3.init()) || (function () {
            throw new Error("CSS3 polyfill was not found");
        }());

        /**
         * assign global variables to local
         */
        Bezier = window.Animator.Bezier;
        Properties = window.Animator.Properties;

        /**
         * run users callbacks
         */
        for (var i = 0, l = animatorOnReady.length; i < l; i++) {
            animatorOnReady[i]();
        }
    }

    /**
     * calculate current frame rate
     *
     */
    function fpsTick(thisFrame) {
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
        return 1 / (duration / (frame - lastFrame));
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
        if (debug && measureFrames < measureSize)
            Measure.start('frame-' + measureFrames);
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
        if (debug && measureFrames < measureSize)
            Measure.stop('frame-' + measureFrames++);
        if (debug && measureFrames < measureSize)
            Measure.start('frame-' + measureFrames);
        var tmp = tasks,
            time = new Date().getTime();
        tasks = [];
        for (var i = 0, l = tmp.length; i < l; i++) {
            tmp[i](time);
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
        s('id', 'animator-' + idCounter++);
        s('el', el);
        s('elStyle', el.style);
        s('elCSSText', el.style.CSSText);
        s('properties', new Properties(el.style));
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
    Animator.prototype.tick = function animatorTick(thisFrame) {
        var me = this,
        // queue
            queue = me._queue,
            done = me._doneQueue,
            properties = me._properties,
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
            properties.setProperty(step.property, value);
        }
        properties.applyStyle();
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
            measureFrames = 0;
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

    if (window.Animator) {
        for (var key in window.Animator) {
            if (window.Animator.hasOwnProperty(key)) {
                Animator[key] = window.Animator[key];
            }
        }
    }
    window.Animator = Animator;
}(window));
/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */
if(typeof window === 'undefined')
    var window = {};
/**
 * JavaScript port of Webkit implementation of CSS cubic-bezier(p1x.p1y,p2x,p2y) by http://mck.me
 * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
 */
(function (window, undefined) {
    'use strict';


    /**
     * Duration value to use when one is not specified (400ms is a common value).
     * @const
     * @type {number}
     */
    var DEFAULT_DURATION = 400;//ms

    /**
     * The epsilon value we pass to UnitBezier::solve given that the animation is going to run over |dur| seconds.
     * The longer the animation, the more precision we need in the timing function result to avoid ugly discontinuities.
     * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/page/animation/AnimationBase.cpp
     */
    var solveEpsilon = function (duration) {
        return 1.0 / (200.0 * duration);
    };

    /**
     * Defines a cubic-bezier curve given the middle two control points.
     * NOTE: first and last control points are implicitly (0,0) and (1,1).
     * @param p1x {number} X component of control point 1
     * @param p1y {number} Y component of control point 1
     * @param p2x {number} X component of control point 2
     * @param p2y {number} Y component of control point 2
     */
    var unitBezier = function (p1x, p1y, p2x, p2y) {

        // private members --------------------------------------------
        var CACHE = {};

        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).

        /**
         * X component of Bezier coefficient C
         * @const
         * @type {number}
         */
        var cx = 3.0 * p1x;

        /**
         * X component of Bezier coefficient B
         * @const
         * @type {number}
         */
        var bx = 3.0 * (p2x - p1x) - cx;

        /**
         * X component of Bezier coefficient A
         * @const
         * @type {number}
         */
        var ax = 1.0 - cx - bx;

        /**
         * Y component of Bezier coefficient C
         * @const
         * @type {number}
         */
        var cy = 3.0 * p1y;

        /**
         * Y component of Bezier coefficient B
         * @const
         * @type {number}
         */
        var by = 3.0 * (p2y - p1y) - cy;

        /**
         * Y component of Bezier coefficient A
         * @const
         * @type {number}
         */
        var ay = 1.0 - cy - by;

        /**
         * @param t {number} parametric timing value
         * @return {number}
         */
        var sampleCurveX = function (t) {
            // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
            return ((ax * t + bx) * t + cx) * t;
        };

        /**
         * @param t {number} parametric timing value
         * @return {number}
         */
        var sampleCurveY = function (t) {
            return ((ay * t + by) * t + cy) * t;
        };

        /**
         * @param t {number} parametric timing value
         * @return {number}
         */
        var sampleCurveDerivativeX = function (t) {
            return (3.0 * ax * t + 2.0 * bx) * t + cx;
        };

        /**
         * Given an x value, find a parametric value it came from.
         * @param x {number} value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param epsilon {number} accuracy limit of t for the given x
         * @return {number} the t value corresponding to x
         */
        var solveCurveX = function (x, epsilon) {
            var t0;
            var t1;
            var t2;
            var x2;
            var d2;
            var i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < epsilon) {
                    return t2;
                }
                d2 = sampleCurveDerivativeX(t2);
                if (Math.abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }

            // Fall back to the bisection method for reliability.
            t0 = 0.0;
            t1 = 1.0;
            t2 = x;

            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }

            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (Math.abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) * 0.5 + t0;
            }

            // Failure.
            return t2;
        };

        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param epsilon {number} the accuracy of t for the given x
         * @return {number} the y value along the bezier curve
         */
        var solve = function (x, epsilon) {
            return sampleCurveY(solveCurveX(x, epsilon));
        };

        // public interface --------------------------------------------

        /**
         * Find the y of the cubic-bezier for a given x with accuracy determined by the animation duration.
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        return function CubicBezierY(x, duration) {
            return solve(x, solveEpsilon(+duration || DEFAULT_DURATION));
        };
    };

    // http://www.w3.org/TR/css3-transitions/#transition-timing-function
    var Bezier = {
        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        linear: unitBezier(0.0, 0.0, 1.0, 1.0),

        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        ease: unitBezier(0.25, 0.1, 0.25, 1.0),

        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeIn: unitBezier(0.42, 0, 1.0, 1.0),

        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeOut: unitBezier(0, 0, 0.58, 1.0),

        /**
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        easeInOut: unitBezier(0.42, 0, 0.58, 1.0),

        /**
         * @param p1x {number} X component of control point 1
         * @param p1y {number} Y component of control point 1
         * @param p2x {number} X component of control point 2
         * @param p2y {number} Y component of control point 2
         * @param x {number} the value of x along the bezier curve, 0.0 <= x <= 1.0
         * @param duration {number} the duration of the animation in milliseconds
         * @return {number} the y value along the bezier curve
         */
        cubicBezier: function (p1x, p1y, p2x, p2y, x, duration) {
            return unitBezier(p1x, p1y, p2x, p2y)(x, duration);
        }
    };
    window.Animator = window.Animator || {};
    window.Animator.Bezier = Bezier;
})(window);
(function (window, undefined) {
    "use strict";

    var scope = this,
        rules,
        Properties,
        CSS3;

    rules = {
        x: 'transform',
        y: 'transform',
        z: 'transform'
    };

    Properties = Base.extend(function (style) {
        CSS3 = CSS3 || window.Animator.CSS3.init();
        var me = this;
        me.set('properties', {});
        me.set('translateMethod', 'getCSSTranslate' + (CSS3.has3d() ? '3d' : '2d'));
        me.set('style', style);
    });

    /**
     *
     * @param name
     * @param value
     */
    Properties.prototype.setProperty = function (name, value) {
        this._properties[name] = value;
    };

    Properties.prototype.applyStyle = function () {
        var me = this,
            properties = me._properties,
            prefixedRule,
            ruleUpper,
            rule;
        for (var key in properties) {
            if (properties.hasOwnProperty(key)) {
                rule = rules[key];
                prefixedRule = CSS3.get(rule);
                ruleUpper = rule.charAt(0).toUpperCase() + rule.slice(1);
                me._style[prefixedRule] = me['getCSS' + ruleUpper + 'Value']();
            }
        }
    };

    Properties.prototype.getCSSTransformValue = function () {
        var me = this;
        return me[me._translateMethod]();
    };

    Properties.prototype.getCSSTranslate3d = function () {
        var me = this,
            properties = me._properties;
        return 'translate3d(' + (properties.x || 0) + 'px, ' + (properties.y || 0) + 'px, ' + (properties.z || 0) + 'px)';
    };

    Properties.prototype.getCSSTranslate2d = function () {
        var me = this,
            properties = me._properties;
        return 'translate3d(' + (properties.x || 0) + 'px, ' + (properties.y || 0) + 'px)';
    };

    window.Animator = window.Animator || {};
    window.Animator.Properties = Properties;
}(window));
(function (window, undefined) {
    "use strict";

    var measurements = {},
        running = [],
        i = 0;

    window.Measure = {
        start: function (id, description) {
            id = id || 'measure-' + i++;
            measurements[id] = {};
            measurements[id].description = description || "";
            measurements[id].start = performance.now();
            return id;
        },
        stop: function (id) {
            var returned;
            if (id) {
                measurements[id].stop = performance.now();
                measurements[id].duration = measurements[id].stop - measurements[id].start;
                returned = measurements[id];
            } else {
                for (var i = 0, l = running.length; i < l; i++) {
                    var key = running[i];
                    measurements[key].stop = performance.now();
                    measurements[key].duration = measurements[key].stop - measurements[running[i]].start;
                }
                returned = measurements;
            }
            return returned;
        },
        getMeasurements: function () {
            return measurements;
        }
    };
}(window));