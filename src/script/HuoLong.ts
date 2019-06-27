import CameraMoveScript from "./common/CameraMoveScript"

export default class HuoLong {
	private scene: Laya.Scene3D;
    private role: Laya.Sprite3D;
    private animator:Laya.Animator;
    private aniControlLayer: Laya.AnimatorControllerLayer;
    private aniState: Laya.AnimatorState;
    private actionName: string[] = ["wait", "run", "skill1", "skill2", "hurt", "die"]; 
    private state: number = 0;

	constructor() {
		Laya3D.init(0, 0);
		Laya.Stat.show();
		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
		
		Laya.Scene3D.load("res/threeDimen/scene/HuoLong/HuoLong.ls", Laya.Handler.create(this, (_scene:Laya.Scene3D) => {
			this.scene = Laya.stage.addChild(_scene) as Laya.Scene3D;
			var camera = this.scene.getChildByName("MainCameraControl").getChildByName("Main Camera") as Laya.Camera;
            camera.addComponent(CameraMoveScript);

            this.role = this.scene.getChildByName("SJ001") as Laya.Sprite3D;
            this.animator = this.role.getComponent(Laya.Animator) as Laya.Animator;
            this.aniControlLayer = this.animator.getControllerLayer();

            this.animator.getDefaultState(0).clip.islooping = true;

            Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        }));
    }

    onClick() {
        this.state = ++this.state > 5 ? 0 : this.state;

        this.aniState = this.aniControlLayer.getAnimatorState(this.actionName[this.state]);
        this.aniState.clip.islooping = true;
        this.animator.play(this.actionName[this.state]);
    }
}