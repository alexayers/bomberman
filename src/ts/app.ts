import {Bomberman} from "./app/bomberman";
require('../css/main.css');

var bomberman : Bomberman;

window.onload = () => {
    bomberman  = new Bomberman();
    bomberman.init();
    bomberman.resize();
};

window.onresize = function() {
    bomberman.resize();
};