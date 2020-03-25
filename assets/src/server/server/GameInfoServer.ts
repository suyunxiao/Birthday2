import { DataEvents } from "../event/DataEvents";
import EventModle from "../../event/EventModle";


export default class GameInfoServer {

    private static _instance: GameInfoServer;

    public static get instance():GameInfoServer{
        if(!this._instance){
            this._instance = new GameInfoServer();
        }
        return this._instance;
    }

    //背景音量
    private bgmVolume = 0.5;

    //对话音量
    private talkVolume = 0.5;

    //当前在活动的章节
    private chapterId = 1;

    public init(){
        this.addEventList();
    }

    private addEventList()
    {
        EventModle.on(DataEvents.MODIFY_BGM_VOLUME,this.onModifyBgm,this);
        EventModle.on(DataEvents.MODIFY_CHAPTER_ID,this.onChpaterId,this);
        EventModle.on(DataEvents.MODIFY_TALK_VOLUME,this.onTalkBgm,this);
    }

    private removeEventList() {
        EventModle.off(DataEvents.MODIFY_BGM_VOLUME,this.onModifyBgm,this);
        EventModle.off(DataEvents.MODIFY_TALK_VOLUME,this.onTalkBgm,this);
    }

    private onModifyBgm(volume:number) {
        this.bgmVolume = volume;
    }

    private onTalkBgm(volume:number) {
        this.talkVolume = volume; 
    }

    private onChpaterId(chapterId:number) {
        this.chapterId = chapterId;
        EventModle.dispatch(DataEvents.UP_CHAPTER_STATE);
    }

    public getBgmVolume(){
        return this.bgmVolume;
    }

    public getTalkVolume(){
        return this.talkVolume;
    }

    public getChapterId(){
        return this.chapterId;
    }

}