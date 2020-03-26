
/**
 * 音频的配置信息
 */
export default class VoiceType {

    //播放id
    public playId:number;

    //播放地址
    public playUrl = "";

    //加载后的音频文件
    public clip:cc.AudioClip;

    //是否循环播放
    public loop:boolean = false;

    //音量
    public volume = 1;
}