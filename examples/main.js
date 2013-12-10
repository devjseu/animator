var divs = [];
function onReady() {
    "use strict";
    var kw1 = window.kw1;
    //canvas.canvasifyImages();
    createTest();
    Animator.toggleDebug();
    setTimeout(function () {
        for (var i = 0, l = divs.length; i < l; i++) {
            Animator.animate(divs[i], [
                {
                    x: {
                        delay: Math.floor(Math.random() * 101) * 10, duration: Math.floor(Math.random() * 10001),
                        value: 1030,
                        path: 0,
                        easing: "linear"
                    }
                }
            ], 'infinity');
        }
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
    for (var i = 2; i < 500; i++) {
        var div = document.createElement('div');
        div.className = "kw";
        div.id = "kw" + i;
        div.style.backgroundColor = '#' + ('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6);
        div.style.top = (0.5 * (i - 1)) + "px";
        tor.appendChild(div);
        divs.push(div);
    }
}