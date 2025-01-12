(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    "use strict";
    /* globals createjs, document, window */
    var manifest = require("./manifest");
    
    var loader = new createjs.LoadQueue(false, "./");
    var FONT_SIZE = 16;
    
    var isMobile = /iphone|ipad|ipod|ios|iemobile|mobile/i.test(navigator.userAgent);
    var canvas = document.getElementById("color-memory");
    canvas.width = Math.min(canvas.width, window.innerWidth);
    canvas.height = isMobile ? window.innerHeight : canvas.height;
    
    var ctx = canvas.getContext("2d");
    var barWidth = ~~(canvas.width * 0.8);
    var barHeight = 5;
    var centerX = ~~(canvas.height * 0.5);
    var margin = ~~(canvas.width * 0.1);
    
    loader.on("progress", drawBar);
    loader.on("complete", function(){
        require("game")(loader);
    });
    
    function drawBar(event){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.width;
    
        ctx.font = FONT_SIZE + "px Arial";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(60, 98, 167, 1)";
        ctx.fillRect(margin, centerX, barWidth*event.progress, barHeight);
        ctx.fillStyle = "white";
        ctx.fillText(~~(event.progress * 100)+"%",
                    ~~(canvas.width * 0.5), 
                    centerX + barHeight + FONT_SIZE);
    }
    
    drawBar({progress: 0});
    
    loader.loadManifest(manifest);
    
    },{"./manifest":2,"game":undefined}],2:[function(require,module,exports){
    "use strict";
    module.exports = [
        // script for the game
        {src: "js/webfontloader.js"},
        {src: "js/easeljs.js"},
        {src: "js/howler.min.js"},
        {src: "js/tweenjs.js"},
        {src: "js/build.js"},
    
        {id: "config", src: "game.config.json"},
        {id: "sound-on", src: "images/sound-on.png"},
        {id: "sound-off", src: "images/sound-off.png"},
        {id: "display", src: "images/display.png"},
        {id: "background", src: "images/background.png"},
        {id: 'back-button',  src: "images/back-button.png"},
        {id: 'button-light',  src: "images/light.png"}
    ];
    },{}]},{},[1]);
    