/*
 WorkerQueryable instances methods:
 * sendQuery(queryable function name, argument to pass 1, argument to pass 2, etc. etc): calls a Worker's queryable function
 * postMessage(string or JSON Data): see Worker.prototype.postMessage()
 * terminate(): terminates the Worker
 * addListener(name, function): adds a listener
 * removeListener(name): removes a listener
 WorkerQueryable instances properties:
 * defaultListener: the default listener executed only when the Worker calls the postMessage() function directly
 */
function WorkerQueryable(sURL, fDefListener, fOnError) {
    var oInstance = this, oWorker = new Worker(sURL), oListeners = {};
    this.defaultListener = fDefListener || function () {
    };
    oWorker.onmessage = function (oEvent) {
        if (oEvent.data instanceof Object && oEvent.data.hasOwnProperty("vo42t30") && oEvent.data.hasOwnProperty("rnb93qh")) {
            if (oListeners[oEvent.data.vo42t30])
                oListeners[oEvent.data.vo42t30].apply(oInstance, oEvent.data.rnb93qh);
        } else {
            this.defaultListener.call(oInstance, oEvent.data);
        }
    };
    if (fOnError) {
        oWorker.onerror = fOnError;
    }
    this.sendQuery = function (/* queryable function name, argument to pass 1, argument to pass 2, etc. etc */) {
        var args = arguments;
        if (args.length < 1) {
            throw new TypeError("WorkerQueryable.sendQuery - not enough arguments");
            return;
        }
        if (typeof args[args.length - 1] === 'function') {
            var callback = Array.prototype.pop.call(args);
            var scope = function () {
                oWorker.onmessage = function (oEvent) {
                    callback.apply(null, oEvent.data.rnb93qh);
                };
                oWorker.postMessage({ "bk4e1h0": args[0], "ktp3fm1": Array.prototype.slice.call(args, 1) });
            };
            scope();
        }
        oWorker.postMessage({ "bk4e1h0": args[0], "ktp3fm1": Array.prototype.slice.call(args, 1) });
    };
    this.postMessage = function (vMsg) {
        //I just think there is no need to use call() method
        //how about just oWorker.postMessage(vMsg);
        //the same situation with terminate
        //well,just a little faster,no search up the prototye chain
        Worker.prototype.postMessage.call(oWorker, vMsg);
    };
    this.terminate = function () {
        Worker.prototype.terminate.call(oWorker);
    };
    this.addListener = function (sName, fListener) {
        oListeners[sName] = fListener;
    };
    this.removeListener = function (sName) {
        delete oListeners[sName];
    };
};