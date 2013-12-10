var divs = [];
function onReady() {
    "use strict";
    var CSS3 = window.Animator.CSS3,
        Bezier = window.Animator.Bezier;

    var CACHE = {},
        duration = 60000000,
        distance = 3000,
        _thisFrame = 0,
        _lastFrame = 0,
        xFunc = 0,
        start;

    function calcValue(thisFrame, lastFrame) {
        xFunc += calcUnit(duration, thisFrame, lastFrame);
        return start + distance * (CACHE['linear' + xFunc + duration] = (CACHE[xFunc + '' + duration] || Bezier['linear'](xFunc, duration)));
    }

    function calcUnit(duration, frame, lastFrame) {
        return 1 / (duration / (frame - lastFrame))
    }

    setTimeout(function () {
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
            calcValue(_thisFrame, _lastFrame);
            _lastFrame = _thisFrame;
            _thisFrame += 32;
        }
        Measure.stop('Cached');
        // show results in console
        console.dir(Measure.getMeasurements());
    }, 200);
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