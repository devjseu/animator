importScripts('/src/animator/bezier.js');
/**
 * worker 1
 */
var Bezier = window.Animator.Bezier;
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

var queryableFunctions = {
    calcValue: function (step, thisFrame, lastFrame) {
        reply("calcValue", calcValue(step, thisFrame, lastFrame));
    }
};

// system functions

function defaultQuery(vMsg) {
    // your default PUBLIC function executed only when main page calls the queryableWorker.postMessage() method directly
    // do something
}

function reply(/* listener name, argument to pass 1, argument to pass 2, etc. etc */) {
    if (arguments.length < 1) {
        throw new TypeError("reply - not enough arguments");
        return;
    }
    postMessage({ "vo42t30": arguments[0], "rnb93qh": Array.prototype.slice.call(arguments, 1) });
}

onmessage = function (oEvent) {
    if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("bk4e1h0") && oEvent.data.hasOwnProperty("ktp3fm1")) {
        queryableFunctions[oEvent.data.bk4e1h0].apply(self, oEvent.data.ktp3fm1);
    } else {
        defaultQuery(oEvent.data);
    }
};