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
var LoadResourceDemo_1 = require("./script/LoadResourceDemo");
var Main = /** @class */ (function () {
    function Main() {
        //new UnityExportTest();
        //new TransformDemo();
        //new Sprite3DLoad();
        //new MaterialAnimation();
        new LoadResourceDemo_1.default();
    }
    return Main;
}());
//激活启动类
new Main();
},{"./script/LoadResourceDemo":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraMoveScript_1 = require("./common/CameraMoveScript");
var LoadResourceDemo = /** @class */ (function () {
    function LoadResourceDemo() {
        this._scene = null;
        this.sprite3D = null;
        //初始化引擎
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        //显示性能面板
        Laya.Stat.show();
        //加载资源
        this.LoadRes();
        //批量预加载方式
        //this.PreloadingRes();
    }
    LoadResourceDemo.prototype.LoadRes = function () {
        //场景加载
        Laya.Scene3D.load("res/threeDimen/scene/XunLongShi/XunLongShi.ls", Laya.Handler.create(this, function (scene) {
            this._scene = scene;
            Laya.stage.addChild(scene);
            //添加相机
            var camera = new Laya.Camera();
            this._scene.addChild(camera);
            //设置相机清除标记，使用天空
            camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            //调整相机的位置
            camera.transform.translate(new Laya.Vector3(3, 20, 47));
            //相机视角控制组件(脚本)
            camera.addComponent(CameraMoveScript_1.default);
            //添加光照
            var directionLight = this._scene.addChild(new Laya.DirectionLight());
            directionLight.color = new Laya.Vector3(1, 1, 1);
            directionLight.transform.rotate(new Laya.Vector3(-3.14 / 3, 0, 0));
            //材质加载
            Laya.BaseMaterial.load("res/threeDimen/skyBox/skyBox2/skyBox2.lmat", Laya.Handler.create(null, function (mat) {
                //获取相机的天空渲染器
                var skyRenderer = camera.skyRenderer;
                //创建天空盒的mesh
                skyRenderer.mesh = Laya.SkyBox.instance;
                //设置天空盒材质
                skyRenderer.material = mat;
            }));
            (scene.getChildByName('Scenes').getChildByName('HeightMap')).active = false;
            (scene.getChildByName('Scenes').getChildByName('Area')).active = false;
            //加载纹理
            Laya.Texture2D.load("res/threeDimen/texture/earth.png", Laya.Handler.create(null, function (tex) {
                //使用纹理
                var earth1 = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(5, 32, 32)));
                earth1.transform.translate(new Laya.Vector3(17, 20, 0));
                var earthMat = new Laya.BlinnPhongMaterial();
                earthMat.albedoTexture = tex;
                earthMat.albedoIntensity = 1;
                earth1.meshRenderer.material = earthMat;
            }));
            //加载Mesh
            Laya.Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Laya.Handler.create(this, function (mesh) {
                var layaMonkey = scene.addChild(new Laya.MeshSprite3D(mesh));
                layaMonkey.transform.localScale = new Laya.Vector3(4, 4, 4);
                layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
                layaMonkey.transform.translate(new Laya.Vector3(5, 3, 13));
            }));
            //加载精灵
            Laya.Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Laya.Handler.create(this, function (sp) {
                var layaMonkey2 = scene.addChild(sp);
                layaMonkey2.transform.localScale = new Laya.Vector3(4, 4, 4);
                layaMonkey2.transform.translate(new Laya.Vector3(-10, 13, 0));
            }));
            //加载胖子精灵
            Laya.Sprite3D.load("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh", Laya.Handler.create(this, function (sp) {
                this.pangzi = scene.addChild(sp);
                this.pangzi.transform.localScale = new Laya.Vector3(4, 4, 4);
                this.pangzi.transform.translate(new Laya.Vector3(-20, 13, 0));
                //获取动画组件
                this.pangziAnimator = this.pangzi.getChildAt(0).getComponent(Laya.Animator);
                Laya.AnimationClip.load("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani", Laya.Handler.create(this, function (aniClip) {
                    //创建动作状态
                    var state1 = new Laya.AnimatorState();
                    //动作名称
                    state1.name = "hello";
                    //动作播放起始时间
                    state1.clipStart = 0 / 581;
                    //动作播放结束时间
                    state1.clipEnd = 581 / 581;
                    //设置动作
                    state1.clip = aniClip;
                    //设置动作循环
                    state1.clip.islooping = true;
                    //为动画组件添加一个动作状态
                    this.pangziAnimator.addState(state1);
                    //播放动作
                    this.pangziAnimator.play("hello");
                }));
            }));
        }));
    };
    //批量预加载方式
    LoadResourceDemo.prototype.PreloadingRes = function () {
        //预加载所有资源
        var resource = [
            "res/threeDimen/scene/XunLongShi/XunLongShi.ls",
            "res/threeDimen/skyBox/skyBox2/skyBox2.lmat",
            "res/threeDimen/texture/earth.png",
            "res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm",
            "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", "res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh",
            "res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani"
        ];
        Laya.loader.create(resource, Laya.Handler.create(this, this.onPreLoadFinish));
    };
    LoadResourceDemo.prototype.onPreLoadFinish = function () {
        //初始化3D场景
        this._scene = Laya.stage.addChild(Laya.Loader.getRes("res/threeDimen/scene/XunLongShi/XunLongShi.ls"));
        //添加相机
        var camera = new Laya.Camera();
        this._scene.addChild(camera);
        //设置相机清楚标记，使用天空
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        //调整相机的位置
        camera.transform.translate(new Laya.Vector3(3, 20, 47));
        //相机视角控制组件(脚本)
        camera.addComponent(CameraMoveScript_1.default);
        //添加光照
        var directionLight = new Laya.DirectionLight();
        this._scene.addChild(directionLight);
        //光照颜色
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.transform.rotate(new Laya.Vector3(-3.14 / 3, 0, 0));
        //使用材质
        var skyboxMaterial = Laya.Loader.getRes("res/threeDimen/skyBox/skyBox2/skyBox2.lmat");
        var skyRenderer = camera.skyRenderer;
        skyRenderer.mesh = Laya.SkyBox.instance;
        skyRenderer.material = skyboxMaterial;
        //激活场景中的子节点
        (this._scene.getChildByName('Scenes').getChildByName('HeightMap')).active = false;
        (this._scene.getChildByName('Scenes').getChildByName('Area')).active = false;
        //使用纹理
        var earth1 = this._scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(5, 32, 32)));
        earth1.transform.translate(new Laya.Vector3(17, 20, 0));
        var earthMat = new Laya.BlinnPhongMaterial();
        earthMat.albedoTexture = Laya.Loader.getRes("res/threeDimen/texture/earth.png");
        earthMat.albedoIntensity = 1;
        earth1.meshRenderer.material = earthMat;
        //创建一个精灵
        this.sprite3D = new Laya.Sprite3D();
        this._scene.addChild(this.sprite3D);
        //获取Mesh资源
        var mesh = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm");
        //为精灵设置Mesh资源
        var layaMonkey = new Laya.MeshSprite3D(mesh);
        this.sprite3D.addChild(layaMonkey);
        layaMonkey.transform.localScale = new Laya.Vector3(4, 4, 4);
        layaMonkey.transform.rotation = new Laya.Quaternion(0.7071068, 0, 0, -0.7071067);
        layaMonkey.transform.translate(new Laya.Vector3(5, 3, 13));
        //使用精灵
        var sp = Laya.Loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        var layaMonkey2 = this._scene.addChild(sp);
        layaMonkey2.transform.localScale = new Laya.Vector3(4, 4, 4);
        layaMonkey2.transform.translate(new Laya.Vector3(-10, 13, 0));
        //使用精灵
        this.pangzi = Laya.Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/PangZiNoAni.lh");
        this._scene.addChild(this.pangzi);
        this.pangzi.transform.localScale = new Laya.Vector3(4, 4, 4);
        this.pangzi.transform.translate(new Laya.Vector3(-20, 13, 0));
        //获取动画组件
        this.pangziAnimator = this.pangzi.getChildAt(0).getComponent(Laya.Animator);
        var pangAni = Laya.Loader.getRes("res/threeDimen/skinModel/BoneLinkScene/Assets/Model3D/PangZi-Take 001.lani");
        //创建动作状态
        var state1 = new Laya.AnimatorState();
        //动作名称
        state1.name = "hello";
        //动作播放起始时间
        state1.clipStart = 0 / 581;
        //动作播放结束时间
        state1.clipEnd = 581 / 581;
        //设置动作
        state1.clip = pangAni;
        //设置动作循环
        state1.clip.islooping = true;
        //为动画组件添加一个动作状态
        this.pangziAnimator.addState(state1);
        //播放动作
        this.pangziAnimator.play("hello");
    };
    return LoadResourceDemo;
}());
exports.default = LoadResourceDemo;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvTG9hZFJlc291cmNlRGVtby50cyIsInNyYy9zY3JpcHQvY29tbW9uL0NhbWVyYU1vdmVTY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEEsOERBQXdEO0FBRXhEO0lBQ0k7UUFDSSx3QkFBd0I7UUFDeEIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIsSUFBSSwwQkFBZ0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFFRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQ2xCWCw4REFBd0Q7QUFFeEQ7SUFNSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU87UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxRQUFRO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVqQixNQUFNO1FBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsU0FBUztRQUNULHVCQUF1QjtJQUNyQixDQUFDO0lBRUQsa0NBQU8sR0FBUDtRQUNJLE1BQU07UUFDWixJQUFJLENB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QUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVMLHVCQUFDO0FBQUQsQ0F6SEEsQUF5SEMsQ0F6SDZDLElBQUksQ0FBQyxRQUFRLEdBeUgxRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBVbml0eUV4cG9ydFRlc3QgZnJvbSBcIi4vc2NyaXB0L1VuaXR5RXhwb3J0VGVzdFwiXHJcbmltcG9ydCBUcmFuc2Zvcm1EZW1vIGZyb20gXCIuL3NjcmlwdC9UcmFuc2Zvcm1EZW1vXCI7XHJcbmltcG9ydCBTcHJpdGUzRExvYWQgZnJvbSBcIi4vc2NyaXB0L1Nwcml0ZTNETG9hZFwiO1xyXG5pbXBvcnQgTWF0ZXJpYWxBbmltYXRpb24gZnJvbSBcIi4vc2NyaXB0L01hdGVyaWFsQW5pbWF0aW9uXCJcclxuaW1wb3J0IExvYWRSZXNvdXJjZURlbW8gZnJvbSBcIi4vc2NyaXB0L0xvYWRSZXNvdXJjZURlbW9cIlxyXG5cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL25ldyBVbml0eUV4cG9ydFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUcmFuc2Zvcm1EZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgU3ByaXRlM0RMb2FkKCk7XHJcbiAgICAgICAgLy9uZXcgTWF0ZXJpYWxBbmltYXRpb24oKTtcclxuICAgICAgICBuZXcgTG9hZFJlc291cmNlRGVtbygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpOyIsImltcG9ydCBDYW1lcmFNb3ZlU2NyaXB0IGZyb20gXCIuL2NvbW1vbi9DYW1lcmFNb3ZlU2NyaXB0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRSZXNvdXJjZURlbW97XHJcblx0cHJpdmF0ZSBfc2NlbmU6TGF5YS5TY2VuZTNEO1xyXG5cdHByaXZhdGUgc3ByaXRlM0Q6TGF5YS5TcHJpdGUzRDtcclxuXHRwcml2YXRlIHBhbmd6aTpMYXlhLlNwcml0ZTNEO1xyXG5cdHByaXZhdGUgcGFuZ3ppQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX3NjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAvL+WIneWni+WMluW8leaTjlxyXG5cdFx0TGF5YTNELmluaXQoMCwgMCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuXHRcdExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX05PTkU7XHJcblx0XHQvL+aYvuekuuaAp+iDvemdouadv1xyXG5cdFx0TGF5YS5TdGF0LnNob3coKTtcclxuXHRcdFx0XHJcblx0XHQvL+WKoOi9vei1hOa6kFxyXG5cdFx0dGhpcy5Mb2FkUmVzKCk7XHJcblx0XHRcdFxyXG5cdFx0Ly/mibnph4/pooTliqDovb3mlrnlvI9cclxuXHRcdC8vdGhpcy5QcmVsb2FkaW5nUmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgTG9hZFJlcygpe1xyXG4gICAgICAgIC8v5Zy65pmv5Yqg6L29XHJcblx0XHRMYXlhLlNjZW5lM0QubG9hZChcInJlcy90aHJlZURpbWVuL3NjZW5lL1h1bkxvbmdTaGkvWHVuTG9uZ1NoaS5sc1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uKHNjZW5lKSB7XHJcblx0XHRcdHRoaXMuX3NjZW5lID0gc2NlbmU7XHJcblx0XHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQoc2NlbmUpO1xyXG5cdFx0XHQvL+a3u+WKoOebuOaculxyXG5cdFx0XHR2YXIgY2FtZXJhID0gbmV3IExheWEuQ2FtZXJhKCk7XHJcblx0XHRcdHRoaXMuX3NjZW5lLmFkZENoaWxkKGNhbWVyYSk7XHJcblx0XHRcdC8v6K6+572u55u45py65riF6Zmk5qCH6K6w77yM5L2/55So5aSp56m6XHJcblx0XHRcdGNhbWVyYS5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuXHRcdFx0Ly/osIPmlbTnm7jmnLrnmoTkvY3nva5cclxuXHRcdFx0Y2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygzLCAyMCwgNDcpKTtcclxuXHRcdFx0Ly/nm7jmnLrop4bop5LmjqfliLbnu4Tku7Yo6ISa5pysKVxyXG5cdFx0XHRjYW1lcmEuYWRkQ29tcG9uZW50KENhbWVyYU1vdmVTY3JpcHQpO1xyXG5cdFx0XHQvL+a3u+WKoOWFieeFp1xyXG5cdFx0XHR2YXIgZGlyZWN0aW9uTGlnaHQgPSB0aGlzLl9zY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5EaXJlY3Rpb25MaWdodCgpKTtcclxuXHRcdFx0ZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG5cdFx0XHRkaXJlY3Rpb25MaWdodC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoIC0zLjE0IC8gMywgMCwgMCkpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/mnZDotKjliqDovb1cclxuXHRcdFx0TGF5YS5CYXNlTWF0ZXJpYWwubG9hZChcInJlcy90aHJlZURpbWVuL3NreUJveC9za3lCb3gyL3NreUJveDIubG1hdFwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKG51bGwsIGZ1bmN0aW9uKG1hdCk6dm9pZCB7XHJcblx0XHRcdFx0Ly/ojrflj5bnm7jmnLrnmoTlpKnnqbrmuLLmn5PlmahcclxuXHRcdFx0XHR2YXIgc2t5UmVuZGVyZXI6TGF5YS5Ta3lSZW5kZXJlciA9IGNhbWVyYS5za3lSZW5kZXJlcjtcclxuXHRcdFx0XHQvL+WIm+W7uuWkqeepuuebkueahG1lc2hcclxuXHRcdFx0XHRza3lSZW5kZXJlci5tZXNoID0gTGF5YS5Ta3lCb3guaW5zdGFuY2U7XHJcblx0XHRcdFx0Ly/orr7nva7lpKnnqbrnm5LmnZDotKhcclxuXHRcdFx0XHRza3lSZW5kZXJlci5tYXRlcmlhbCA9IG1hdDtcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHRcclxuXHRcdFx0KHNjZW5lLmdldENoaWxkQnlOYW1lKCdTY2VuZXMnKS5nZXRDaGlsZEJ5TmFtZSgnSGVpZ2h0TWFwJykpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHQoc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoJ1NjZW5lcycpLmdldENoaWxkQnlOYW1lKCdBcmVhJykgKS5hY3RpdmUgPSBmYWxzZTtcclxuXHJcblx0XHRcdC8v5Yqg6L2957q555CGXHJcblx0XHRcdExheWEuVGV4dHVyZTJELmxvYWQoXCJyZXMvdGhyZWVEaW1lbi90ZXh0dXJlL2VhcnRoLnBuZ1wiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKG51bGwsIGZ1bmN0aW9uKHRleCk6dm9pZCB7XHJcblx0XHRcdFx0Ly/kvb/nlKjnurnnkIZcclxuXHRcdFx0XHR2YXIgZWFydGgxID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoNSwgMzIsIDMyKSkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG5cdFx0XHRcdGVhcnRoMS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMTcsIDIwLCAwKSk7XHJcblx0XHRcclxuXHRcdFx0XHR2YXIgZWFydGhNYXQgPSBuZXcgTGF5YS5CbGlublBob25nTWF0ZXJpYWwoKTtcclxuXHRcdFx0XHRlYXJ0aE1hdC5hbGJlZG9UZXh0dXJlID0gdGV4O1xyXG5cdFx0XHRcdGVhcnRoTWF0LmFsYmVkb0ludGVuc2l0eSA9IDE7XHJcblx0XHRcdFx0ZWFydGgxLm1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IGVhcnRoTWF0O1xyXG5cdFx0XHR9KSk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WKoOi9vU1lc2hcclxuXHRcdFx0TGF5YS5NZXNoLmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9Bc3NldHMvTGF5YU1vbmtleS9MYXlhTW9ua2V5LUxheWFNb25rZXkubG1cIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihtZXNoKSB7XHJcblx0XHRcdFx0dmFyIGxheWFNb25rZXkgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QobWVzaCkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG5cdFx0XHRcdGxheWFNb25rZXkudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDQsIDQsIDQpO1xyXG5cdFx0XHRcdGxheWFNb25rZXkudHJhbnNmb3JtLnJvdGF0aW9uID0gbmV3IExheWEuUXVhdGVybmlvbigwLjcwNzEwNjgsIDAsIDAsIC0wLjcwNzEwNjcpO1xyXG5cdFx0XHRcdGxheWFNb25rZXkudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDUsIDMsIDEzKSk7XHJcblx0XHRcdH0pKTtcclxuXHRcdFx0XHJcblx0XHRcdC8v5Yqg6L2957K+54G1XHJcblx0XHRcdExheWEuU3ByaXRlM0QubG9hZChcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0xheWFNb25rZXkubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihzcCkge1xyXG5cdFx0XHRcdHZhciBsYXlhTW9ua2V5MiA9IHNjZW5lLmFkZENoaWxkKHNwKTtcclxuXHRcdFx0XHRsYXlhTW9ua2V5Mi50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoNCwgNCwgNCk7XHJcblx0XHRcdFx0bGF5YU1vbmtleTIudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0xMCwgMTMsIDApKTtcclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0Ly/liqDovb3og5blrZDnsr7ngbVcclxuXHRcdFx0TGF5YS5TcHJpdGUzRC5sb2FkKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvUGFuZ1ppTm9BbmkubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihzcDpMYXlhLlNwcml0ZTNEKTp2b2lkIHtcclxuXHRcdFx0XHR0aGlzLnBhbmd6aSA9IHNjZW5lLmFkZENoaWxkKHNwKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG5cdFx0XHRcdHRoaXMucGFuZ3ppLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyg0LCA0LCA0KTtcclxuXHRcdFx0XHR0aGlzLnBhbmd6aS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoLTIwLCAxMywgMCkpO1xyXG5cdFx0XHRcdC8v6I635Y+W5Yqo55S757uE5Lu2XHJcblx0XHRcdFx0dGhpcy5wYW5nemlBbmltYXRvciA9IHRoaXMucGFuZ3ppLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpIGFzIExheWEuQW5pbWF0b3I7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0TGF5YS5BbmltYXRpb25DbGlwLmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvQm9uZUxpbmtTY2VuZS9Bc3NldHMvTW9kZWwzRC9QYW5nWmktVGFrZSAwMDEubGFuaVwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uKGFuaUNsaXA6TGF5YS5BbmltYXRpb25DbGlwKTp2b2lkIHtcclxuXHRcdFx0XHRcdC8v5Yib5bu65Yqo5L2c54q25oCBXHJcblx0XHRcdFx0XHR2YXIgc3RhdGUxID0gbmV3IExheWEuQW5pbWF0b3JTdGF0ZSgpO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzlkI3np7BcclxuXHRcdFx0XHRcdHN0YXRlMS5uYW1lID0gXCJoZWxsb1wiO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzmkq3mlL7otbflp4vml7bpl7RcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwU3RhcnQgPSAwIC8gNTgxO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzmkq3mlL7nu5PmnZ/ml7bpl7RcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwRW5kID0gNTgxIC8gNTgxO1xyXG5cdFx0XHRcdFx0Ly/orr7nva7liqjkvZxcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwID0gYW5pQ2xpcDtcclxuXHRcdFx0XHRcdC8v6K6+572u5Yqo5L2c5b6q546vXHJcblx0XHRcdFx0XHRzdGF0ZTEuY2xpcC5pc2xvb3BpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdFx0Ly/kuLrliqjnlLvnu4Tku7bmt7vliqDkuIDkuKrliqjkvZznirbmgIFcclxuXHRcdFx0XHRcdHRoaXMucGFuZ3ppQW5pbWF0b3IuYWRkU3RhdGUoc3RhdGUxKTtcclxuXHRcdFx0XHRcdC8v5pKt5pS+5Yqo5L2cXHJcblx0XHRcdFx0XHR0aGlzLnBhbmd6aUFuaW1hdG9yLnBsYXkoXCJoZWxsb1wiKTtcclxuXHRcdFx0XHR9KSk7XHRcclxuXHRcdFx0fSkpO1xyXG5cdFxyXG5cdFx0fSkpO1xyXG5cdH1cclxuXHRcclxuICAgIC8v5om56YeP6aKE5Yqg6L295pa55byPXHJcbiAgICBQcmVsb2FkaW5nUmVzKCl7XHJcbiAgICAgICAgLy/pooTliqDovb3miYDmnInotYTmupBcclxuXHRcdHZhciByZXNvdXJjZSA9IFtcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9zY2VuZS9YdW5Mb25nU2hpL1h1bkxvbmdTaGkubHNcIiwgIFxyXG4gICAgICAgICAgICBcInJlcy90aHJlZURpbWVuL3NreUJveC9za3lCb3gyL3NreUJveDIubG1hdFwiLFxyXG4gICAgICAgICAgICBcInJlcy90aHJlZURpbWVuL3RleHR1cmUvZWFydGgucG5nXCIsXHJcbiAgICAgICAgICAgIFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvQXNzZXRzL0xheWFNb25rZXkvTGF5YU1vbmtleS1MYXlhTW9ua2V5LmxtXCIsXHJcbiAgICAgICAgICAgIFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvTGF5YU1vbmtleS5saFwiLFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvUGFuZ1ppTm9BbmkubGhcIiwgXHJcblx0XHRcdFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvQXNzZXRzL01vZGVsM0QvUGFuZ1ppLVRha2UgMDAxLmxhbmlcIl07XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShyZXNvdXJjZSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uUHJlTG9hZEZpbmlzaCkpO1x0XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG9uUHJlTG9hZEZpbmlzaCgpe1xyXG4gICAgICAgIC8v5Yid5aeL5YyWM0TlnLrmma9cclxuXHRcdHRoaXMuX3NjZW5lID0gTGF5YS5zdGFnZS5hZGRDaGlsZChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9zY2VuZS9YdW5Mb25nU2hpL1h1bkxvbmdTaGkubHNcIikpIGFzIExheWEuU2NlbmUzRDtcclxuXHRcdFxyXG5cdFx0Ly/mt7vliqDnm7jmnLpcclxuXHRcdHZhciBjYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoKTtcclxuXHRcdHRoaXMuX3NjZW5lLmFkZENoaWxkKGNhbWVyYSk7XHJcblx0XHQvL+iuvue9ruebuOacuua4healmuagh+iusO+8jOS9v+eUqOWkqeepulxyXG5cdFx0Y2FtZXJhLmNsZWFyRmxhZyA9TGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcblx0XHQvL+iwg+aVtOebuOacuueahOS9jee9rlxyXG5cdFx0Y2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygzLCAyMCwgNDcpKTtcclxuXHRcdC8v55u45py66KeG6KeS5o6n5Yi257uE5Lu2KOiEmuacrClcclxuXHRcdGNhbWVyYS5hZGRDb21wb25lbnQoQ2FtZXJhTW92ZVNjcmlwdCk7XHJcblx0XHRcclxuXHRcdC8v5re75Yqg5YWJ54WnXHJcblx0XHR2YXIgZGlyZWN0aW9uTGlnaHQgPSBuZXcgTGF5YS5EaXJlY3Rpb25MaWdodCgpO1xyXG5cdFx0dGhpcy5fc2NlbmUuYWRkQ2hpbGQoZGlyZWN0aW9uTGlnaHQpO1xyXG5cdFx0Ly/lhYnnhafpopzoibJcclxuXHRcdGRpcmVjdGlvbkxpZ2h0LmNvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuXHRcdGRpcmVjdGlvbkxpZ2h0LnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMyggLTMuMTQgLyAzLCAwLCAwKSk7XHJcblx0XHRcclxuXHRcdC8v5L2/55So5p2Q6LSoXHJcblx0XHR2YXIgc2t5Ym94TWF0ZXJpYWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za3lCb3gvc2t5Qm94Mi9za3lCb3gyLmxtYXRcIik7XHJcblx0XHR2YXIgc2t5UmVuZGVyZXIgPSBjYW1lcmEuc2t5UmVuZGVyZXI7XHJcblx0XHRza3lSZW5kZXJlci5tZXNoID0gTGF5YS5Ta3lCb3guaW5zdGFuY2U7XHJcblx0XHRza3lSZW5kZXJlci5tYXRlcmlhbCA9IHNreWJveE1hdGVyaWFsO1xyXG5cdFx0XHJcblx0XHQvL+a/gOa0u+WcuuaZr+S4reeahOWtkOiKgueCuVxyXG5cdFx0KHRoaXMuX3NjZW5lLmdldENoaWxkQnlOYW1lKCdTY2VuZXMnKS5nZXRDaGlsZEJ5TmFtZSgnSGVpZ2h0TWFwJykpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0KHRoaXMuX3NjZW5lLmdldENoaWxkQnlOYW1lKCdTY2VuZXMnKS5nZXRDaGlsZEJ5TmFtZSgnQXJlYScpKS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFxyXG5cdFx0Ly/kvb/nlKjnurnnkIZcclxuXHRcdHZhciBlYXJ0aDEgPSB0aGlzLl9zY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZVNwaGVyZSg1LCAzMiwgMzIpKSkgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcblx0XHRlYXJ0aDEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDE3LCAyMCwgMCkpO1xyXG5cdFx0XHJcblx0XHR2YXIgZWFydGhNYXQgPSBuZXcgTGF5YS5CbGlublBob25nTWF0ZXJpYWwoKTtcclxuXHRcdGVhcnRoTWF0LmFsYmVkb1RleHR1cmUgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi90ZXh0dXJlL2VhcnRoLnBuZ1wiKTtcclxuXHRcdGVhcnRoTWF0LmFsYmVkb0ludGVuc2l0eSA9IDE7XHJcblx0XHRlYXJ0aDEubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gZWFydGhNYXQ7XHJcblx0XHRcclxuXHRcdC8v5Yib5bu65LiA5Liq57K+54G1XHJcblx0XHR0aGlzLnNwcml0ZTNEID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuXHRcdHRoaXMuX3NjZW5lLmFkZENoaWxkKHRoaXMuc3ByaXRlM0QpO1xyXG5cdFx0Ly/ojrflj5ZNZXNo6LWE5rqQXHJcblx0XHR2YXIgbWVzaCA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0Fzc2V0cy9MYXlhTW9ua2V5L0xheWFNb25rZXktTGF5YU1vbmtleS5sbVwiKTtcclxuXHRcdC8v5Li657K+54G16K6+572uTWVzaOi1hOa6kFxyXG5cdFx0dmFyIGxheWFNb25rZXkgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QobWVzaCk7XHJcblx0XHR0aGlzLnNwcml0ZTNELmFkZENoaWxkKGxheWFNb25rZXkpO1xyXG5cdFx0bGF5YU1vbmtleS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoNCwgNCwgNCk7XHJcblx0XHRsYXlhTW9ua2V5LnRyYW5zZm9ybS5yb3RhdGlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oMC43MDcxMDY4LCAwLCAwLCAtMC43MDcxMDY3KTtcclxuXHRcdGxheWFNb25rZXkudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDUsIDMsIDEzKSk7XHJcblx0XHRcclxuXHRcdC8v5L2/55So57K+54G1XHJcblx0XHR2YXIgc3AgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCIpO1xyXG5cdFx0dmFyIGxheWFNb25rZXkyID0gdGhpcy5fc2NlbmUuYWRkQ2hpbGQoc3ApIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG5cdFx0bGF5YU1vbmtleTIudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDQsIDQsIDQpO1xyXG5cdFx0bGF5YU1vbmtleTIudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0xMCwgMTMsIDApKTtcclxuXHRcdC8v5L2/55So57K+54G1XHJcblx0XHR0aGlzLnBhbmd6aSA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9Cb25lTGlua1NjZW5lL1BhbmdaaU5vQW5pLmxoXCIpO1xyXG5cdFx0dGhpcy5fc2NlbmUuYWRkQ2hpbGQodGhpcy5wYW5nemkpO1xyXG5cdFx0dGhpcy5wYW5nemkudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDQsIDQsIDQpO1xyXG5cdFx0dGhpcy5wYW5nemkudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0yMCwgMTMsIDApKTtcclxuXHRcdC8v6I635Y+W5Yqo55S757uE5Lu2XHJcblx0XHR0aGlzLnBhbmd6aUFuaW1hdG9yID0gdGhpcy5wYW5nemkuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcikgYXMgTGF5YS5BbmltYXRvcjtcclxuXHJcblx0XHR2YXIgcGFuZ0FuaSA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9Cb25lTGlua1NjZW5lL0Fzc2V0cy9Nb2RlbDNEL1BhbmdaaS1UYWtlIDAwMS5sYW5pXCIpIGFzIExheWEuQW5pbWF0aW9uQ2xpcDtcclxuXHRcdC8v5Yib5bu65Yqo5L2c54q25oCBXHJcblx0XHR2YXIgc3RhdGUxID0gbmV3IExheWEuQW5pbWF0b3JTdGF0ZSgpO1xyXG5cdFx0Ly/liqjkvZzlkI3np7BcclxuXHRcdHN0YXRlMS5uYW1lID0gXCJoZWxsb1wiO1xyXG5cdFx0Ly/liqjkvZzmkq3mlL7otbflp4vml7bpl7RcclxuXHRcdHN0YXRlMS5jbGlwU3RhcnQgPSAwIC8gNTgxO1xyXG5cdFx0Ly/liqjkvZzmkq3mlL7nu5PmnZ/ml7bpl7RcclxuXHRcdHN0YXRlMS5jbGlwRW5kID0gNTgxIC8gNTgxO1xyXG5cdFx0Ly/orr7nva7liqjkvZxcclxuXHRcdHN0YXRlMS5jbGlwID0gcGFuZ0FuaTtcclxuXHRcdC8v6K6+572u5Yqo5L2c5b6q546vXHJcblx0XHRzdGF0ZTEuY2xpcC5pc2xvb3BpbmcgPSB0cnVlO1xyXG5cdFx0Ly/kuLrliqjnlLvnu4Tku7bmt7vliqDkuIDkuKrliqjkvZznirbmgIFcclxuXHRcdHRoaXMucGFuZ3ppQW5pbWF0b3IuYWRkU3RhdGUoc3RhdGUxKTtcclxuXHRcdC8v5pKt5pS+5Yqo5L2cXHJcblx0XHR0aGlzLnBhbmd6aUFuaW1hdG9yLnBsYXkoXCJoZWxsb1wiKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYU1vdmVTY3JpcHQgZXh0ZW5kcyBMYXlhLlNjcmlwdDNEIHtcclxuXHRcdFxyXG4gICAgLyoqIEBwcml2YXRlICovXHJcbiAgICBwcm90ZWN0ZWQgIF90ZW1wVmVjdG9yMzpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICBwcm90ZWN0ZWQgIGxhc3RNb3VzZVg6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICBsYXN0TW91c2VZOm51bWJlcjtcclxuICAgIHByb3RlY3RlZCAgeWF3UGl0Y2hSb2xsOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIHByb3RlY3RlZCAgcmVzdWx0Um90YXRpb246TGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkICB0ZW1wUm90YXRpb25aOkxheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgIHByb3RlY3RlZCAgdGVtcFJvdGF0aW9uWDpMYXlhLlF1YXRlcm5pb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICBwcm90ZWN0ZWQgIHRlbXBSb3RhdGlvblk6TGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkICBpc01vdXNlRG93bjpCb29sZWFuO1xyXG4gICAgcHJvdGVjdGVkICByb3RhaW9uU3BlZWQ6bnVtYmVyID0gMC4wMDAwNjtcclxuICAgIHByb3RlY3RlZCAgY2FtZXJhOkxheWEuQmFzZUNhbWVyYTtcclxuICAgIHByb3RlY3RlZCAgc2NlbmU6TGF5YS5TY2VuZTNEO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkICBfdXBkYXRlUm90YXRpb24oKTp2b2lkIHtcclxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy55YXdQaXRjaFJvbGwueSkgPCAxLjUwKSB7XHJcbiAgICAgICAgICAgIExheWEuUXVhdGVybmlvbi5jcmVhdGVGcm9tWWF3UGl0Y2hSb2xsKHRoaXMueWF3UGl0Y2hSb2xsLngsIHRoaXMueWF3UGl0Y2hSb2xsLnksIHRoaXMueWF3UGl0Y2hSb2xsLnosIHRoaXMudGVtcFJvdGF0aW9uWik7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcFJvdGF0aW9uWi5jbG9uZVRvKHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb24gPSB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQGluaGVyaXREb2NcclxuICAgICAqL1xyXG4gICAgcHVibGljICBvbkF3YWtlKCk6dm9pZCB7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJJR0hUX01PVVNFX0RPV04sIHRoaXMsIHRoaXMubW91c2VEb3duKTtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLm9uKEV2ZW50LlJJR0hUX01PVVNFX09VVCwgdGhpcywgbW91c2VPdXQpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gdGhpcy5vd25lciBhcyBMYXlhLkNhbWVyYTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG9uVXBkYXRlKCk6dm9pZCB7XHJcbiAgICAgICAgdmFyIGVsYXBzZWRUaW1lOm51bWJlciA9IExheWEudGltZXIuZGVsdGE7XHJcbiAgICAgICAgaWYgKCFpc05hTih0aGlzLmxhc3RNb3VzZVgpICYmICFpc05hTih0aGlzLmxhc3RNb3VzZVkpICYmIHRoaXMuaXNNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgdmFyIHNjZW5lOkxheWEuU2NlbmUzRCA9IHRoaXMub3duZXIuc2NlbmU7XHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODcpICYmIHRoaXMubW92ZUZvcndhcmQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9XXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODMpICYmIHRoaXMubW92ZUZvcndhcmQoMC4wMSAqIGVsYXBzZWRUaW1lKTsvL1NcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big2NSkgJiYgdGhpcy5tb3ZlUmlnaHQoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9BXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjgpICYmIHRoaXMubW92ZVJpZ2h0KDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9EXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oODEpICYmIHRoaXMubW92ZVZlcnRpY2FsKDAuMDEgKiBlbGFwc2VkVGltZSk7Ly9RXHJcbiAgICAgICAgICAgIExheWEuS2V5Qm9hcmRNYW5hZ2VyLmhhc0tleURvd24oNjkpICYmIHRoaXMubW92ZVZlcnRpY2FsKC0wLjAxICogZWxhcHNlZFRpbWUpOy8vRVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG9mZnNldFg6bnVtYmVyID0gTGF5YS5zdGFnZS5tb3VzZVggLSB0aGlzLmxhc3RNb3VzZVg7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXRZOm51bWJlciA9IExheWEuc3RhZ2UubW91c2VZIC0gdGhpcy5sYXN0TW91c2VZO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHlwckVsZW06TGF5YS5WZWN0b3IzID0gdGhpcy55YXdQaXRjaFJvbGw7XHJcbiAgICAgICAgICAgIHlwckVsZW0ueCAtPSBvZmZzZXRYICogdGhpcy5yb3RhaW9uU3BlZWQgKiBlbGFwc2VkVGltZTtcclxuICAgICAgICAgICAgeXByRWxlbS55IC09IG9mZnNldFkgKiB0aGlzLnJvdGFpb25TcGVlZCAqIGVsYXBzZWRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl91cGRhdGVSb3RhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG9uRGVzdHJveSgpOnZvaWQge1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub2ZmKExheWEuRXZlbnQuUklHSFRfTU9VU0VfVVAsIHRoaXMsIHRoaXMubW91c2VVcCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VEb3duKGU6RXZlbnQpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uLmdldFlhd1BpdGNoUm9sbCh0aGlzLnlhd1BpdGNoUm9sbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2VYID0gTGF5YS5zdGFnZS5tb3VzZVg7XHJcbiAgICAgICAgdGhpcy5sYXN0TW91c2VZID0gTGF5YS5zdGFnZS5tb3VzZVk7XHJcbiAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VVcChlOkV2ZW50KTp2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCAgbW91c2VPdXQoZTpFdmVudCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWQkeWJjeenu+WKqOOAglxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlIOenu+WKqOi3neemu+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG1vdmVGb3J3YXJkKGRpc3RhbmNlOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueCA9IHRoaXMuX3RlbXBWZWN0b3IzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnogPSBkaXN0YW5jZTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKHRoaXMuX3RlbXBWZWN0b3IzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHlj7Pnp7vliqjjgIJcclxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSDnp7vliqjot53nprvjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmVSaWdodChkaXN0YW5jZTpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnkgPSB0aGlzLl90ZW1wVmVjdG9yMy56ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZSh0aGlzLl90ZW1wVmVjdG9yMyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5ZCR5LiK56e75Yqo44CCXHJcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug56e75Yqo6Led56a744CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3ZlVmVydGljYWwoZGlzdGFuY2U6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gdGhpcy5fdGVtcFZlY3RvcjMueiA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueSA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFZlY3RvcjMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbn0iXX0=
