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
    }
    return Main;
}());
//激活启动类
new Main();
},{"./script/Sprite3DLoad":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sprite3DLoad = /** @class */ (function () {
    function Sprite3DLoad() {
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
            //"res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"
            "res/threeDimen/skinModel/Polytope/Test.lh"
        ], Laya.Handler.create(this, this.onComplete));
    }
    Sprite3DLoad.prototype.onComplete = function () {
        //加载地面
        var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh"));
        //地面接收阴影
        grid.getChildAt(0).meshRenderer.receiveShadow = true;
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
    };
    Sprite3DLoad.prototype.animate = function () {
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);
        this.position.y = Math.max(0, this.scaleValue / 2);
        ;
        this.role.transform.position = this.position;
        this.role.transform.rotate(this.rotate, false, false);
    };
    return Sprite3DLoad;
}());
exports.default = Sprite3DLoad;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyIsInNyYy9zY3JpcHQvU3ByaXRlM0RMb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1JBLHNEQUFpRDtBQUVqRDtJQUNJO1FBQ0ksc0JBQXNCO1FBQ3RCLElBQUksc0JBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FMQSxBQUtDLElBQUE7QUFDRCxPQUFPO0FBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQ1hYO0lBV0k7UUFOUSxhQUFRLEdBQWdCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xELFdBQU0sR0FBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsVUFBSyxHQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxlQUFVLEdBQVUsQ0FBQyxDQUFDO1FBQ3pCLGVBQVUsR0FBVSxDQUFDLENBQUM7UUFHdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7UUFFL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FB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RSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELGdFQUFnRTtRQUVoRSxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0E3RUEsQUE2RUMsSUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCI7XHJcbmltcG9ydCBUcmFuc2Zvcm1EZW1vIGZyb20gXCIuL3NjcmlwdC9UcmFuc2Zvcm1EZW1vXCI7XHJcbmltcG9ydCBTcHJpdGUzRExvYWQgZnJvbSBcIi4vc2NyaXB0L1Nwcml0ZTNETG9hZFwiO1xyXG5cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAvL25ldyBUcmFuc2Zvcm1EZW1vKCk7XHJcbiAgICAgICAgbmV3IFNwcml0ZTNETG9hZCgpO1xyXG4gICAgfVxyXG59XHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlM0RMb2FkIHtcclxuICAgIHByaXZhdGUgc2NlbmU6IExheWEuU2NlbmUzRDtcclxuICAgIHByaXZhdGUgY2FtZXJhOiBMYXlhLkNhbWVyYTtcclxuICAgIHByaXZhdGUgZGlyZWN0aW9uTGlnaHQ6IExheWEuRGlyZWN0aW9uTGlnaHQ7XHJcbiAgICBwcml2YXRlIHJvbGU6IExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBwb3NpdGlvbjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApO1xyXG4gICAgcHJpdmF0ZSByb3RhdGU6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCAxLCAwKTtcclxuXHRwcml2YXRlIHNjYWxlOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIHByaXZhdGUgc2NhbGVEZWx0YTpudW1iZXIgPSAwO1xyXG5cdHByaXZhdGUgc2NhbGVWYWx1ZTpudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsIDApO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX05PTkU7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgTGF5YS5TY2VuZTNEKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnNjZW5lKTtcclxuXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAxMDApO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkQ2hpbGQodGhpcy5jYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAwLjgsIDUpKTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTE1LCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG5cclxuXHRcdHRoaXMuZGlyZWN0aW9uTGlnaHQ9IG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCk7XHJcblx0XHR0aGlzLnNjZW5lLmFkZENoaWxkKHRoaXMuZGlyZWN0aW9uTGlnaHQpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAtMy4xNCAvIDMsIDAsIDApKTtcclxuXHJcbiAgICAgICAgLy/nga/lhYnlvIDlkK/pmLTlvbFcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvdyA9IHRydWU7XHJcbiAgICAgICAgLy/lj6/op4HpmLTlvbHot53nprtcclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvd0Rpc3RhbmNlID0gMztcclxuICAgICAgICAvL+eUn+aIkOmYtOW9sei0tOWbvuWwuuWvuFxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UmVzb2x1dGlvbiA9IDIwNDg7XHJcbiAgICAgICAgLy/nlJ/miJDpmLTlvbHotLTlm77mlbDph49cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbkxpZ2h0LnNoYWRvd1BTU01Db3VudCA9IDE7XHJcbiAgICAgICAgLy/mqKHns4rnrYnnuqcs6LaK5aSn6LaK6auYLOabtOiAl+aAp+iDvVxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uTGlnaHQuc2hhZG93UENGVHlwZSA9IDM7XHJcblxyXG4gICAgICAgIC8v5om56YeP6aKE5Yqg6L296LWE5rqQXHJcblx0XHRMYXlhLmxvYWRlci5jcmVhdGUoW1xyXG5cdFx0XHRcInJlcy90aHJlZURpbWVuL3N0YXRpY01vZGVsL2dyaWQvcGxhbmUubGhcIiwgXHJcbiAgICAgICAgICAgIC8vXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9MYXlhTW9ua2V5LmxoXCJcclxuICAgICAgICAgICAgXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvVGVzdC5saFwiXHJcblx0XHRdLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsIHRoaXMub25Db21wbGV0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ29tcGxldGUoKSB7XHJcbiAgICAgICAgLy/liqDovb3lnLDpnaJcclxuICAgICAgICB2YXIgZ3JpZCA9IHRoaXMuc2NlbmUuYWRkQ2hpbGQoTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc3RhdGljTW9kZWwvZ3JpZC9wbGFuZS5saFwiKSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICAvL+WcsOmdouaOpeaUtumYtOW9sVxyXG4gICAgICAgIChncmlkLmdldENoaWxkQXQoMCkgYXMgTGF5YS5NZXNoU3ByaXRlM0QpLm1lc2hSZW5kZXJlci5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy/liqDovb3op5LoibJcclxuICAgICAgICAvL3RoaXMucm9sZSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvTGF5YU1vbmtleS9Bc3NldHMvTGF5YU1vbmtleS9MYXlhTW9ua2V5LUxheWFNb25rZXkubG1cIikpO1xyXG4gICAgICAgIHRoaXMucm9sZSA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy9NZXNoZXMvUFRfTWVkaWV2YWxfRmVtYWxlX1BlYXNhbnRfMDFfYS1QVF9NZWRpZXZhbF9GZW1hbGVfUGVhc2FudF8wMS5sbVwiKSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGRDaGlsZCh0aGlzLnJvbGUpO1xyXG4gICAgICAgIC8v6K6+572u5p2Q6LSoXHJcbiAgICAgICAgLy90aGlzLnJvbGUubWVzaFJlbmRlcmVyLm1hdGVyaWFsID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKFwicmVzL3RocmVlRGltZW4vc2tpbk1vZGVsL0xheWFNb25rZXkvQXNzZXRzL0xheWFNb25rZXkvTWF0ZXJpYWxzL1RfRGlmZnVzZS5sbWF0XCIpO1xyXG4gICAgICAgIHRoaXMucm9sZS5tZXNoUmVuZGVyZXIubWF0ZXJpYWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoXCJyZXMvdGhyZWVEaW1lbi9za2luTW9kZWwvUG9seXRvcGUvQXNzZXRzL1BvbHl0b3BlL0NoYXJhY3RlcnMvU291cmNlcy8vTWF0ZXJpYWxzL1BUX01lZGlldmFsX21hdC5sbWF0XCIpO1xyXG5cclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uLnNldFZhbHVlKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMucm9sZS50cmFuc2Zvcm0ubG9jYWxTY2FsZS5zZXRWYWx1ZSgwLjUsIDAuNSwgMC41KTtcclxuICAgICAgICAvL3RoaXMucm9sZS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoLTMuMTQgLyAyLCAwLCAwKSk7XHJcblxyXG4gICAgICAgIC8v6K6+572u5a6a5pe25Zmo5omn6KGMLOWumuaXtumHjeWkjeaJp+ihjCjln7rkuo7luKfnjocpXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5hbmltYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKCkge1xyXG4gICAgICAgIHRoaXMuc2NhbGVWYWx1ZSA9IE1hdGguc2luKHRoaXMuc2NhbGVEZWx0YSArPSAwLjEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24ueSA9IE1hdGgubWF4KDAsIHRoaXMuc2NhbGVWYWx1ZSAvIDIpOztcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLnJvbGUudHJhbnNmb3JtLnJvdGF0ZSh0aGlzLnJvdGF0ZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgIH1cclxufSJdfQ==
