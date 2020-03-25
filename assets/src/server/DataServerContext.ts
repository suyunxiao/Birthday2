//==================================================================================
/**
 * 数据上下文
 */
//==================================================================================

import InitInfoCommand from "./commands/InitInfoCommand";
import ArchivesServer from "../archives/server/ArchivesServer";
import GameInfoServer from "./server/GameInfoServer";
import VoiceUtilModle from "../Voice/modle/VoiceUtilModle";

export default class DataServerContext {

    private static _instance: DataServerContext;

    public static get instance():DataServerContext{
        if(!this._instance){
            this._instance = new DataServerContext();
        }
        return this._instance;
    }

    /**
     * 初始化流程
     */
    public initProcess()
    {
        Promise.resolve().then(()=>{
            //其他的一些初始化
            let init = new InitInfoCommand();
            return init.initData(); 
        }).then(()=>{
            //存档
            ArchivesServer.instance.initInfo();
            return Promise.resolve();
        }).then(()=>{
            //数据集合
            GameInfoServer.instance.init();
            return Promise.resolve();
        }).then(()=>{
            //音频
            VoiceUtilModle.instance.init();
            return Promise.resolve();
        })
    }




}
