(function (window, undefined) {
    "use strict";

    var Properties = Base.extend(function (){
        var me = this;
        me.set('properties', {});
    });



    Properties.prototype.applyStyle = function () {

    };


    window.Animator = window.Animator || {};
    window.Animator.Properties = Properties;
}(window));