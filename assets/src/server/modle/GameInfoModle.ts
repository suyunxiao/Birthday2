
/**
 * 数据操作模块
 */

import { DataEvents } from "../event/DataEvents";
import ArchivesModle from "../../archives/modle/ArchivesModle";
import GameInfoServer from "../server/GameInfoServer";
import EventModle from "../../event/EventModle";
import PeopleStateType from "./PeopleStateType";
import TalkDubbingItemType from "./TalkDubbingItemType";


export class ActivityPrefabInfo {

    public uuid = "";

    public activityPrefabId = "";
}


export default class GameInfoModle {

    private static _instance: GameInfoModle;

    public static get instance():GameInfoModle{
        if(!this._instance){
            this._instance = new GameInfoModle();
        }
        return this._instance;
    }

    public addEventList() {
        EventModle.on(DataEvents.UP_PEOPLE_STATE,this.upPeopleState,this);
    }

    //目前正在活动的预制体的节点信息
   private activityPrefab:ActivityPrefabInfo = new ActivityPrefabInfo();

   public setActivityPrefabID(prefabId:string,uuid:string)
   {
       this.activityPrefab.activityPrefabId = prefabId;
       this.activityPrefab.uuid = uuid;
   }

    //==============================================      其他     =======================================================

   /**
    * 获取正在活动的节点
    */
   public getActivityPrefabID()
   {
       return this.activityPrefab.activityPrefabId;
   }

    /**
    * 获取正在活动节点的uuid
    */
   public getActivityPrefabUuid()
   {
       return this.activityPrefab.uuid;
   }


   /**
    * 获取正在活动的章节
    */
   public getNowChapter()
   {
       return GameInfoServer.instance.getChapterId();
   }


    //==============================================      设置     =======================================================

   //是否自动播放
   private isAutoPlay:boolean = false;

   public getAutoPlatState()
   {
       return this.isAutoPlay;
   }

   public setAutoPlatState(bool:boolean)
   {
       this.isAutoPlay = bool;
   }

   /**
    * 获取对话声音大小
    */
   public getTalkVoiceVolume()
   {
       return GameInfoServer.instance.getTalkVolume();
   }

   /**
    * 获取背景声音大小
    */
   public getBGVoiceVolume()
   {
       return GameInfoServer.instance.getBgmVolume();
   }


    //==============================================      人物状态     =======================================================

   //人物状态值
   private peopleStateArr:Array<PeopleStateType> = [];

   /**
    * 获取人物的状态值
    */
   public getStateByPeople(people:string) :PeopleStateType{
        if(!this.peopleStateArr || this.peopleStateArr.length == 0){
            this.peopleStateArr = [];
            let peopleState = new PeopleStateType();
            peopleState.peopleName = people;
            this.peopleStateArr.push(peopleState);
            return peopleState;
        }

        for(let i = 0; i < this.peopleStateArr.length; ++i)
        {
            if(this.peopleStateArr[i].peopleName == people)
            {
                return this.peopleStateArr[i];
            }
        }
        cc.warn("无当前查找的人物信息：" + people);
   }
   
   /**
    * 更新人物状态值
    */
    private upPeopleState(peopleState:PeopleStateType) {
        for(let i = 0; i < this.peopleStateArr.length; ++i)
        {
            if(this.peopleStateArr[i].peopleName == peopleState.peopleName)
            {
                if(this.peopleStateArr[i].idArr.indexOf(peopleState.id) >= 0)
                {
                    cc.log("当前id已经添加过人物状态值: " + peopleState.id);
                }
                this.peopleStateArr[i].reasonNum += peopleState.reasonNum;
                this.peopleStateArr[i].LoveNum += peopleState.LoveNum;
                this.peopleStateArr[i].idArr.push(peopleState.id);
                return;
            }
        }
    }


    //==============================================       配音      =======================================================

    private dubbingArr:Array<TalkDubbingItemType> = [];

    public getDubbingArr(){
        return this.dubbingArr;
    }

    public setDubbingArr(arr:Array<TalkDubbingItemType>){
        this.dubbingArr = arr;
    }

    //==============================================       背景声音列表      =======================================================

    private BGMArr:Array<TalkDubbingItemType> = [];

    public getBGMArr(){
        return this.BGMArr;
    }

    public setBGMArr(arr:Array<TalkDubbingItemType>){
        this.BGMArr = arr;
    }


    //==============================================       存档      =======================================================

    /**
     * 根据序号获取存档数据
     */
    public getPreserArrBySerial(serial:number){
        return ArchivesModle.instance.getPreserBySerial(serial);
    }

    /**
     * 获取存档数组数据
     */
    public getPreserArr(){
        return ArchivesModle.instance.getPreserArr();
    }

    /**
     * 获取存档数组数据
     */
    public getReadArr(){
        return ArchivesModle.instance.getPreserArr();
    }


}
