import VoiceType from "./VoiceType";
import EventModle from "../../event/EventModle";
import { EventModleConst } from "../../event/EventConst";


export default class VoiceUtilModle {

    private static _instance: VoiceUtilModle;

    public static get instance():VoiceUtilModle{
        if(!this._instance){
            this._instance = new VoiceUtilModle();
        }
        return this._instance;
    }

    public init(){
        this.addEventList();
    }

    private addEventList() {
        EventModle.on(EventModleConst.CLEAN_BGM,this.stopBGMVoice,this);
        EventModle.on(EventModleConst.CLEAN_ALL_BGM,this.stopAllVoice,this);
        EventModle.on(EventModleConst.MODIFY_BGM_VOLUME,this.onModifyBGMVolume,this);
    }

    private removeEventList() {
        EventModle.off(EventModleConst.CLEAN_BGM,this.stopBGMVoice,this);
        EventModle.off(EventModleConst.CLEAN_ALL_BGM,this.stopAllVoice,this);
        EventModle.off(EventModleConst.MODIFY_BGM_VOLUME,this.onModifyBGMVolume,this);
    }


    //正在播放的音频信息
    private playNowVoiceInfo:VoiceType;

    //播放的历史
    private playHistoryArr:Array<VoiceType> = [];

    /**
     * 播放音频
     * @param voice 
     */
    public playVoice(voice:VoiceType): VoiceType {
        let playId = cc.audioEngine.play(voice.clip,voice.loop,voice.volume);
        voice.playId = playId;
        this.playHistoryArr.push(voice);
        
        return voice;
    }

    //临时音频，可被覆盖
    private tempVoice:VoiceType = new VoiceType();

    /**
     * 播放音频 (该接口播放的音频只能存在一个， 如果使用这个，那么会停止上一次调用改接口的音频)
     * @param voice 
     */
    public playVoiceMeanwhile(voice:VoiceType): VoiceType {
        if(this.tempVoice.playId){
            cc.audioEngine.stop(this.tempVoice.playId);
            this.tempVoice.playId = null;
        }
        let playId = cc.audioEngine.play(voice.clip,voice.loop,voice.volume);
        voice.playId = playId;
        this.tempVoice = voice;
        return voice;
    }


    /**
     * 停止音频
     * @param voice 
     */
    public stopVoice(voice:VoiceType|Number){
        if(voice instanceof VoiceType){
            cc.audioEngine.stop(voice.playId);
        } 
        if( voice instanceof Number) {
            let playId = Number(voice); 
            cc.audioEngine.stop(playId);
        }
    }

    private BGMVoice:VoiceType = new VoiceType();

    /**
     * 播放背景音频
     * @param voice 
     */
    public playBGMVoice(voice:VoiceType){
        this.BGMVoice = voice;
        cc.audioEngine.setMusicVolume(this.BGMVoice.volume);
        return cc.audioEngine.playMusic(this.BGMVoice.clip,true);
    }

    /**
     * 停止背景音频
     */
    public stopBGMVoice(){
        cc.audioEngine.stopMusic();
    }


    /**
     * 停止所有音频
     */
    public stopAllVoice(){
        cc.audioEngine.stopAll();
        cc.audioEngine.stopMusic();
    }

    /**
     * 修改背景音量
     */
    private onModifyBGMVolume(volume:number) {
        cc.audioEngine.setMusicVolume(volume);
    }


    /**
     * 获取正在播放的音频信息
     */
    public getPlayVoice(): VoiceType{
        return this.playNowVoiceInfo;
    }


    /**
     * 移除音频信息
     */
    private removeVoice(){
        
    }
}