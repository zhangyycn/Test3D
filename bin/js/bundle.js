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
var UnityExportTest_1 = require("./script/UnityExportTest");
var Main = /** @class */ (function () {
    function Main() {
        new UnityExportTest_1.default();
        //new TransformDemo();
        //new Sprite3DLoad();
        //new MaterialAnimation();
        //new LoadResourceDemo();
        //new AnimatorDemo();
        //new PhysicsWorld_BaseCollider();
        //new HuaYing();
    }
    return Main;
}());
//激活启动类
new Main();
},{"./script/UnityExportTest":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UnityExportTest = /** @class */ (function () {
    function UnityExportTest() {
        this.position = new Laya.Vector3(0, 0, 0);
        this.rotate = new Laya.Vector3(0, 1, 0);
        this.scale = new Laya.Vector3();
        this.scaleDelta = 0;
        this.scaleValue = 0;
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
        this.scene = new Laya.Scene3D();
        Laya.stage.addChild(this.scene);
        this.camera = new Laya.Camera(0, 0.1, 100);
        this.scene.addChild(this.camera);
        this.camera.transform.translate(new Laya.Vector3(0, 0.8, 5));
        this.camera.transform.rotate(new Laya.Vector3(-15, 0, 0), true, false);
        this.directionLight = new Laya.DirectionLight();
        this.scene.addChild(this.directionLight);
        this.directionLight.color = new Laya.Vector3(1, 1, 1);
        this.directionLight.transform.rotate(new Laya.Vector3(-3.14 / 3, 0, 0));
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
            "res/threeDimen/skinModel/Polytope/Polytope.lh"
        ], Laya.Handler.create(this, this.onComplete));
    }
    UnityExportTest.prototype.onComplete = function () {
        //加载地面
        var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh"));
        //地面接收阴影
        grid.getChildAt(0).meshRenderer.receiveShadow = true;
        //加载角色
        this.role = new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Meshes/PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01.lm"));
        this.scene.addChild(this.role);
        //设置材质
        this.role.meshRenderer.material = Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Materials/PT_Medieval_mat.lmat");
        this.role.transform.position.setValue(0, 0, 0);
        this.role.transform.localScale.setValue(0.5, 0.5, 0.5);
        //this.role.transform.rotate(new Laya.Vector3(-3.14 / 2, 0, 0));
        /*
        Laya.Sprite3D.load("res/threeDimen/skinModel/Polytope/Test.lh", Laya.Handler.create(this, function(sp) {
            var test_role = this.scene.addChild(sp);
            test_role.transform.localScale = new Laya.Vector3(0.5, 0.5, 0.5);
            test_role.transform.translate(new Laya.Vector3(0, 0, 0));
        }));
        */
        //设置定时器执行,定时重复执行(基于帧率)
        Laya.timer.frameLoop(1, this, this.animate);
    };
    UnityExportTest.prototype.animate = function () {
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);
        this.position.y = Math.max(0, this.scaleValue / 2);
        ;
        this.role.transform.position = this.position;
        this.role.transform.rotate(this.rotate, false, false);
    };
    return UnityExportTest;
}());
exports.default = UnityExportTest;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvVW5pdHlFeHBvcnRUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBLDREQUFzRDtBQVN0RDtJQUNJO1FBQ0ksSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDdEIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQixrQ0FBa0M7UUFDbEMsZ0JBQWdCO0lBQ3BCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FYQSxBQVdDLElBQUE7QUFFRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQ3hCWDtJQVdJO1FBTlEsYUFBUSxHQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxXQUFNLEdBQWdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELFVBQUssR0FBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUN6QixlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBR3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBRS9DLElB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Q0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2RCxnRUFBZ0U7UUFHaEU7Ozs7OztVQU1FO1FBRUYsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxpQ0FBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUFBLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDTCxzQkFBQztBQUFELENBcEZBLEFBb0ZDLElBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgVW5pdHlFeHBvcnRUZXN0IGZyb20gXCIuL3NjcmlwdC9Vbml0eUV4cG9ydFRlc3RcIlxyXG5pbXBvcnQgVHJhbnNmb3JtRGVtbyBmcm9tIFwiLi9zY3JpcHQvVHJhbnNmb3JtRGVtb1wiO1xyXG5pbXBvcnQgU3ByaXRlM0RMb2FkIGZyb20gXCIuL3NjcmlwdC9TcHJpdGUzRExvYWRcIjtcclxuaW1wb3J0IE1hdGVyaWFsQW5pbWF0aW9uIGZyb20gXCIuL3NjcmlwdC9NYXRlcmlhbEFuaW1hdGlvblwiXHJcbmltcG9ydCBMb2FkUmVzb3VyY2VEZW1vIGZyb20gXCIuL3NjcmlwdC9Mb2FkUmVzb3VyY2VEZW1vXCJcclxuaW1wb3J0IEFuaW1hdG9yRGVtbyBmcm9tIFwiLi9zY3JpcHQvQW5pbWF0b3JEZW1vXCJcclxuaW1wb3J0IFBoeXNpY3NXb3JsZF9CYXNlQ29sbGlkZXIgZnJvbSBcIi4vc2NyaXB0L1BoeXNpY3NXb3JsZF9CYXNlQ29sbGlkZXJcIlxyXG5pbXBvcnQgSHVhWWluZyBmcm9tIFwiLi9zY3JpcHQvSHVhWWluZ1wiXHJcblxyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIG5ldyBVbml0eUV4cG9ydFRlc3QoKTtcclxuICAgICAgICAvL25ldyBUcmFuc2Zvcm1EZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgU3ByaXRlM0RMb2FkKCk7XHJcbiAgICAgICAgLy9uZXcgTWF0ZXJpYWxBbmltYXRpb24oKTtcclxuICAgICAgICAvL25ldyBMb2FkUmVzb3VyY2VEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgQW5pbWF0b3JEZW1vKCk7XHJcbiAgICAgICAgLy9uZXcgUGh5c2ljc1dvcmxkX0Jhc2VDb2xsaWRlcigpO1xyXG4gICAgICAgIC8vbmV3IEh1YVlpbmcoKTtcclxuICAgIH1cclxufVxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0eUV4cG9ydFRlc3Qge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogTGF5YS5TY2VuZTNEO1xyXG4gICAgcHJpdmF0ZSBjYW1lcmE6IExheWEuQ2FtZXJhO1xyXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb25MaWdodDogTGF5YS5EaXJlY3Rpb25MaWdodDtcclxuICAgIHByaXZhdGUgcm9sZTogTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIHBvc2l0aW9uOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICBwcml2YXRlIHJvdGF0ZTpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDEsIDApO1xyXG5cdHByaXZhdGUgc2NhbGU6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgcHJpdmF0ZSBzY2FsZURlbHRhOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBzY2FsZVZhbHVlOm51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgTGF5YTNELmluaXQoMCwgMCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fTk9ORTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBMYXlhLlNjZW5lM0QoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBMYXlhLkNhbWVyYSgwLCAwLjEsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGRDaGlsZCh0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAuOCwgNSkpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMTUsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcblxyXG5cdFx0dGhpcy5kaXJlY3Rpb25MaWdodD0gbmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKTtcclxuXHRcdHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5kaXJlY3Rpb25MaWdodCk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5jb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoIC0zLjE0IC8gMywgMCwgMCkpO1xyXG5cclxuICAgICAgICAvL+eBr+WFieW8gOWQr+mYtOW9sVxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93ID0gdHJ1ZTtcclxuICAgICAgICAvL+WPr+ingemYtOW9sei3neemu1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93RGlzdGFuY2UgPSAzO1xyXG4gICAgICAgIC8v55Sf5oiQ6Zi05b2x6LS05Zu+5bC65a+4XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5zaGFkb3dSZXNvbHV0aW9uID0gMjA0ODtcclxuICAgICAgICAvL+eUn+aIkOmYtOW9sei0tOWbvuaVsOmHj1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UFNTTUNvdW50ID0gMTtcclxuICAgICAgICAvL+aooeeziuetiee6pyzotorlpKfotorpq5gs5pu06ICX5oCn6IO9XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5zaGFkb3dQQ0ZUeXBlID0gMztcclxuXHJcbiAgICAgICAgLy/mibnph4/pooTliqDovb3otYTmupBcclxuXHRcdExheWEubG9hZGVyLmNyZWF0ZShbXHJcblx0XHRcdFwicmVzL3RocmVlRGltZW4vc3RhdGljTW9kZWwvZ3JpZC9wbGFuZS5saFwiLCBcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvUG9seXRvcGUubGhcIlxyXG5cdFx0XSwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCB0aGlzLm9uQ29tcGxldGUpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgIC8v5Yqg6L295Zyw6Z2iXHJcbiAgICAgICAgdmFyIGdyaWQgPSB0aGlzLnNjZW5lLmFkZENoaWxkKExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3N0YXRpY01vZGVsL2dyaWQvcGxhbmUubGhcIikpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgLy/lnLDpnaLmjqXmlLbpmLTlvbFcclxuICAgICAgICAoZ3JpZC5nZXRDaGlsZEF0KDApIGFzIExheWEuTWVzaFNwcml0ZTNEKS5tZXNoUmVuZGVyZXIucmVjZWl2ZVNoYWRvdyA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAvL+WKoOi9veinkuiJslxyXG4gICAgICAgIHRoaXMucm9sZSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy9NZXNoZXMvUFRfTWVkaWV2YWxfRmVtYWxlX1BlYXNhbnRfMDFfYS1QVF9NZWRpZXZhbF9GZW1hbGVfUGVhc2FudF8wMS5sbVwiKSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGRDaGlsZCh0aGlzLnJvbGUpO1xyXG4gICAgICAgIC8v6K6+572u5p2Q6LSoXHJcbiAgICAgICAgdGhpcy5yb2xlLm1lc2hSZW5kZXJlci5tYXRlcmlhbCA9IExheWEuTG9hZGVyLmdldFJlcyhcInJlcy90aHJlZURpbWVuL3NraW5Nb2RlbC9Qb2x5dG9wZS9Bc3NldHMvUG9seXRvcGUvQ2hhcmFjdGVycy9Tb3VyY2VzL01hdGVyaWFscy9QVF9NZWRpZXZhbF9tYXQubG1hdFwiKTtcclxuXHJcbiAgICAgICAgdGhpcy5yb2xlLnRyYW5zZm9ybS5wb3NpdGlvbi5zZXRWYWx1ZSgwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLmxvY2FsU2NhbGUuc2V0VmFsdWUoMC41LCAwLjUsIDAuNSk7XHJcbiAgICAgICAgLy90aGlzLnJvbGUudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKC0zLjE0IC8gMiwgMCwgMCkpO1xyXG5cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBMYXlhLlNwcml0ZTNELmxvYWQoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvVGVzdC5saFwiLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIGZ1bmN0aW9uKHNwKSB7XHJcbiAgICAgICAgICAgIHZhciB0ZXN0X3JvbGUgPSB0aGlzLnNjZW5lLmFkZENoaWxkKHNwKTtcclxuICAgICAgICAgICAgdGVzdF9yb2xlLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMygwLjUsIDAuNSwgMC41KTtcclxuICAgICAgICAgICAgdGVzdF9yb2xlLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAwLCAwKSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIC8v6K6+572u5a6a5pe25Zmo5omn6KGMLOWumuaXtumHjeWkjeaJp+ihjCjln7rkuo7luKfnjocpXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5hbmltYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IE1hdGguc2luKHRoaXMuc2NhbGVEZWx0YSArPSAwLjEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IE1hdGgubWF4KDAsIHRoaXMuc2NhbGVWYWx1ZSAvIDIpOztcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnJvdGF0ZSh0aGlzLnJvdGF0ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==
