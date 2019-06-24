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