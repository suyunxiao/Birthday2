

//==================================================================================
/**
 * 事件上下文
 */
//==================================================================================


import Eventer from "./Eventer";


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
