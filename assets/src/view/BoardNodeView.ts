// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import EventModle from "../lib/event/EventModle";
import { EventViewConst } from "./EventView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BoardNodeView extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    board:cc.Graphics;

    start () {
        this.init();
    }

    onEnable(){
        this.addEventList();
    }

    onDisable(){
        this.removeEventList();
    }


    private addEventList() {
        EventModle.on(EventViewConst.MOVE_TO_BOARD,this.onMove,this);
        EventModle.on(EventViewConst.BEGIN_GAME,this.onBeginMove,this);
    }

    private removeEventList() {
        EventModle.off(EventViewConst.MOVE_TO_BOARD,this.onMove,this);
        EventModle.off(EventViewConst.BEGIN_GAME,this.onBeginMove,this);
    }
    
    private init() {
        this.board = this.node.getComponent(cc.Graphics);
        this.board.moveTo(0,0);

    }

    private max = 9;
    private index = 0;

    private onMove(vec2:cc.Vec2) {
        this.board.lineTo(vec2.x,vec2.y);
        this.board.stroke();
        ++this.index;
        if(this.index > this.max){
            this.board.lineTo(0,0);
            this.board.stroke();
            EventModle.dispatch(EventViewConst.MOVE_END);
        }
    }

    private onBeginMove() {
        this.board.clear();
    }


    // update (dt) {}
}
