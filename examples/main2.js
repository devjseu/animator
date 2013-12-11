var divs = [];
function onReady() {
    "use strict";
    var CSS3 = window.Animator.CSS3,
        Bezier = window.Animator.Bezier;

    var CACHE = {},
        CACHE2 = {},
    //last save : 5000000
        duration = 6200000,
        distance = 3000,
        _thisFrame = 0,
        _lastFrame = 0,
        xFunc = 0,
        start,
        task;

    function calcValue(thisFrame, lastFrame) {
//        xFunc += Math.round(calcUnit(duration, thisFrame, lastFrame) * 100000) / 100000;
        xFunc += calcUnit(duration, thisFrame, lastFrame);
        CACHE['linear' + xFunc + duration] = Bezier['linear'](xFunc, duration);
        return start + distance * CACHE['linear' + xFunc + duration];
    }

    function calcValueCached(thisFrame, lastFrame) {
//        xFunc += Math.round(calcUnit(duration, thisFrame, lastFrame) * 100000) / 100000;
        xFunc += calcUnit(duration, thisFrame, lastFrame);
        if (!CACHE['linear' + xFunc + duration]) {
            CACHE['linear' + xFunc + duration] = Bezier['linear'](xFunc, duration);
        }
        return start + distance * CACHE['linear' + xFunc + duration];
    }

    function calcValueRounded(thisFrame, lastFrame) {
        xFunc += Math.round(calcUnit(duration, thisFrame, lastFrame) * 100000) / 100000;
//        xFunc += calcUnit(duration, thisFrame, lastFrame);
        CACHE2['linear' + xFunc + duration] = Bezier['linear'](xFunc, duration);
        return start + distance * CACHE2['linear' + xFunc + duration];
    }

    function calcValueRoundedCached(thisFrame, lastFrame) {
        xFunc += Math.round(calcUnit(duration, thisFrame, lastFrame) * 100000) / 100000;
//        xFunc += calcUnit(duration, thisFrame, lastFrame);

        if (!CACHE2['linear' + xFunc + duration]) {
            CACHE2['linear' + xFunc + duration] = Bezier['linear'](xFunc, duration);
        }
//        CACHE2['linear' + xFunc + duration] = CACHE2['linear' + xFunc + duration] || Bezier['linear'](xFunc, duration);
        return start + distance * CACHE2['linear' + xFunc + duration];
    }

    function calcUnit(duration, frame, lastFrame) {
        return 1 / (duration / (frame - lastFrame))
    }

    function stopTests() {
        clearInterval(id);
    }

    window.stopTests = stopTests;

    var id = setInterval(function () {
        /**
         * test 1
         */
        start = +new Date;
        _thisFrame = start;
        _lastFrame = _thisFrame;
        Measure.start('NonCached');
        while (xFunc <= 1) {
            calcValue(_thisFrame, _lastFrame);
            _lastFrame = _thisFrame;
            _thisFrame += 32;
        }
        Measure.stop('NonCached');
        xFunc = 0;

        /**
         * test 2
         */

        _thisFrame = start;
        _lastFrame = _thisFrame;
        Measure.start('Cached');
        while (xFunc <= 1) {
            calcValueCached(_thisFrame, _lastFrame);
            _lastFrame = _thisFrame;
            _thisFrame += 32;
        }
        Measure.stop('Cached');
        xFunc = 0;
        // show results in console
        console.log('Not rounded - Non cached: ' + Measure.getMeasurements().NonCached.duration, '| Cached: ' + Measure.getMeasurements().Cached.duration);

        /**
         * test 3
         */
        CACHE = {};
        start = +new Date;
        _thisFrame = start;
        _lastFrame = _thisFrame;
        Measure.start('NonCachedRounded');
        while (xFunc <= 1) {
            calcValueRounded(_thisFrame, _lastFrame);
            _lastFrame = _thisFrame;
            _thisFrame += 32;
        }
        Measure.stop('NonCachedRounded');
        xFunc = 0;

        /**
         * test 4
         */

        _thisFrame = start;
        _lastFrame = _thisFrame;
        Measure.start('CachedRounded');
        while (xFunc <= 1) {
            calcValueRoundedCached(_thisFrame, _lastFrame);
            _lastFrame = _thisFrame;
            _thisFrame += 32;
        }
        Measure.stop('CachedRounded');
        xFunc = 0;
        // show results in console
        console.log('Rounded     - Non cached: ' + Measure.getMeasurements().NonCachedRounded.duration, '| Cached: ' + Measure.getMeasurements().CachedRounded.duration);

        /**
         * test 5
         */
//        task = new WorkerQueryable('../src/worker.js');
//        Measure.start('NonCachedRoundedWorker');
//        var counter = 0;
//        while (xFunc <= 1) {
//            counter++;
//            xFunc += calcUnit(duration, _thisFrame, _lastFrame);
//            task.sendQuery('calcValue', {
//                duration: duration,
//                xFunc: xFunc,
//                easing: 'linear'
//            });
//            calcValueRounded(_thisFrame, _lastFrame);
//            _lastFrame = _thisFrame;
//            _thisFrame += 32;
//        }
//        Measure.stop('NonCachedRoundedWorker');
//        xFunc = 0;


    }, 2000);


//    Animator.animate(window.kw2, [
//        {x: {delay: 100, duration: 1000, value: 1030, path: 0, easing: "ease"}},
//        {x: {delay: 0, duration: 1000, value: 0, path: 0, easing: "ease"}},
//        {x: {delay: 500, duration: 1000, value: 700, path: 0, easing: "linear"}},
//        {x: {delay: 100, duration: 2000, value: 0, path: 0, easing: "ease"}}
//    ], 'infinity');
    //run();

}

Animator.onReady(onReady);
/**=============================================*/

function createTest() {
    for (var i = 2; i < 5000; i++) {
        var div = document.createElement('div');
        div.className = "kw";
        div.id = "kw" + i;
        div.style.backgroundColor = '#' + ('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6);
        div.style.top = (0.5 * (i - 1)) + "px";
        tor.appendChild(div);
        divs.push(div);
    }
}