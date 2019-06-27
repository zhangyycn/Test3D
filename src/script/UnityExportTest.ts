export default class UnityExportTest {
    private scene: Laya.Scene3D;
    private camera: Laya.Camera;
    private directionLight: Laya.DirectionLight;
    private role: Laya.MeshSprite3D;
    private roleAnimator: Laya.Animator;
    private test_role: Laya.Sprite3D;
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
            "res/threeDimen/skinModel/Polytope/Polytope.lh",
            "res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Meshes/PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01_aAvatar.lav"
		], Laya.Handler.create(this, this.onComplete));
    }

    onComplete() {
        //加载地面
        var grid = this.scene.addChild(Laya.Loader.getRes("res/threeDimen/staticModel/grid/plane.lh")) as Laya.Sprite3D;
        //地面接收阴影
        (grid.getChildAt(0) as Laya.MeshSprite3D).meshRenderer.receiveShadow = true;

        /*
        //加载角色
        this.role = new Laya.MeshSprite3D(Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Meshes/PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01.lm"));
        this.scene.addChild(this.role);
        //设置材质
        this.role.meshRenderer.material = Laya.Loader.getRes("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Materials/PT_Medieval_mat.lmat");

        this.role.transform.position.setValue(0, 0, 0);
        this.role.transform.localScale.setValue(0.5, 0.5, 0.5);
        */

        Laya.Sprite3D.load("res/threeDimen/skinModel/Polytope/Polytope.lh", Laya.Handler.create(this, function(sp) {
            this.test_role = this.scene.addChild(sp);
            this.test_role.transform.localScale = new Laya.Vector3(0.5, 0.5, 0.5);
            this.test_role.transform.translate(new Laya.Vector3(0, 0, 0));
        }));

        //获取动画组件
        this.roleAnimator = this.test_role.getChildAt(0).getComponent(Laya.Animator) as Laya.Animator;

        Laya.AnimationClip.load("res/threeDimen/skinModel/Polytope/Assets/Polytope/Characters/Sources/Meshes/PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01_a-PT_Medieval_Female_Peasant_01_aAvatar.lav", Laya.Handler.create(this, function(aniClip:Laya.AnimationClip):void {
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

        //设置定时器执行,定时重复执行(基于帧率)
        Laya.timer.frameLoop(1, this, this.animate);
    }

    animate() {
        /*
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);
        
        this.position.y = Math.max(0, this.scaleValue / 2);;
        this.role.transform.position = this.position;
        this.role.transform.rotate(this.rotate, false, false);
        */
    }
}