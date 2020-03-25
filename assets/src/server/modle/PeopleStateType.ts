/**
 * 人物状态值
 * 
 * 理性值  和 爱情值
 */


export default class PeopleStateType {

    //人物名字
    public peopleName:string = "";
    
    //理性值
    public reasonNum:number = 0;

    //爱情值
    public LoveNum:number = 0;

    //作为唯一id,避免一个值重复添加
    public id:number = 1;

    //当前所有已经添加过的id
    public idArr:Array<number> = [];

}