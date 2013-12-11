var divs = [];
function onReady() {
    "use strict";
    var kw1 = window.kw1;
    //canvas.canvasifyImages();
    createTest();
    Animator.toggleDebug();
    setTimeout(function () {
        Measure.start('test1CreateElements', 'create all needed elements for test 1');
        for (var i = 0, l = divs.length; i < l; i++) {
            Animator
                .animate(divs[i], [
                    {
                        delay: Math.floor(Math.random() * 101) * 10,
                        duration: Math.floor(Math.random() * 10001),
                        value: tor.offsetWidth,
                        path: 0,
                        easing: "easeOut",
                        properties: ['x', 'y']
                    },
                    {
                        delay: Math.floor(Math.random() * 101) * 10,
                        duration: Math.floor(Math.random() * 10001),
                        value: 0,
                        path: 0,
                        easing: "easeOut",
                        properties: ['x', 'y']
                    }//,
//                {
//                    delay: Math.floor(Math.random() * 101) * 10,
//                    duration: Math.floor(Math.random() * 10001),
//                    value: tor.offsetHeight,
//                    path: 1,
//                    easing: "easeIn",
//                    properties: ['y']
//                }
                ], 'infinity')
                .beforeStart()
                .afterEnd();
        }
        Measure.stop('test1CreateElements');
    }, 200);

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