
/**
 * 事件常量
 */

import Eventer from "./Eventer";


export const EventModleConst = {

    //点击回到主界面按钮
    EVENT_HOME_BTN:"EVENT_HOME_BTN",

    //开始游戏
    BEGIN_GAME:"BEGIN_GAME",

    //跳转到节点
    JUMP_CHAPTER:"JUMP_CHAPTER",

    //清除预制节点，用来做跳转的时候清除上一个节点数据
    CLEAN_PREFAB:"CLEAN_PREFAB",

    //清除背景声音
    CLEAN_BGM:"CLEAN_BGM",

    //清除所有声音
    CLEAN_ALL_BGM:"CLEAN_ALL_BGM",

}


export default class EventModle {

    private static event = new Eventer();

    //添加监听事件
    public static on(str:string,fun?:Function,target?:any)
    {
        this.event.on(str,fun,target);
    }

    //移除监听事件
    public static off(str:string,fun?:Function,target?:any)
    {
        this.event.off(str,fun,target);
    }

    //派发事件
    public static dispatch(str:string,data?:any)
    {
        this.event.dispatch(str,data);
    }



}
