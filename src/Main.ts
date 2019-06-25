import GameConfig from "./GameConfig";
import UnityExportTest from "./script/UnityExportTest"
import TransformDemo from "./script/TransformDemo";
import Sprite3DLoad from "./script/Sprite3DLoad";
import MaterialAnimation from "./script/MaterialAnimation"
import LoadResourceDemo from "./script/LoadResourceDemo"

class Main {
    constructor() {
        //new UnityExportTest();
        //new TransformDemo();
        //new Sprite3DLoad();
        //new MaterialAnimation();
        new LoadResourceDemo();
    }
}
//激活启动类
new Main();