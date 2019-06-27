import CameraMoveScript from "./common/CameraMoveScript"

export default class HuoLong {
	private scene: Laya.Scene3D;
    private role: Laya.Sprite3D;
    private animator:Laya.Animator;
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
            this.animator.getDefaultState().clip.islooping = true;

            Laya.stage.on(Laya.Event.CLICK, this, this.onClick);
        }));
    }

    onClick() {
        this.state = ++this.state > 6 ? 1 : this.state;

        switch (this.state) {
            case 1:
                this.animator.play("wait");
                break;
            case 2:
                this.animator.play("run");
                break;
            case 3:
                this.animator.play("skill1");
                break;
            case 4:
                this.animator.play("skill2");
                break;
            case 5:
                this.animator.play("hurt");
                break;
            case 6:
                this.animator.play("die");       
                break;
        }
    }
}