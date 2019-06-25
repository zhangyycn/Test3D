import GameConfig from "./GameConfig";
import TransformDemo from "./script/TransformDemo";
import Sprite3DLoad from "./script/Sprite3DLoad";
import MaterialAnimation from "./script/MaterialAnimation"

class Main {
    constructor() {
        //new TransformDemo();
        new Sprite3DLoad();
        //new MaterialAnimation();
    }
}
//激活启动类
new Main();