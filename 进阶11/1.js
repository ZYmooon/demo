window.jQuery = function (selector) {
    var array = [];

    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        array.push(elements[i])
    }
    array.on = function (eventType, fn) {
        for (var i = 0; i < array.length; i++) {
            array[i].addEventListener('click', fn)
        }
    };
    array.addClass = function (className) {
        for (var i = 0; i < array.length; i++) {
            array[i].classList.add(className)
        }
    };
    array.removeClass = function (className) {
        for (var i = 0; i < array.length; i++) {
            array[i].classList.remove(className)
        }
    };
    array.toggleClass = function (className) {
        for (var i = 0; i < array.length; i++) {
            array[i].classList.toggle(className)
        }
    };
    array.text = function () {
    };
    array.html = function () {
    };

    return array
};
window.$ = window.jQuery;












