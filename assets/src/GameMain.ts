// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import WrittenItem from "./view/item/WrittenItem";
import EventModle from "./lib/event/EventModle";
import { EventViewConst } from "./view/EventView";



const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    @property(cc.Prefab)
    item: cc.Prefab = null;

    @property(cc.Node)
    group: cc.Node = null;

    @property(cc.Button)
    restBtn: cc.Button = null;

    //不重叠的在坐标点
    private pointArr:Array<cc.Vec2> = [];

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
        EventModle.on(EventViewConst.MOVE_END,this.onEndMove,this);
        this.restBtn.node.on(cc.Node.EventType.TOUCH_END,this.onRestBtn,this);
    }

    private removeEventList() {
        EventModle.off(EventViewConst.MOVE_END,this.onEndMove,this);
        this.restBtn.node.off(cc.Node.EventType.TOUCH_END,this.onRestBtn,this);
    }


    private onRestBtn() {
        EventModle.dispatch(EventViewConst.BEGIN_GAME);
        this.group.active = true;
        this.init();
    }

    private onEndMove() {
        this.group.active = false;
    }

    private init() {
        this.group.removeAllChildren();
        for(let i = 0; i < 10; ++i)
        {
            let item = this.createItem(this.item);
            item.getComponent(WrittenItem).setData(i + "");
            item.x = item.y = 0;
            this.group.addChild(item);
        }
        let width = this.group.children[0].width / 2;
        let length = this.group.childrenCount;
        this.pointArr = []
        for(let i = 0; i < length; )
        {
            let vec2 = this.createPoint(this.pointArr,width);
            if(vec2){
                this.pointArr.push(vec2);
                ++i;
            }
        }
        this.actIndex = 0;
        this.licensingAni(this.actIndex);
    }

    /**
     * 动画索引
     */
    private actIndex = 0;

    /**
     * 出组件动画
     */
    private licensingAni(index:number) {
        var finished = cc.callFunc(this.myMethod, this, this.actIndex);
        var myAction = cc.sequence(cc.moveTo(0.5, this.pointArr[index]), finished);
        this.group.children[index].runAction(myAction);
        this.actIndex++;
    }

    private myMethod() {
        if(this.actIndex < this.group.childrenCount){
            this.licensingAni(this.actIndex);
            return;
        }

    }

    private createItem(prefab:cc.Prefab) {
        return cc.instantiate(prefab);
    }

    private createPoint(arr:Array<cc.Vec2>,itemWidth:number) {
        let vec2:cc.Vec2;
        let pointX = Math.random() * (this.group.width / 2 - itemWidth);
        let pointY = Math.random() * (this.group.height / 2 - itemWidth);
        let randX = Number((Math.random() * 2).toFixed(0));
        let randY = Number((Math.random() * 2).toFixed(0));
        if(randX > 1){
            pointX = -pointX;
        }
        if(randY > 1){
            pointY = -pointY;
        }
        vec2 = new cc.Vec2();
        vec2.x = pointX;
        vec2.y = pointY;
        let is = this.isSilde(vec2,arr);
        if(is){
            return null;
        }

        return vec2;
    }

    /**
     * 判断一个点是否在一个多边形内
     * @param point 
     * @param vs 
     */
    private isSilde(point:cc.Vec2, vs:Array<cc.Vec2>) {
        let inside = false;
        let width = 100;
        for(let i = 0; i < vs.length; ++i)
        {
            //左右范围
            if(point.x > vs[i].x - width && point.x < vs[i].x + width){
                //上下范围
                if(point.y > vs[i].y - width && point.y < vs[i].y + width){
                    inside = true;
                    break; 
                }
            }
        }
        return inside;
    }

    // update (dt) {}
}
