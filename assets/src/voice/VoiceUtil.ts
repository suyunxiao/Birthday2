import VoiceType from "./modle/VoiceType";
import VoiceUtilModle from "./modle/VoiceUtilModle";




const {ccclass, property} = cc._decorator;

@ccclass
export default class VoiceUtil {

    private static _instance: VoiceUtil;

    public static get instance():VoiceUtil{
        if(!this._instance){
            this._instance = new VoiceUtil();
        }
        return this._instance;
    }


    public init(){
        
    }

    /**
     * 播放音频
     * @param voice 
     */
    public playVoice(voice:VoiceType): VoiceType {
        return VoiceUtilModle.instance.playVoice(voice);
    }

    /**
     * 播放音频 (该接口播放的音频只能存在一个， 如果使用这个，那么会停止上一次调用改接口的音频)
     * @param voice 
     */
    public playVoiceMeanwhile(voice:VoiceType): VoiceType {
        return VoiceUtilModle.instance.playVoiceMeanwhile(voice);
    }

    /**
     * 停止音频
     * @param voice 
     */
    public stopVoice(voice:VoiceType|Number){
        VoiceUtilModle.instance.stopVoice(voice);
    }

    /**
     * 停止所有音频
     * @param voice 
     */
    public stopAllVoice(){
        VoiceUtilModle.instance.stopAllVoice();
    }

    /**
     * 获取正在播放的音频信息
     */
    public getPlayVoice():VoiceType {
        return VoiceUtilModle.instance.getPlayVoice();
    }

    
    private BGMVoice:VoiceType = new VoiceType();
    public playBGMVoice(voice:VoiceType){
        return VoiceUtilModle.instance.playBGMVoice(voice);
    }

    public stopBGMVoice(){
        cc.audioEngine.stopMusic();
    }

    /**
     * 移除音频信息
     */
    private removeVoice(){

    }



}