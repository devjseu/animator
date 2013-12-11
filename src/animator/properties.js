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
        if (!properties.x) {
            properties.x = 0;
        }
        if (!properties.y) {
            properties.y = 0;
        }
        if (!properties.z) {
            properties.z = 0;
        }
        return 'translate3d(' + properties.x + 'px, ' + properties.y + 'px, ' + properties.z + 'px)';
    };

    Properties.prototype.getCSSTranslate2d = function () {
        var me = this,
            properties = me._properties;
        return 'translate3d(' + (properties.x || 0) + 'px, ' + (properties.y || 0) + 'px)';
    };

    window.Animator = window.Animator || {};
    window.Animator.Properties = Properties;
}(window));