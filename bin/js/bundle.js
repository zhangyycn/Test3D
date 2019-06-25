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
            //设置相机清楚标记，使用天空
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvTG9hZFJlc291cmNlRGVtby50cyIsInNyYy9zY3JpcHQvY29tbW9uL0NhbWVyYU1vdmVTY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEEsOERBQXdEO0FBRXhEO0lBQ0k7UUFDSSx3QkFBd0I7UUFDeEIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIsSUFBSSwwQkFBZ0IsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFDRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQ2pCWCw4REFBd0Q7QUFFeEQ7SUFLSTtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUUsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUUsSUFBSSxDQUFDO1FBQ3BCLE9BQU87UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUMvQyxRQUFRO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVqQixNQUFNO1FBQ04sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsU0FBUztRQUNULHVCQUF1QjtJQUNyQixDQUFDO0lBRUQsa0NBQU8sR0FBUDtRQUNJLE1BQU07UUFDWixJQUFJLENB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QyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUwsdUJBQUM7QUFBRCxDQXpIQSxBQXlIQyxDQXpINkMsSUFBSSxDQUFDLFFBQVEsR0F5SDFEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFVuaXR5RXhwb3J0VGVzdCBmcm9tIFwiLi9zY3JpcHQvVW5pdHlFeHBvcnRUZXN0XCJcclxuaW1wb3J0IFRyYW5zZm9ybURlbW8gZnJvbSBcIi4vc2NyaXB0L1RyYW5zZm9ybURlbW9cIjtcclxuaW1wb3J0IFNwcml0ZTNETG9hZCBmcm9tIFwiLi9zY3JpcHQvU3ByaXRlM0RMb2FkXCI7XHJcbmltcG9ydCBNYXRlcmlhbEFuaW1hdGlvbiBmcm9tIFwiLi9zY3JpcHQvTWF0ZXJpYWxBbmltYXRpb25cIlxyXG5pbXBvcnQgTG9hZFJlc291cmNlRGVtbyBmcm9tIFwiLi9zY3JpcHQvTG9hZFJlc291cmNlRGVtb1wiXHJcblxyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vbmV3IFVuaXR5RXhwb3J0VGVzdCgpO1xyXG4gICAgICAgIC8vbmV3IFRyYW5zZm9ybURlbW8oKTtcclxuICAgICAgICAvL25ldyBTcHJpdGUzRExvYWQoKTtcclxuICAgICAgICAvL25ldyBNYXRlcmlhbEFuaW1hdGlvbigpO1xyXG4gICAgICAgIG5ldyBMb2FkUmVzb3VyY2VEZW1vKCk7XHJcbiAgICB9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTsiLCJpbXBvcnQgQ2FtZXJhTW92ZVNjcmlwdCBmcm9tIFwiLi9jb21tb24vQ2FtZXJhTW92ZVNjcmlwdFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkUmVzb3VyY2VEZW1ve1xyXG5cdHByaXZhdGUgX3NjZW5lOkxheWEuU2NlbmUzRDtcclxuXHRwcml2YXRlIHNwcml0ZTNEOkxheWEuU3ByaXRlM0Q7XHJcblx0cHJpdmF0ZSBwYW5nemk6TGF5YS5TcHJpdGUzRDtcclxuXHRwcml2YXRlIHBhbmd6aUFuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuX3NjZW5lID1udWxsO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlM0QgPW51bGw7XHJcbiAgICAgICAgLy/liJ3lp4vljJblvJXmk45cclxuXHRcdExheWEzRC5pbml0KDAsIDApO1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcblx0XHRMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9OT05FO1xyXG5cdFx0Ly/mmL7npLrmgKfog73pnaLmnb9cclxuXHRcdExheWEuU3RhdC5zaG93KCk7XHJcblx0XHRcdFxyXG5cdFx0Ly/liqDovb3otYTmupBcclxuXHRcdHRoaXMuTG9hZFJlcygpO1xyXG5cdFx0XHRcclxuXHRcdC8v5om56YeP6aKE5Yqg6L295pa55byPXHJcblx0XHQvL3RoaXMuUHJlbG9hZGluZ1JlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIExvYWRSZXMoKXtcclxuICAgICAgICAvL+WcuuaZr+WKoOi9vVxyXG5cdFx0TGF5YS5TY2VuZTNELmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9zY2VuZS9YdW5Mb25nU2hpL1h1bkxvbmdTaGkubHNcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihzY2VuZSkge1xyXG5cdFx0XHR0aGlzLl9zY2VuZSA9IHNjZW5lO1xyXG5cdFx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHNjZW5lKTtcclxuXHRcdFx0Ly/mt7vliqDnm7jmnLpcclxuXHRcdFx0dmFyIGNhbWVyYSA9IG5ldyBMYXlhLkNhbWVyYSgpO1xyXG5cdFx0XHR0aGlzLl9zY2VuZS5hZGRDaGlsZChjYW1lcmEpO1xyXG5cdFx0XHQvL+iuvue9ruebuOacuua4healmuagh+iusO+8jOS9v+eUqOWkqeepulxyXG5cdFx0XHRjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcblx0XHRcdC8v6LCD5pW055u45py655qE5L2N572uXHJcblx0XHRcdGNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMywgMjAsIDQ3KSk7XHJcblx0XHRcdC8v55u45py66KeG6KeS5o6n5Yi257uE5Lu2KOiEmuacrClcclxuXHRcdFx0Y2FtZXJhLmFkZENvbXBvbmVudChDYW1lcmFNb3ZlU2NyaXB0KTtcclxuXHRcdFx0Ly/mt7vliqDlhYnnhadcclxuXHRcdFx0dmFyIGRpcmVjdGlvbkxpZ2h0ID0gdGhpcy5fc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKSk7XHJcblx0XHRcdGRpcmVjdGlvbkxpZ2h0LmNvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuXHRcdFx0ZGlyZWN0aW9uTGlnaHQudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAtMy4xNCAvIDMsIDAsIDApKTtcclxuXHRcdFx0XHJcblx0XHRcdC8v5p2Q6LSo5Yqg6L29XHJcblx0XHRcdExheWEuQmFzZU1hdGVyaWFsLmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za3lCb3gvc2t5Qm94Mi9za3lCb3gyLmxtYXRcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZShudWxsLCBmdW5jdGlvbihtYXQpOnZvaWQge1xyXG5cdFx0XHRcdC8v6I635Y+W55u45py655qE5aSp56m65riy5p+T5ZmoXHJcblx0XHRcdFx0dmFyIHNreVJlbmRlcmVyOkxheWEuU2t5UmVuZGVyZXIgPSBjYW1lcmEuc2t5UmVuZGVyZXI7XHJcblx0XHRcdFx0Ly/liJvlu7rlpKnnqbrnm5LnmoRtZXNoXHJcblx0XHRcdFx0c2t5UmVuZGVyZXIubWVzaCA9IExheWEuU2t5Qm94Lmluc3RhbmNlO1xyXG5cdFx0XHRcdC8v6K6+572u5aSp56m655uS5p2Q6LSoXHJcblx0XHRcdFx0c2t5UmVuZGVyZXIubWF0ZXJpYWwgPSBtYXQ7XHJcblx0XHRcdH0pKTtcclxuXHRcdFx0XHJcblx0XHRcdChzY2VuZS5nZXRDaGlsZEJ5TmFtZSgnU2NlbmVzJykuZ2V0Q2hpbGRCeU5hbWUoJ0hlaWdodE1hcCcpKS5hY3RpdmUgPSBmYWxzZTtcclxuXHRcdFx0KHNjZW5lLmdldENoaWxkQnlOYW1lKCdTY2VuZXMnKS5nZXRDaGlsZEJ5TmFtZSgnQXJlYScpICkuYWN0aXZlID0gZmFsc2U7XHJcblxyXG5cdFx0XHQvL+WKoOi9vee6ueeQhlxyXG5cdFx0XHRMYXlhLlRleHR1cmUyRC5sb2FkKFwicmVzL3RocmVlRGltZW4vdGV4dHVyZS9lYXJ0aC5wbmdcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZShudWxsLCBmdW5jdGlvbih0ZXgpOnZvaWQge1xyXG5cdFx0XHRcdC8v5L2/55So57q555CGXHJcblx0XHRcdFx0dmFyIGVhcnRoMSA9IHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlU3BoZXJlKDUsIDMyLCAzMikpKSBhcyBMYXlhLk1lc2hTcHJpdGUzRDtcclxuXHRcdFx0XHRlYXJ0aDEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDE3LCAyMCwgMCkpO1xyXG5cdFx0XHJcblx0XHRcdFx0dmFyIGVhcnRoTWF0ID0gbmV3IExheWEuQmxpbm5QaG9uZ01hdGVyaWFsKCk7XHJcblx0XHRcdFx0ZWFydGhNYXQuYWxiZWRvVGV4dHVyZSA9IHRleDtcclxuXHRcdFx0XHRlYXJ0aE1hdC5hbGJlZG9JbnRlbnNpdHkgPSAxO1xyXG5cdFx0XHRcdGVhcnRoMS5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBlYXJ0aE1hdDtcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/liqDovb1NZXNoXHJcblx0XHRcdExheWEuTWVzaC5sb2FkKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvQXNzZXRzL0xheWFNb25rZXkvTGF5YU1vbmtleS1MYXlhTW9ua2V5LmxtXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgZnVuY3Rpb24obWVzaCkge1xyXG5cdFx0XHRcdHZhciBsYXlhTW9ua2V5ID0gc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuTWVzaFNwcml0ZTNEKG1lc2gpKTtcclxuXHRcdFx0XHRsYXlhTW9ua2V5LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyg0LCA0LCA0KTtcclxuXHRcdFx0XHRsYXlhTW9ua2V5LnRyYW5zZm9ybS5yb3RhdGlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oMC43MDcxMDY4LCAwLCAwLCAtMC43MDcxMDY3KTtcclxuXHRcdFx0XHRsYXlhTW9ua2V5LnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMyg1LCAzLCAxMykpO1xyXG5cdFx0XHR9KSk7XHJcblx0XHRcdC8v5Yqg6L2957K+54G1XHJcblx0XHRcdExheWEuU3ByaXRlM0QubG9hZChcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0xheWFNb25rZXkubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihzcCkge1xyXG5cdFx0XHRcdHZhciBsYXlhTW9ua2V5MiA9IHNjZW5lLmFkZENoaWxkKHNwKTtcclxuXHRcdFx0XHRsYXlhTW9ua2V5Mi50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoNCwgNCwgNCk7XHJcblx0XHRcdFx0bGF5YU1vbmtleTIudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0xMCwgMTMsIDApKTtcclxuXHRcdFx0fSkpO1xyXG5cclxuXHRcdFx0Ly/liqDovb3og5blrZDnsr7ngbVcclxuXHRcdFx0TGF5YS5TcHJpdGUzRC5sb2FkKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvUGFuZ1ppTm9BbmkubGhcIiwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCBmdW5jdGlvbihzcDpMYXlhLlNwcml0ZTNEKTp2b2lkIHtcclxuXHRcdFx0XHR0aGlzLnBhbmd6aSA9IHNjZW5lLmFkZENoaWxkKHNwKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG5cdFx0XHRcdHRoaXMucGFuZ3ppLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyg0LCA0LCA0KTtcclxuXHRcdFx0XHR0aGlzLnBhbmd6aS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoLTIwLCAxMywgMCkpO1xyXG5cdFx0XHRcdC8v6I635Y+W5Yqo55S757uE5Lu2XHJcblx0XHRcdFx0dGhpcy5wYW5nemlBbmltYXRvciA9IHRoaXMucGFuZ3ppLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpIGFzIExheWEuQW5pbWF0b3I7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0TGF5YS5BbmltYXRpb25DbGlwLmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvQm9uZUxpbmtTY2VuZS9Bc3NldHMvTW9kZWwzRC9QYW5nWmktVGFrZSAwMDEubGFuaVwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uKGFuaUNsaXA6TGF5YS5BbmltYXRpb25DbGlwKTp2b2lkIHtcclxuXHRcdFx0XHRcdC8v5Yib5bu65Yqo5L2c54q25oCBXHJcblx0XHRcdFx0XHR2YXIgc3RhdGUxID0gbmV3IExheWEuQW5pbWF0b3JTdGF0ZSgpO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzlkI3np7BcclxuXHRcdFx0XHRcdHN0YXRlMS5uYW1lID0gXCJoZWxsb1wiO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzmkq3mlL7otbflp4vml7bpl7RcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwU3RhcnQgPSAwIC8gNTgxO1xyXG5cdFx0XHRcdFx0Ly/liqjkvZzmkq3mlL7nu5PmnZ/ml7bpl7RcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwRW5kID0gNTgxIC8gNTgxO1xyXG5cdFx0XHRcdFx0Ly/orr7nva7liqjkvZxcclxuXHRcdFx0XHRcdHN0YXRlMS5jbGlwID0gYW5pQ2xpcDtcclxuXHRcdFx0XHRcdC8v6K6+572u5Yqo5L2c5b6q546vXHJcblx0XHRcdFx0XHRzdGF0ZTEuY2xpcC5pc2xvb3BpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdFx0Ly/kuLrliqjnlLvnu4Tku7bmt7vliqDkuIDkuKrliqjkvZznirbmgIFcclxuXHRcdFx0XHRcdHRoaXMucGFuZ3ppQW5pbWF0b3IuYWRkU3RhdGUoc3RhdGUxKTtcclxuXHRcdFx0XHRcdC8v5pKt5pS+5Yqo5L2cXHJcblx0XHRcdFx0XHR0aGlzLnBhbmd6aUFuaW1hdG9yLnBsYXkoXCJoZWxsb1wiKTtcclxuXHRcdFx0XHR9KSk7XHRcclxuXHRcdFx0fSkpO1xyXG5cdFxyXG5cdFx0fSkpO1xyXG4gICAgfVxyXG4gICAgLy/mibnph4/pooTliqDovb3mlrnlvI9cclxuICAgIFByZWxvYWRpbmdSZXMoKXtcclxuICAgICAgICAvL+mihOWKoOi9veaJgOaciei1hOa6kFxyXG5cdFx0dmFyIHJlc291cmNlID0gW1xyXG4gICAgICAgICAgICBcInJlcy90aHJlZURpbWVuL3NjZW5lL1h1bkxvbmdTaGkvWHVuTG9uZ1NoaS5sc1wiLCAgXHJcbiAgICAgICAgICAgIFwicmVzL3RocmVlRGltZW4vc2t5Qm94L3NreUJveDIvc2t5Qm94Mi5sbWF0XCIsXHJcbiAgICAgICAgICAgIFwicmVzL3RocmVlRGltZW4vdGV4dHVyZS9lYXJ0aC5wbmdcIixcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9Bc3NldHMvTGF5YU1vbmtleS9MYXlhTW9ua2V5LUxheWFNb25rZXkubG1cIixcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCIsXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvQm9uZUxpbmtTY2VuZS9QYW5nWmlOb0FuaS5saFwiLCBcclxuXHRcdFx0XCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvQm9uZUxpbmtTY2VuZS9Bc3NldHMvTW9kZWwzRC9QYW5nWmktVGFrZSAwMDEubGFuaVwiXTtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKHJlc291cmNlLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25QcmVMb2FkRmluaXNoKSk7XHRcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25QcmVMb2FkRmluaXNoKCl7XHJcbiAgICAgICAgLy/liJ3lp4vljJYzROWcuuaZr1xyXG5cdFx0dGhpcy5fc2NlbmUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NjZW5lL1h1bkxvbmdTaGkvWHVuTG9uZ1NoaS5sc1wiKSkgYXMgTGF5YS5TY2VuZTNEO1xyXG5cdFx0XHJcblx0XHQvL+a3u+WKoOebuOaculxyXG5cdFx0dmFyIGNhbWVyYSA9IG5ldyBMYXlhLkNhbWVyYSgpO1xyXG5cdFx0dGhpcy5fc2NlbmUuYWRkQ2hpbGQoY2FtZXJhKTtcclxuXHRcdC8v6K6+572u55u45py65riF5qWa5qCH6K6w77yM5L2/55So5aSp56m6XHJcblx0XHRjYW1lcmEuY2xlYXJGbGFnID1MYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuXHRcdC8v6LCD5pW055u45py655qE5L2N572uXHJcblx0XHRjYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDMsIDIwLCA0NykpO1xyXG5cdFx0Ly/nm7jmnLrop4bop5LmjqfliLbnu4Tku7Yo6ISa5pysKVxyXG5cdFx0Y2FtZXJhLmFkZENvbXBvbmVudChDYW1lcmFNb3ZlU2NyaXB0KTtcclxuXHRcdFxyXG5cdFx0Ly/mt7vliqDlhYnnhadcclxuXHRcdHZhciBkaXJlY3Rpb25MaWdodCA9IG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCk7XHJcblx0XHR0aGlzLl9zY2VuZS5hZGRDaGlsZChkaXJlY3Rpb25MaWdodCk7XHJcblx0XHQvL+WFieeFp+minOiJslxyXG5cdFx0ZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG5cdFx0ZGlyZWN0aW9uTGlnaHQudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAtMy4xNCAvIDMsIDAsIDApKTtcclxuXHRcdFxyXG5cdFx0Ly/kvb/nlKjmnZDotKhcclxuXHRcdHZhciBza3lib3hNYXRlcmlhbCA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NreUJveC9za3lCb3gyL3NreUJveDIubG1hdFwiKTtcclxuXHRcdHZhciBza3lSZW5kZXJlciA9IGNhbWVyYS5za3lSZW5kZXJlcjtcclxuXHRcdHNreVJlbmRlcmVyLm1lc2ggPSBMYXlhLlNreUJveC5pbnN0YW5jZTtcclxuXHRcdHNreVJlbmRlcmVyLm1hdGVyaWFsID0gc2t5Ym94TWF0ZXJpYWw7XHJcblx0XHRcclxuXHRcdC8v5r+A5rS75Zy65pmv5Lit55qE5a2Q6IqC54K5XHJcblx0XHQodGhpcy5fc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoJ1NjZW5lcycpLmdldENoaWxkQnlOYW1lKCdIZWlnaHRNYXAnKSkuYWN0aXZlID0gZmFsc2U7XHJcblx0XHQodGhpcy5fc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoJ1NjZW5lcycpLmdldENoaWxkQnlOYW1lKCdBcmVhJykpLmFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0XHJcblx0XHQvL+S9v+eUqOe6ueeQhlxyXG5cdFx0dmFyIGVhcnRoMSA9IHRoaXMuX3NjZW5lLmFkZENoaWxkKG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlU3BoZXJlKDUsIDMyLCAzMikpKSBhcyBMYXlhLk1lc2hTcHJpdGUzRDtcclxuXHRcdGVhcnRoMS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMTcsIDIwLCAwKSk7XHJcblx0XHRcclxuXHRcdHZhciBlYXJ0aE1hdCA9IG5ldyBMYXlhLkJsaW5uUGhvbmdNYXRlcmlhbCgpO1xyXG5cdFx0ZWFydGhNYXQuYWxiZWRvVGV4dHVyZSA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3RleHR1cmUvZWFydGgucG5nXCIpO1xyXG5cdFx0ZWFydGhNYXQuYWxiZWRvSW50ZW5zaXR5ID0gMTtcclxuXHRcdGVhcnRoMS5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBlYXJ0aE1hdDtcclxuXHRcdFxyXG5cdFx0Ly/liJvlu7rkuIDkuKrnsr7ngbVcclxuXHRcdHRoaXMuc3ByaXRlM0QgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG5cdFx0dGhpcy5fc2NlbmUuYWRkQ2hpbGQodGhpcy5zcHJpdGUzRCk7XHJcblx0XHQvL+iOt+WPlk1lc2jotYTmupBcclxuXHRcdHZhciBtZXNoID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvQXNzZXRzL0xheWFNb25rZXkvTGF5YU1vbmtleS1MYXlhTW9ua2V5LmxtXCIpO1xyXG5cdFx0Ly/kuLrnsr7ngbXorr7nva5NZXNo6LWE5rqQXHJcblx0XHR2YXIgbGF5YU1vbmtleSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChtZXNoKTtcclxuXHRcdHRoaXMuc3ByaXRlM0QuYWRkQ2hpbGQobGF5YU1vbmtleSk7XHJcblx0XHRsYXlhTW9ua2V5LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyg0LCA0LCA0KTtcclxuXHRcdGxheWFNb25rZXkudHJhbnNmb3JtLnJvdGF0aW9uID0gbmV3IExheWEuUXVhdGVybmlvbigwLjcwNzEwNjgsIDAsIDAsIC0wLjcwNzEwNjcpO1xyXG5cdFx0bGF5YU1vbmtleS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoNSwgMywgMTMpKTtcclxuXHRcdFxyXG5cdFx0Ly/kvb/nlKjnsr7ngbVcclxuXHRcdHZhciBzcCA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9MYXlhTW9ua2V5L0xheWFNb25rZXkubGhcIik7XHJcblx0XHR2YXIgbGF5YU1vbmtleTIgPSB0aGlzLl9zY2VuZS5hZGRDaGlsZChzcCkgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcblx0XHRsYXlhTW9ua2V5Mi50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoNCwgNCwgNCk7XHJcblx0XHRsYXlhTW9ua2V5Mi50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoLTEwLCAxMywgMCkpO1xyXG5cdFx0Ly/kvb/nlKjnsr7ngbVcclxuXHRcdHRoaXMucGFuZ3ppID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvUGFuZ1ppTm9BbmkubGhcIik7XHJcblx0XHR0aGlzLl9zY2VuZS5hZGRDaGlsZCh0aGlzLnBhbmd6aSk7XHJcblx0XHR0aGlzLnBhbmd6aS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjMoNCwgNCwgNCk7XHJcblx0XHR0aGlzLnBhbmd6aS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoLTIwLCAxMywgMCkpO1xyXG5cdFx0Ly/ojrflj5bliqjnlLvnu4Tku7ZcclxuXHRcdHRoaXMucGFuZ3ppQW5pbWF0b3IgPSB0aGlzLnBhbmd6aS5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKSBhcyBMYXlhLkFuaW1hdG9yO1xyXG5cclxuXHRcdHZhciBwYW5nQW5pID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0JvbmVMaW5rU2NlbmUvQXNzZXRzL01vZGVsM0QvUGFuZ1ppLVRha2UgMDAxLmxhbmlcIikgYXMgTGF5YS5BbmltYXRpb25DbGlwO1xyXG5cdFx0Ly/liJvlu7rliqjkvZznirbmgIFcclxuXHRcdHZhciBzdGF0ZTEgPSBuZXcgTGF5YS5BbmltYXRvclN0YXRlKCk7XHJcblx0XHQvL+WKqOS9nOWQjeensFxyXG5cdFx0c3RhdGUxLm5hbWUgPSBcImhlbGxvXCI7XHJcblx0XHQvL+WKqOS9nOaSreaUvui1t+Wni+aXtumXtFxyXG5cdFx0c3RhdGUxLmNsaXBTdGFydCA9IDAgLyA1ODE7XHJcblx0XHQvL+WKqOS9nOaSreaUvue7k+adn+aXtumXtFxyXG5cdFx0c3RhdGUxLmNsaXBFbmQgPSA1ODEgLyA1ODE7XHJcblx0XHQvL+iuvue9ruWKqOS9nFxyXG5cdFx0c3RhdGUxLmNsaXAgPSBwYW5nQW5pO1xyXG5cdFx0Ly/orr7nva7liqjkvZzlvqrnjq9cclxuXHRcdHN0YXRlMS5jbGlwLmlzbG9vcGluZyA9IHRydWU7XHJcblx0XHQvL+S4uuWKqOeUu+e7hOS7tua3u+WKoOS4gOS4quWKqOS9nOeKtuaAgVxyXG5cdFx0dGhpcy5wYW5nemlBbmltYXRvci5hZGRTdGF0ZShzdGF0ZTEpO1xyXG5cdFx0Ly/mkq3mlL7liqjkvZxcclxuXHRcdHRoaXMucGFuZ3ppQW5pbWF0b3IucGxheShcImhlbGxvXCIpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhTW92ZVNjcmlwdCBleHRlbmRzIExheWEuU2NyaXB0M0Qge1xyXG5cdFx0XHJcbiAgICAvKiogQHByaXZhdGUgKi9cclxuICAgIHByb3RlY3RlZCAgX3RlbXBWZWN0b3IzOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIHByb3RlY3RlZCAgbGFzdE1vdXNlWDpudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgIGxhc3RNb3VzZVk6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkICB5YXdQaXRjaFJvbGw6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgcHJvdGVjdGVkICByZXN1bHRSb3RhdGlvbjpMYXlhLlF1YXRlcm5pb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICBwcm90ZWN0ZWQgIHRlbXBSb3RhdGlvblo6TGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgcHJvdGVjdGVkICB0ZW1wUm90YXRpb25YOkxheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgIHByb3RlY3RlZCAgdGVtcFJvdGF0aW9uWTpMYXlhLlF1YXRlcm5pb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICBwcm90ZWN0ZWQgIGlzTW91c2VEb3duOkJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgIHJvdGFpb25TcGVlZDpudW1iZXIgPSAwLjAwMDA2O1xyXG4gICAgcHJvdGVjdGVkICBjYW1lcmE6TGF5YS5CYXNlQ2FtZXJhO1xyXG4gICAgcHJvdGVjdGVkICBzY2VuZTpMYXlhLlNjZW5lM0Q7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgIF91cGRhdGVSb3RhdGlvbigpOnZvaWQge1xyXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnlhd1BpdGNoUm9sbC55KSA8IDEuNTApIHtcclxuICAgICAgICAgICAgTGF5YS5RdWF0ZXJuaW9uLmNyZWF0ZUZyb21ZYXdQaXRjaFJvbGwodGhpcy55YXdQaXRjaFJvbGwueCwgdGhpcy55YXdQaXRjaFJvbGwueSwgdGhpcy55YXdQaXRjaFJvbGwueiwgdGhpcy50ZW1wUm90YXRpb25aKTtcclxuICAgICAgICAgICAgdGhpcy50ZW1wUm90YXRpb25aLmNsb25lVG8odGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbiA9IHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBAaW5oZXJpdERvY1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgIG9uQXdha2UoKTp2b2lkIHtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUklHSFRfTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5tb3VzZURvd24pO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SSUdIVF9NT1VTRV9VUCwgdGhpcywgdGhpcy5tb3VzZVVwKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uub24oRXZlbnQuUklHSFRfTU9VU0VfT1VULCB0aGlzLCBtb3VzZU91dCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSB0aGlzLm93bmVyIGFzIExheWEuQ2FtZXJhO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0RG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyAgb25VcGRhdGUoKTp2b2lkIHtcclxuICAgICAgICB2YXIgZWxhcHNlZFRpbWU6bnVtYmVyID0gTGF5YS50aW1lci5kZWx0YTtcclxuICAgICAgICBpZiAoIWlzTmFOKHRoaXMubGFzdE1vdXNlWCkgJiYgIWlzTmFOKHRoaXMubGFzdE1vdXNlWSkgJiYgdGhpcy5pc01vdXNlRG93bikge1xyXG4gICAgICAgICAgICB2YXIgc2NlbmU6TGF5YS5TY2VuZTNEID0gdGhpcy5vd25lci5zY2VuZTtcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big4NykgJiYgdGhpcy5tb3ZlRm9yd2FyZCgtMC4wMSAqIGVsYXBzZWRUaW1lKTsvL1dcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big4MykgJiYgdGhpcy5tb3ZlRm9yd2FyZCgwLjAxICogZWxhcHNlZFRpbWUpOy8vU1xyXG4gICAgICAgICAgICBMYXlhLktleUJvYXJkTWFuYWdlci5oYXNLZXlEb3duKDY1KSAmJiB0aGlzLm1vdmVSaWdodCgtMC4wMSAqIGVsYXBzZWRUaW1lKTsvL0FcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big2OCkgJiYgdGhpcy5tb3ZlUmlnaHQoMC4wMSAqIGVsYXBzZWRUaW1lKTsvL0RcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big4MSkgJiYgdGhpcy5tb3ZlVmVydGljYWwoMC4wMSAqIGVsYXBzZWRUaW1lKTsvL1FcclxuICAgICAgICAgICAgTGF5YS5LZXlCb2FyZE1hbmFnZXIuaGFzS2V5RG93big2OSkgJiYgdGhpcy5tb3ZlVmVydGljYWwoLTAuMDEgKiBlbGFwc2VkVGltZSk7Ly9FXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0WDpudW1iZXIgPSBMYXlhLnN0YWdlLm1vdXNlWCAtIHRoaXMubGFzdE1vdXNlWDtcclxuICAgICAgICAgICAgdmFyIG9mZnNldFk6bnVtYmVyID0gTGF5YS5zdGFnZS5tb3VzZVkgLSB0aGlzLmxhc3RNb3VzZVk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgeXByRWxlbTpMYXlhLlZlY3RvcjMgPSB0aGlzLnlhd1BpdGNoUm9sbDtcclxuICAgICAgICAgICAgeXByRWxlbS54IC09IG9mZnNldFggKiB0aGlzLnJvdGFpb25TcGVlZCAqIGVsYXBzZWRUaW1lO1xyXG4gICAgICAgICAgICB5cHJFbGVtLnkgLT0gb2Zmc2V0WSAqIHRoaXMucm90YWlvblNwZWVkICogZWxhcHNlZFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVJvdGF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWCA9IExheWEuc3RhZ2UubW91c2VYO1xyXG4gICAgICAgIHRoaXMubGFzdE1vdXNlWSA9IExheWEuc3RhZ2UubW91c2VZO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIEBpbmhlcml0RG9jXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyAgb25EZXN0cm95KCk6dm9pZCB7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5SSUdIVF9NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLm1vdXNlRG93bik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vZmYoTGF5YS5FdmVudC5SSUdIVF9NT1VTRV9VUCwgdGhpcywgdGhpcy5tb3VzZVVwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkICBtb3VzZURvd24oZTpFdmVudCk6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb24uZ2V0WWF3UGl0Y2hSb2xsKHRoaXMueWF3UGl0Y2hSb2xsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVggPSBMYXlhLnN0YWdlLm1vdXNlWDtcclxuICAgICAgICB0aGlzLmxhc3RNb3VzZVkgPSBMYXlhLnN0YWdlLm1vdXNlWTtcclxuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkICBtb3VzZVVwKGU6RXZlbnQpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkICBtb3VzZU91dChlOkV2ZW50KTp2b2lkIHtcclxuICAgICAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5ZCR5YmN56e75Yqo44CCXHJcbiAgICAgKiBAcGFyYW0gZGlzdGFuY2Ug56e75Yqo6Led56a744CCXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyAgbW92ZUZvcndhcmQoZGlzdGFuY2U6bnVtYmVyKTp2b2lkIHtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy54ID0gdGhpcy5fdGVtcFZlY3RvcjMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueiA9IGRpc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fdGVtcFZlY3RvcjMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOWQkeWPs+enu+WKqOOAglxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlIOenu+WKqOi3neemu+OAglxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbW92ZVJpZ2h0KGRpc3RhbmNlOm51bWJlcik6dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGVtcFZlY3RvcjMueSA9IHRoaXMuX3RlbXBWZWN0b3IzLnogPSAwO1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnggPSBkaXN0YW5jZTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKHRoaXMuX3RlbXBWZWN0b3IzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDlkJHkuIrnp7vliqjjgIJcclxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSDnp7vliqjot53nprvjgIJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG1vdmVWZXJ0aWNhbChkaXN0YW5jZTpudW1iZXIpOnZvaWQge1xyXG4gICAgICAgIHRoaXMuX3RlbXBWZWN0b3IzLnggPSB0aGlzLl90ZW1wVmVjdG9yMy56ID0gMDtcclxuICAgICAgICB0aGlzLl90ZW1wVmVjdG9yMy55ID0gZGlzdGFuY2U7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZSh0aGlzLl90ZW1wVmVjdG9yMywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==
