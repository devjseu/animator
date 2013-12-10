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