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
            "res/threeDimen/skinModel/Polytope/Test.lh"
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
        this.role.meshRenderer.material = Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources//Materials/PT_Medieval_mat.lmat");
        this.role.transform.position.setValue(0, 0, 0);
        this.role.transform.localScale.setValue(0.5, 0.5, 0.5);
        //this.role.transform.rotate(new Laya.Vector3(-3.14 / 2, 0, 0));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvVW5pdHlFeHBvcnRUZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBLDREQUFzRDtBQUt0RDtJQUNJO1FBQ0ksSUFBSSx5QkFBZSxFQUFFLENBQUM7UUFDdEIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQiwwQkFBMEI7SUFDOUIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQUNELE9BQU87QUFDUCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDZlg7SUFXSTtRQU5RLGFBQVEsR0FBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEQsV0FBTSxHQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuRCxVQUFLLEdBQWdCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLGVBQVUsR0FBVSxDQUFDLENBQUM7UUFDekIsZUFBVSxHQUFVLENBQUMsQ0FBQztRQUd2QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUUvQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hD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RSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDdkQsZ0VBQWdFO1FBRWhFLHNCQUFzQjtRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsaUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQTFFQSxBQTBFQyxJQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFVuaXR5RXhwb3J0VGVzdCBmcm9tIFwiLi9zY3JpcHQvVW5pdHlFeHBvcnRUZXN0XCJcclxuaW1wb3J0IFRyYW5zZm9ybURlbW8gZnJvbSBcIi4vc2NyaXB0L1RyYW5zZm9ybURlbW9cIjtcclxuaW1wb3J0IFNwcml0ZTNETG9hZCBmcm9tIFwiLi9zY3JpcHQvU3ByaXRlM0RMb2FkXCI7XHJcbmltcG9ydCBNYXRlcmlhbEFuaW1hdGlvbiBmcm9tIFwiLi9zY3JpcHQvTWF0ZXJpYWxBbmltYXRpb25cIlxyXG5cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBuZXcgVW5pdHlFeHBvcnRUZXN0KCk7XHJcbiAgICAgICAgLy9uZXcgVHJhbnNmb3JtRGVtbygpO1xyXG4gICAgICAgIC8vbmV3IFNwcml0ZTNETG9hZCgpO1xyXG4gICAgICAgIC8vbmV3IE1hdGVyaWFsQW5pbWF0aW9uKCk7XHJcbiAgICB9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0eUV4cG9ydFRlc3Qge1xyXG4gICAgcHJpdmF0ZSBzY2VuZTogTGF5YS5TY2VuZTNEO1xyXG4gICAgcHJpdmF0ZSBjYW1lcmE6IExheWEuQ2FtZXJhO1xyXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb25MaWdodDogTGF5YS5EaXJlY3Rpb25MaWdodDtcclxuICAgIHByaXZhdGUgcm9sZTogTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIHBvc2l0aW9uOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMCk7XHJcbiAgICBwcml2YXRlIHJvdGF0ZTpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDEsIDApO1xyXG5cdHByaXZhdGUgc2NhbGU6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgcHJpdmF0ZSBzY2FsZURlbHRhOm51bWJlciA9IDA7XHJcblx0cHJpdmF0ZSBzY2FsZVZhbHVlOm51bWJlciA9IDA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgTGF5YTNELmluaXQoMCwgMCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fTk9ORTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBMYXlhLlNjZW5lM0QoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuc2NlbmUpO1xyXG5cclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBMYXlhLkNhbWVyYSgwLCAwLjEsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGRDaGlsZCh0aGlzLmNhbWVyYSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAuOCwgNSkpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMTUsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcblxyXG5cdFx0dGhpcy5kaXJlY3Rpb25MaWdodD0gbmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKTtcclxuXHRcdHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5kaXJlY3Rpb25MaWdodCk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5jb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoIC0zLjE0IC8gMywgMCwgMCkpO1xyXG5cclxuICAgICAgICAvL+eBr+WFieW8gOWQr+mYtOW9sVxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93ID0gdHJ1ZTtcclxuICAgICAgICAvL+WPr+ingemYtOW9sei3neemu1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93RGlzdGFuY2UgPSAzO1xyXG4gICAgICAgIC8v55Sf5oiQ6Zi05b2x6LS05Zu+5bC65a+4XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5zaGFkb3dSZXNvbHV0aW9uID0gMjA0ODtcclxuICAgICAgICAvL+eUn+aIkOmYtOW9sei0tOWbvuaVsOmHj1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UFNTTUNvdW50ID0gMTtcclxuICAgICAgICAvL+aooeeziuetiee6pyzotorlpKfotorpq5gs5pu06ICX5oCn6IO9XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb25MaWdodC5zaGFkb3dQQ0ZUeXBlID0gMztcclxuXHJcbiAgICAgICAgLy/mibnph4/pooTliqDovb3otYTmupBcclxuXHRcdExheWEubG9hZGVyLmNyZWF0ZShbXHJcblx0XHRcdFwicmVzL3RocmVlRGltZW4vc3RhdGljTW9kZWwvZ3JpZC9wbGFuZS5saFwiLCBcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvVGVzdC5saFwiXHJcblx0XHRdLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgLy/liqDovb3lnLDpnaJcclxuICAgICAgICB2YXIgZ3JpZCA9IHRoaXMuc2NlbmUuYWRkQ2hpbGQoTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc3RhdGljTW9kZWwvZ3JpZC9wbGFuZS5saFwiKSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICAvL+WcsOmdouaOpeaUtumYtOW9sVxyXG4gICAgICAgIChncmlkLmdldENoaWxkQXQoMCkgYXMgTGF5YS5NZXNoU3ByaXRlM0QpLm1lc2hSZW5kZXJlci5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/liqDovb3op5LoibJcclxuICAgICAgICB0aGlzLnJvbGUgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL1BvbHl0b3BlL0Fzc2V0cy9Qb2x5dG9wZS9DaGFyYWN0ZXJzL1NvdXJjZXMvTWVzaGVzL1BUX01lZGlldmFsX0ZlbWFsZV9QZWFzYW50XzAxX2EtUFRfTWVkaWV2YWxfRmVtYWxlX1BlYXNhbnRfMDEubG1cIikpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5yb2xlKTtcclxuICAgICAgICAvL+iuvue9ruadkOi0qFxyXG4gICAgICAgIHRoaXMucm9sZS5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy8vTWF0ZXJpYWxzL1BUX01lZGlldmFsX21hdC5sbWF0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uLnNldFZhbHVlKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMucm9sZS50cmFuc2Zvcm0ubG9jYWxTY2FsZS5zZXRWYWx1ZSgwLjUsIDAuNSwgMC41KTtcclxuICAgICAgICAvL3RoaXMucm9sZS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTMuMTQgLyAyLCAwLCAwKSk7XHJcblxyXG4gICAgICAgIC8v6K6+572u5a6a5pe25Zmo5omn6KGMLOWumuaXtumHjeWkjeaJp+ihjCjln7rkuo7luKfnjocpXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5hbmltYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IE1hdGguc2luKHRoaXMuc2NhbGVEZWx0YSArPSAwLjEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IE1hdGgubWF4KDAsIHRoaXMuc2NhbGVWYWx1ZSAvIDIpOztcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnJvdGF0ZSh0aGlzLnJvdGF0ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==
