// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventViewConst } from "../EventView";
import EventModle from "../../lib/event/EventModle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WrittenItem extends cc.Component {

    @property(cc.Label)
    writtenLab: cc.Label = null;

    @property(cc.Node)
    mask: cc.Node = null;

    private actOut = cc.fadeOut(0.5);
    private actIn = cc.fadeIn(0.5);

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.init();
    }

    private init() {
        this.mask.opacity = 0;
    }

    onEnable(){
        this.isTouch = false;
        this.addEventList();
    }

    onDisable(){
        this.removeEventList();
    }

    private addEventList() {
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouch,this);
    }

    private removeEventList() {
        this.node.off(cc.Node.EventType.TOUCH_END,this.onTouch,this);
    }

    private isTouch:boolean = false;

    private onTouch() {
        if(this.isTouch){
            return;
        }
        this.isTouch = true;
        this.mask.stopAllActions();
        this.mask.runAction(this.actOut);
        let vec2 = new cc.Vec2();
        vec2.x = this.node.x;
        vec2.y = this.node.y;
        EventModle.dispatch(EventViewConst.MOVE_TO_BOARD,vec2);
    }

    private playActiveAni() {
        this.mask.stopAllActions();
        this.mask.runAction(this.actIn);
    }

    /**
     * 设置数据
     * @param str 
     */
    public setData(str:string,actOut:boolean = false)
    {
        this.writtenLab.string = str;
        if(actOut){
            this.playActiveAni();
        }
    }

    // update (dt) {}
}
