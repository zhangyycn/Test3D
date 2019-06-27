import CameraMoveScript from "./common/CameraMoveScript"

export default class RockGolem {
	private scene: Laya.Scene3D;
	private role: Laya.Sprite3D;

	constructor() {
		Laya3D.init(0, 0);
		Laya.Stat.show();
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		
		Laya.Scene3D.load("res/threeDimen/scene/RockGolem/scene.ls", Laya.Handler.create(this, function(_scene:Laya.Scene3D):void {
			this.scene = Laya.stage.addChild(_scene) as Laya.Scene3D;
			var camera = this.scene.getChildByName("Main Camera") as Laya.Camera;
			camera.addComponent(CameraMoveScript);
		}));
	}
}