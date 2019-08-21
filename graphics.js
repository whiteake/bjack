/**
 * graphics.js - (Almost) accurate Implementation of java.awt.Graphics2D in
 * JavaScript (c) 2015-2016 DarkCart
 */

var canvas, ctx;

function Graphics(cwidth, cheight) {
    canvas = document.createElement("canvas");
    canvas.width = cwidth;
    canvas.height = cheight;
    this.canvas = canvas;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    this.ctx = ctx;
}

Graphics.prototype.setColor = function (color) {
    ctx.fillStyle = color;
},
    Graphics.prototype.drawRect = function (x, y, width, height) {
        ctx.strokeRect(x, y, width, height);
    },
    Graphics.prototype.fillRect = function (x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    },
    Graphics.prototype.fillOval = function (x, y, w, h) {
        var kappa = .5522848,
            ox = (w / 2) * kappa, // control point offset horizontal
            oy = (h / 2) * kappa, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
        //ctx.closePath(); // not used correctly, see comments (use to close off open path)
        ctx.fill();
    },
    // TODO: Make this method work
    Graphics.prototype.drawImage = function (imgSrc, x, y) {
        var img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            ctx.drawImage(img, x, y);
        }
    },
    Graphics.prototype.drawLine = function (startx, starty, endx, endy) {
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.lineTo(endx, endy);
        ctx.stroke();
    },
    Graphics.prototype.setFont = function (font) {
        ctx.font = font;
    },
    Graphics.prototype.drawString = function (string, x, y) {
        ctx.fillText(string, x, y);
    },
    Graphics.prototype.getColor = function () {
        return ctx.fillStyle;
    },
    Graphics.prototype.getFont = function () {
        return ctx.font;
    },
    Graphics.prototype.scale = function (x, y) {
        ctx.scale(x, y);
    },
    Graphics.prototype.rotate = function (deg) {
        ctx.rotate(deg * Math.PI / 180);
    },
    Graphics.prototype.translate = function (x, y) {
        ctx.translate(x, y);
    },
    Graphics.prototype.getStringWidth = function (text) {
        return Math.floor(ctx.measureText(text).width);
    },
    Graphics.prototype.drawPolygon = function (poly) {
        ctx.beginPath();
        ctx.moveTo(poly[0], poly[1]);
        for (item = 2; item < poly.length - 1; item += 2) { ctx.lineTo(poly[item], poly[item + 1]) }
        ctx.closePath();
        ctx.fill();
    },
    Graphics.prototype.setLineWidth = function (nwidth) {
        ctx.lineWidth = nwidth;
    }
