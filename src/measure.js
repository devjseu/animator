(function (window, undefined) {
    "use strict";

    var measurements = {},
        startTime = (new Date).getTime(),
        running = [],
        i = 0;
    window.performance = performance || {};
    window.performance.now = window.performance.now || function () {
        return (new Date).getTime() - startTime;
    };
    window.Measure = {
        start: function (id) {
            id = id || 'measure-' + i++;
            measurements[id] = {};
            measurements[id].start = performance.now();
            return id;
        },
        stop: function (id) {
            var returned;
            if (id) {
                measurements[id].stop = performance.now();
                returned = measurements[id].duration = measurements[id].stop - measurements[id];
            } else {
                returned = [];
                for (var i = 0, l = running.length; i < l; i++) {
                    var key = running[i];
                    measurements[key].stop = performance.now();
                    measurements[key].duration = measurements[key].stop - measurements[running[i]];
                    returned.push(measurements[running[i]]);
                }
            }
            return returned;
        },
        getMeasurements: function () {
            return measurements;
        }
    };
}(window));