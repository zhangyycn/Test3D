var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite3DLoad_1 = require("./script/Sprite3DLoad");
var Main = /** @class */ (function () {
    function Main() {
        //new TransformDemo();
        new Sprite3DLoad_1.default();
        //new MaterialAnimation();
    }
    return Main;
}());
//激活启动类
new Main();
},{"./script/Sprite3DLoad":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveScript_1 = require("./common/CameraMoveScript");
var Sprite3DLoad = /** @class */ (function () {
    function Sprite3DLoad() {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        Laya.Stat.show();
        var scene = Laya.stage.addChild(new Laya.Scene3D());
        scene.ambientColor = new Laya.Vector3(1, 1, 1);
        var camera = scene.addChild(new Laya.Camera(0, 0.1, 100));
        camera.transform.translate(new Laya.Vector3(0, 0.5, 1));
        camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        camera.addComponent(CameraMoveScript_1.default);
        Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(null, function (sprite) {
            scene.addChild(sprite);
        }));
    }
    return Sprite3DLoad;
}());
exports.default = Sprite3DLoad;
/*
export default class Sprite3DLoad {
    private scene: Laya.Scene3D;
    private camera: Laya.Camera;
    private directionLight: Laya.DirectionLight;
    private role: Laya.MeshSprite3D;
    private position:Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private rotate:Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    private scale:Laya.Vector3 = new Laya.Vector3();
    private scaleDelta:number = 0;
    private scaleValue:number = 0;

    constructor() {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;

        this.scene = new Laya.Scene3D();
        Laya.stage.addChild(this.scene);

        this.camera = new Laya.Camera(0, 0.1, 100);
        this.scene.addChild(this.camera);
        this.camera.transform.translate(new Laya.Vector3(0, 0.8, 5));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);

        this.directionLight= new Laya.DirectionLight();
        this.scene.addChild(this.directionLight);
        this.directionLight.color = new Laya.Vector3(1, 1, 1);
        this.directionLight.transform.rotate(new Laya.Vector3( -3.14 / 3, 0, 0));

        //灯光开启阴影
        this.directionLight.shadow = true;
        //可见阴影距离
        this.directionLight.shadowDistance = 3;
        //生成阴影贴图尺寸
        this.directionLight.shadowResolution = 2048;
        //生成阴影贴图数量
        this.directionLight.shadowPSSMCount = 1;
        //模糊等级,越大越高,更耗性能
        this.directionLight.shadowPCFType = 3;

        //批量预加载资源
        Laya.loader.create([
            "res/threeDimen/staticModel/grid/plane.lh",
            //"res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"
            "res/threeDimen/skinModel/Polytope/Test.lh"
        ], Laya.Handler.create(this, this.onComplete));
    }

    onComplete() {
        //加载地面
        var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Laya.Sprite3D;
        //地面接收阴影
        (grid.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;

        //加载角色
        //this.role = new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm"));
        this.role = new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Meshes/PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01.lm"));
        this.scene.addChild(this.role);
        //设置材质
        //this.role.meshRenderer.material = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/Materials/T_Diffuse.lmat");
        this.role.meshRenderer.material = Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources//Materials/PT_Medieval_mat.lmat");

        this.role.transform.position.setValue(0, 0, 0);
        this.role.transform.localScale.setValue(0.5, 0.5, 0.5);
        //this.role.transform.rotate(new Laya.Vector3(-3.14 / 2, 0, 0));

        //设置定时器执行,定时重复执行(基于帧率)
        Laya.timer.frameLoop(1, this, this.animate);
    }

    animate() {
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);
        
        this.position.y = Math.max(0, this.scaleValue / 2);;
        this.role.transform.position = this.position;
        this.role.transform.rotate(this.rotate, false, false);
    }
}
*/ 
},{"./common/CameraMoveScript":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveScript = /** @class */ (function (_super) {
    __extends(CameraMoveScript, _super);
    function CameraMoveScript() {
        var _this = _super.call(this) || this;
        /** @private */
        _this._tempVector3 = new Laya.Vector3();
        _this.yawPitchRoll = new Laya.Vector3();
        _this.resultRotation = new Laya.Quaternion();
        _this.tempRotationZ = new Laya.Quaternion();
        _this.tempRotationX = new Laya.Quaternion();
        _this.tempRotationY = new Laya.Quaternion();
        _this.rotaionSpeed = 0.00006;
        return _this;
    }
    /**
     * @private
     */
    CameraMoveScript.prototype._updateRotation = function () {
        if (Math.abs(this.yawPitchRoll.y) < 1.50) {
            Laya.Quaternion.createFromYawPitchRoll(this.yawPitchRoll.x, this.yawPitchRoll.y, this.yawPitchRoll.z, this.tempRotationZ);
            this.tempRotationZ.cloneTo(this.camera.transform.localRotation);
            this.camera.transform.localRotation = this.camera.transform.localRotation;
        }
    };
    /**
     * @inheritDoc
     */
    CameraMoveScript.prototype.onAwake = function () {
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.on(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
        //Laya.stage.on(Event.RIGHT_MOUSE_OUT, this, mouseOut);
        this.camera = this.owner;
    };
    /**
     * @inheritDoc
     */
    CameraMoveScript.prototype.onUpdate = function () {
        var elapsedTime = Laya.timer.delta;
        if (!isNaN(this.lastMouseX) && !isNaN(this.lastMouseY) && this.isMouseDown) {
            var scene = this.owner.scene;
            Laya.KeyBoardManager.hasKeyDown(87) && this.moveForward(-0.01 * elapsedTime); //W
            Laya.KeyBoardManager.hasKeyDown(83) && this.moveForward(0.01 * elapsedTime); //S
            Laya.KeyBoardManager.hasKeyDown(65) && this.moveRight(-0.01 * elapsedTime); //A
            Laya.KeyBoardManager.hasKeyDown(68) && this.moveRight(0.01 * elapsedTime); //D
            Laya.KeyBoardManager.hasKeyDown(81) && this.moveVertical(0.01 * elapsedTime); //Q
            Laya.KeyBoardManager.hasKeyDown(69) && this.moveVertical(-0.01 * elapsedTime); //E
            var offsetX = Laya.stage.mouseX - this.lastMouseX;
            var offsetY = Laya.stage.mouseY - this.lastMouseY;
            var yprElem = this.yawPitchRoll;
            yprElem.x -= offsetX * this.rotaionSpeed * elapsedTime;
            yprElem.y -= offsetY * this.rotaionSpeed * elapsedTime;
            this._updateRotation();
        }
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
    };
    /**
     * @inheritDoc
     */
    CameraMoveScript.prototype.onDestroy = function () {
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_DOWN, this, this.mouseDown);
        Laya.stage.off(Laya.Event.RIGHT_MOUSE_UP, this, this.mouseUp);
    };
    CameraMoveScript.prototype.mouseDown = function (e) {
        this.camera.transform.localRotation.getYawPitchRoll(this.yawPitchRoll);
        this.lastMouseX = Laya.stage.mouseX;
        this.lastMouseY = Laya.stage.mouseY;
        this.isMouseDown = true;
    };
    CameraMoveScript.prototype.mouseUp = function (e) {
        this.isMouseDown = false;
    };
    CameraMoveScript.prototype.mouseOut = function (e) {
        this.isMouseDown = false;
    };
    /**
     * 向前移动。
     * @param distance 移动距离。
     */
    CameraMoveScript.prototype.moveForward = function (distance) {
        this._tempVector3.x = this._tempVector3.y = 0;
        this._tempVector3.z = distance;
        this.camera.transform.translate(this._tempVector3);
    };
    /**
     * 向右移动。
     * @param distance 移动距离。
     */
    CameraMoveScript.prototype.moveRight = function (distance) {
        this._tempVector3.y = this._tempVector3.z = 0;
        this._tempVector3.x = distance;
        this.camera.transform.translate(this._tempVector3);
    };
    /**
     * 向上移动。
     * @param distance 移动距离。
     */
    CameraMoveScript.prototype.moveVertical = function (distance) {
        this._tempVector3.x = this._tempVector3.z = 0;
        this._tempVector3.y = distance;
        this.camera.transform.translate(this._tempVector3, false);
    };
    return CameraMoveScript;
}(Laya.Script3D));
exports.default = CameraMoveScript;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvU3ByaXRlM0RMb2FkLnRzIiwic3JjL3NjcmlwdC9jb21tb24vQ2FtZXJhTW92ZVNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNSQSxzREFBaUQ7QUFHakQ7SUFDSTtRQUNJLHNCQUFzQjtRQUN0QixJQUFJLHNCQUFZLEVBQUUsQ0FBQztRQUNuQiwwQkFBMEI7SUFDOUIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQUNELE9BQU87QUFDUCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDYlgsOERBQXdEO0FBRXhEO0lBQ0k7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWpCLElBQUksS0FBSyxHQUFnQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBaUIsQ0FBQztRQUNqRixLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksTUFBTSxHQUFlLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxD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QUssQ0FBQyxLQUFLLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDeEUsSUFBSSxLQUFLLEdBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFHO1lBQ2hGLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRztZQUMvRSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRztZQUM5RSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFBLEdBQUc7WUFDN0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFHO1lBQ2hGLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFHO1lBRWpGLElBQUksT0FBTyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENB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QzlELENBQUM7SUFFTCx1QkFBQztBQUFELENBekhBLEFBeUhDLENBekg2QyxJQUFJLENBQUMsUUFBUSxHQXlIMUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVHJhbnNmb3JtRGVtbyBmcm9tIFwiLi9zY3JpcHQvVHJhbnNmb3JtRGVtb1wiO1xyXG5pbXBvcnQgU3ByaXRlM0RMb2FkIGZyb20gXCIuL3NjcmlwdC9TcHJpdGUzRExvYWRcIjtcclxuaW1wb3J0IE1hdGVyaWFsQW5pbWF0aW9uIGZyb20gXCIuL3NjcmlwdC9NYXRlcmlhbEFuaW1hdGlvblwiXHJcblxyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vbmV3IFRyYW5zZm9ybURlbW8oKTtcclxuICAgICAgICBuZXcgU3ByaXRlM0RMb2FkKCk7XHJcbiAgICAgICAgLy9uZXcgTWF0ZXJpYWxBbmltYXRpb24oKTtcclxuICAgIH1cclxufVxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpOyIsImltcG9ydCBDYW1lcmFNb3ZlU2NyaXB0IGZyb20gXCIuL2NvbW1vbi9DYW1lcmFNb3ZlU2NyaXB0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZTNETG9hZCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBMYXlhM0QuaW5pdCgwLCAwKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9OT05FO1xyXG4gICAgICAgIExheWEuU3RhdC5zaG93KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHNjZW5lOkxheWEuU2NlbmUzRCA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU2NlbmUzRCgpKSBhcyBMYXlhLlNjZW5lM0Q7XHJcbiAgICAgICAgc2NlbmUuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2FtZXJhOkxheWEuQ2FtZXJhID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMTAwKSkgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAwLjUsIDEpKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAtMTUsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgY2FtZXJhLmFkZENvbXBvbmVudChDYW1lcmFNb3ZlU2NyaXB0KTtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLlNwcml0ZTNELmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCIsIExheWEuSGFuZGxlci5jcmVhdGUobnVsbCwgZnVuY3Rpb24oc3ByaXRlOkxheWEuU3ByaXRlM0QpOnZvaWQge1xyXG4gICAgICAgICAgICBzY2VuZS5hZGRDaGlsZChzcHJpdGUpO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxufVxyXG5cclxuLypcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlM0RMb2FkIHtcclxuICAgIHByaXZhdGUgc2NlbmU6IExheWEuU2NlbmUzRDtcclxuICAgIHByaXZhdGUgY2FtZXJhOiBMYXlhLkNhbWVyYTtcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uTGlnaHQ6IExheWEuRGlyZWN0aW9uTGlnaHQ7XHJcbiAgICBwcml2YXRlIHJvbGU6IExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBwb3NpdGlvbjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcHJpdmF0ZSByb3RhdGU6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCAxLCAwKTtcclxuXHRwcml2YXRlIHNjYWxlOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIHByaXZhdGUgc2NhbGVEZWx0YTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgc2NhbGVWYWx1ZTpudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsIDApO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX05PTkU7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgTGF5YS5TY2VuZTNEKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDApO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5jYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAwLjgsIDUpKTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTE1LCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG5cclxuXHRcdHRoaXMuZGlyZWN0aW9uTGlnaHQ9IG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCk7XHJcblx0XHR0aGlzLnNjZW5lLmFkZENoaWxkKHRoaXMuZGlyZWN0aW9uTGlnaHQpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAtMy4xNCAvIDMsIDAsIDApKTtcclxuXHJcbiAgICAgICAgLy/nga/lhYnlvIDlkK/pmLTlvbFcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgLy/lj6/op4HpmLTlvbHot53nprtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvd0Rpc3RhbmNlID0gMztcclxuICAgICAgICAvL+eUn+aIkOmYtOW9sei0tOWbvuWwuuWvuFxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UmVzb2x1dGlvbiA9IDIwNDg7XHJcbiAgICAgICAgLy/nlJ/miJDpmLTlvbHotLTlm77mlbDph49cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvd1BTU01Db3VudCA9IDE7XHJcbiAgICAgICAgLy/mqKHns4rnrYnnuqcs6LaK5aSn6LaK6auYLOabtOiAl+aAp+iDvVxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UENGVHlwZSA9IDM7XHJcblxyXG4gICAgICAgIC8v5om56YeP6aKE5Yqg6L296LWE5rqQXHJcblx0XHRMYXlhLmxvYWRlci5jcmVhdGUoW1xyXG5cdFx0XHRcInJlcy90aHJlZURpbWVuL3N0YXRpY01vZGVsL2dyaWQvcGxhbmUubGhcIiwgXHJcbiAgICAgICAgICAgIC8vXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCJcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvVGVzdC5saFwiXHJcblx0XHRdLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgLy/liqDovb3lnLDpnaJcclxuICAgICAgICB2YXIgZ3JpZCA9IHRoaXMuc2NlbmUuYWRkQ2hpbGQoTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc3RhdGljTW9kZWwvZ3JpZC9wbGFuZS5saFwiKSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICAvL+WcsOmdouaOpeaUtumYtOW9sVxyXG4gICAgICAgIChncmlkLmdldENoaWxkQXQoMCkgYXMgTGF5YS5NZXNoU3ByaXRlM0QpLm1lc2hSZW5kZXJlci5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/liqDovb3op5LoibJcclxuICAgICAgICAvL3RoaXMucm9sZSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9Bc3NldHMvTGF5YU1vbmtleS9MYXlhTW9ua2V5LUxheWFNb25rZXkubG1cIikpO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy9NZXNoZXMvUFRfTWVkaWV2YWxfRmVtYWxlX1BlYXNhbnRfMDFfYS1QVF9NZWRpZXZhbF9GZW1hbGVfUGVhc2FudF8wMS5sbVwiKSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGRDaGlsZCh0aGlzLnJvbGUpO1xyXG4gICAgICAgIC8v6K6+572u5p2Q6LSoXHJcbiAgICAgICAgLy90aGlzLnJvbGUubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvQXNzZXRzL0xheWFNb25rZXkvTWF0ZXJpYWxzL1RfRGlmZnVzZS5sbWF0XCIpO1xyXG4gICAgICAgIHRoaXMucm9sZS5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy8vTWF0ZXJpYWxzL1BUX01lZGlldmFsX21hdC5sbWF0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uLnNldFZhbHVlKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMucm9sZS50cmFuc2Zvcm0ubG9jYWxTY2FsZS5zZXRWYWx1ZSgwLjUsIDAuNSwgMC41KTtcclxuICAgICAgICAvL3RoaXMucm9sZS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTMuMTQgLyAyLCAwLCAwKSk7XHJcblxyXG4gICAgICAgIC8v6K6+572u5a6a5pe25Zmo5omn6KGMLOWumuaXtumHjeWkjeaJp+ihjCjln7rkuo7luKfnjocpXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5hbmltYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IE1hdGguc2luKHRoaXMuc2NhbGVEZWx0YSArPSAwLjEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IE1hdGgubWF4KDAsIHRoaXMuc2NhbGVWYWx1ZSAvIDIpOztcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnJvdGF0ZSh0aGlzLnJvdGF0ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4qLyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYU1vdmVTY3JpcHQgZXh0ZW5kcyBMYXlhLlNjcmlwdDNEIHtcclxuXHRcdFxyXG4gICAgLyoqIEBwcml2YXRlICovXHJcbiAgICBwcm90ZWN0ZWQgIF90ZW1wVmVjdG9yMzpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICBwcm90ZWN0ZWQgIGxhc3RNb3VzZVg6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICBsYXN0TW91c2VZOm51bWJlcjtcclxuICAgIHByb3RlY3RlZCAgeWF3UGl0Y2hSb2xsOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIHByb3RlY3RlZCAgcmVzdWx0Um90YXRpb246TGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkICB0ZW1wUm90YXRpb25aOkxheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgIHByb3RlY3RlZCAgdGVtcFJvdGF0aW9uWDpMYXlhLlF1YXRlcm5pb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICBwcm90ZWN0ZWQgIHRlbXBSb3RhdGlvblk6TGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkICBpc01vdXNlRG93bjpCb29sZWFuO1xyXG4gICAgcHJvdGVjdGVkICByb3RhaW9uU3BlZWQ6bnVtYmVyID0gMC4wMDAwNjtcclxuICAgIHByb3RlY3RlZCAgY2FtZXJhOkxheWEuQmFzZUNhbWVyYTtcclxuICAgIHByb3RlY3RlZCAgc2NlbmU6TGF5YS5TY2VuZTNEO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkICBfdXBkYXRlUm90YXRpb24oKTp2b2lkIHtcclxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy55YXdQaXRjaFJvbGwueSkgPCAxLjUwKSB7XHJcbiAgICAgICAgICAgIExheWEuUXVhdGVybmlvbi5jcmVhdGVGcm9tWWF3UGl0Y2hSb2xsKHRoaXMueWF3UGl0Y2hSb2xsLngsIHRoaXMueWF3UGl0Y2hSb2xsLnksIHRoaXMueWF3UGl0Y2hSb2xsLnosIHRoaXMudGVtcFJvdGF0aW9uWik7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFJvdGF0aW9uWi5jbG9uZVRvKHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb24gPSB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXREb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljICBvbkF3YWtlKCk6dm9pZCB7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJJR0hUX01PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLm9uKEV2ZW50LlJJR0hUX01PVVNFX09VVCwgdGhpcywgbW91c2VPdXQpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gdGhpcy5vd25lciBhcyBMYXlhLkNhbWVyYTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG9uVXBkYXRlKCk6dm9pZCB7XHJcbiAgICAgICAgdmFyIGVsYXBzZWRUaW1lOm51bWJlciA9IExheWEudGltZXIuZGVsdGE7XHJcbiAgICAgICAgaWYgKCFpc05hTih0aGlzLmxhc3RNb3VzZVgpICYmICFpc05hTih0aGlzLmxhc3RNb3VzZVkpICYmIHRoaXMuaXNNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lOkxheWEuU2NlbmUzRCA9IHRoaXMub3duZXIuc2NlbmU7XHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODcpICYmIHRoaXMubW92ZUZvcndhcmQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9XXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODMpICYmIHRoaXMubW92ZUZvcndhcmQoMC4wMSAqIGVsYXBzZWRUaW1lKTsvL1NcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big2NSkgJiYgdGhpcy5tb3ZlUmlnaHQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9BXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjgpICYmIHRoaXMubW92ZVJpZ2h0KDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9EXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODEpICYmIHRoaXMubW92ZVZlcnRpY2FsKDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9RXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjkpICYmIHRoaXMubW92ZVZlcnRpY2FsKC0wLjAxICogZWxhcHNlZFRpbWUpOy8vRVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG9mZnNldFg6bnVtYmVyID0gTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLmxhc3RNb3VzZVg7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZOm51bWJlciA9IExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5sYXN0TW91c2VZO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHlwckVsZW06TGF5YS5WZWN0b3IzID0gdGhpcy55YXdQaXRjaFJvbGw7XHJcbiAgICAgICAgICAgIHlwckVsZW0ueCAtPSBvZmZzZXRYICogdGhpcy5yb3RhaW9uU3BlZWQgKiBlbGFwc2VkVGltZTtcclxuICAgICAgICAgICAgeXByRWxlbS55IC09IG9mZnNldFkgKiB0aGlzLnJvdGFpb25TcGVlZCAqIGVsYXBzZWRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSb3RhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG9uRGVzdHJveSgpOnZvaWQge1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VEb3duKGU6RXZlbnQpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uLmdldFlhd1BpdGNoUm9sbCh0aGlzLnlhd1BpdGNoUm9sbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2VZID0gTGF5YS5zdGFnZS5tb3VzZVk7XHJcbiAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VVcChlOkV2ZW50KTp2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VPdXQoZTpFdmVudCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWQkeWJjeenu+WKqOOAglxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlIOenu+WKqOi3neemu+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG1vdmVGb3J3YXJkKGRpc3RhbmNlOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueCA9IHRoaXMuX3RlbXBWZWN0b3IzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnogPSBkaXN0YW5jZTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKHRoaXMuX3RlbXBWZWN0b3IzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHlj7Pnp7vliqjjgIJcclxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSDnp7vliqjot53nprvjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmVSaWdodChkaXN0YW5jZTpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnkgPSB0aGlzLl90ZW1wVmVjdG9yMy56ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZSh0aGlzLl90ZW1wVmVjdG9yMyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5ZCR5LiK56e75Yqo44CCXHJcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug56e75Yqo6Led56a744CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlVmVydGljYWwoZGlzdGFuY2U6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gdGhpcy5fdGVtcFZlY3RvcjMueiA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueSA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFZlY3RvcjMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbn0iXX0=
