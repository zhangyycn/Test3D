import GameConfig from "./GameConfig";
import UnityExportTest from "./script/UnityExportTest"
import TransformDemo from "./script/TransformDemo";
import Sprite3DLoad from "./script/Sprite3DLoad";
import MaterialAnimation from "./script/MaterialAnimation"

class Main {
    constructor() {
        new UnityExportTest();
        //new TransformDemo();
        //new Sprite3DLoad();
        //new MaterialAnimation();
    }
}
//激活启动类
new Main();