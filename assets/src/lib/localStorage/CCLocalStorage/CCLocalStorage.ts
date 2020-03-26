/**
 * 保存数据到本地
 */

export default class CCLocalStorage {

    private static _instance: CCLocalStorage;

    public static get instance():CCLocalStorage{
        if(!this._instance){
            this._instance = new CCLocalStorage();
        }
        return this._instance;
    }

    public init(){

    }

    private localTypeArr = []

    public localStorage(key:string,center:string){
        cc.sys.localStorage.setItem(key,center);
        if(this.localTypeArr.indexOf(key) < 0){
            this.localTypeArr.push(key);
        }
    }

    public getLocalStorage(key:string){
        return cc.sys.localStorage.getItem(key);
    }

}
