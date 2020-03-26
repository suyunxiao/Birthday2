
/**
 * 存档 和 读档
 */

import ArchivesType from "./ArchivesType";
import ArchivesServer from "../server/ArchivesServer";


export default class ArchivesModle {

    private static _instance: ArchivesModle;

    public static get instance():ArchivesModle {
        if(!this._instance){
            this._instance = new ArchivesModle();
        }
        return this._instance;
    }

    /**
     * 获取存档数据
     */
    public getPreserArr(){
        return ArchivesServer.instance.getPreserArr();
    }

    /**
     * 获取读档数据
     */
    public getReadArr(){
        return ArchivesServer.instance.getReadArchiverArr();
    }

    /**
     * 根据序号获取读档数据
     */
    public getPreserBySerial(serial:number){
        let infoOnce:ArchivesType;
        let infoArr = ArchivesServer.instance.getPreserArr();
        for(let i = 0; i < infoArr.length; ++i)
        {
            if(infoArr[i].serial == serial){
                infoOnce = infoArr[i];
                break;
            }
        }
        return infoOnce;
    }

    /**
     * 根据序号保存存档数据
     */
    public seReadBySerial1(serial:number){
        let infoOnce:ArchivesType;
        let infoArr = ArchivesServer.instance.getReadArchiverArr();
        for(let i = 0; i < infoArr.length; ++i)
        {
            if(infoArr[i].serial == serial){
                infoOnce = infoArr[i];
                break;
            }
        }
        return infoOnce;
    }

}