import GameConfig from "./GameConfig";
import UnityExportTest from "./script/UnityExportTest"
import TransformDemo from "./script/TransformDemo";
import Sprite3DLoad from "./script/Sprite3DLoad";
import MaterialAnimation from "./script/MaterialAnimation"
import LoadResourceDemo from "./script/LoadResourceDemo"
import AnimatorDemo from "./script/AnimatorDemo"
import PhysicsWorld_BaseCollider from "./script/PhysicsWorld_BaseCollider"
import HuaYing from "./script/HuaYing"

class Main {
    constructor() {
        new UnityExportTest();
        //new TransformDemo();
        //new Sprite3DLoad();
        //new MaterialAnimation();
        //new LoadResourceDemo();
        //new AnimatorDemo();
        //new PhysicsWorld_BaseCollider();
        //new HuaYing();
    }
}

//激活启动类
new Main();