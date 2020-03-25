/**
 * 事件管理器
 */
export default class Eventer<EventCollection> {

    /**
     * 记录字典
     */
    private recordMap: Map< EventCollection, // 事件
                            Map< Function, // 触发的函数
                                Map< Object, // 函数调用者
                                    number // 触发次数
                                >
                            >
                        > = new Map();

    /**
     * 开始监听
     * @param evt 
     * @param callBack 
     * @param tar 
     */
    on (evt: EventCollection, callBack: Function, tar?: Object) {
        let funRec = this.certainFunRecordExist( evt, callBack );
        let currTimes = this.certainTarRecordExist( evt, callBack, tar );
        funRec.set( tar, currTimes + 1 );
        this.addCallBack();
    }

    /**
     * 确保一个事件记录存在
     * @param evt 
     */
    private certainEvtRecordExist (evt: EventCollection) {
        let record = this.recordMap.get( evt );
        if (!record) {
            record = new Map();
            this.recordMap.set( evt, record );
        };

        return record;
    }

    /**
     * 确保事件触发一个函数的记录存在
     * @param evt 
     * @param callBack 
     */
    private certainFunRecordExist (evt: EventCollection, callBack: Function) {
        let record = this.certainEvtRecordExist( evt );

        let funRec = record.get( callBack );
        if (!funRec) {
            funRec = new Map();
            record.set( callBack, funRec );
        };

        return funRec;
    }

    /**
     * 确保到对象调用次数的记录都存在
     * @param evt 
     * @param callBack 
     * @param tar 
     */
    private certainTarRecordExist (evt: EventCollection, callBack, tar: Object) {
        let funRec = this.certainFunRecordExist( evt, callBack );

        let tarRec = funRec.get( tar );
        if (!tarRec) {
            tarRec = 0;
            funRec.set( tar, tarRec );
        }

        return tarRec;
    }

    /**
     * 取消监听
     * @param evt 
     * @param callBack 
     * @param tar 
     */
    off (evt: EventCollection, callBack: Function, tar?: Object) {
        this._off( evt, callBack, tar );
        // 如果总数为0了，才进行回调
        if (this.getTotalCallCount() === 0) {
            this.clearCallBack();
        };
    }

    private _off (evt: EventCollection, callBack: Function, tar?: Object) {
        // 获取事件记录
        let evtRec = this.recordMap.get( evt );
        if (!evtRec) {
            return;
        };

        // 获取函数记录
        let funRec = evtRec.get( callBack );
        if (!funRec) {
            return;
        }

        // 获取调用者记录
        let tarRec = funRec.get( tar );
        if (tarRec == null) {
            return;
        };

        // 确实有记录，调用次数减少
        funRec.set( tar, tarRec - 1 );

        // 进行废弃检测
        tarRec = funRec.get( tar );

        // 调用次数为0，移除
        if (tarRec === 0) {
            funRec.delete( tar );
        };

        // 具体记录的内容为0，移除
        if (funRec.size === 0) {
            evtRec.delete( callBack );
        };

        // 具体记录的内容为0，移除
        if (evtRec.size === 0) {
            this.recordMap.delete( evt );
        };
    }

    /**
     * 抛出事件
     * @param evt 
     * @param evtData 
     */
    dispatch (evt: EventCollection, evtData?: any) {
        // 获取事件记录
        let evtRec = this.recordMap.get( evt );
        if (!evtRec) {
            return;
        }

        // 遍历在案函数记录
        evtRec.forEach(( funRec, callFun ) => {
            funRec.forEach(( times, tar ) => {
                for (let i = 0; i < times; i++) {
                    callFun.call( tar, evtData );
                };
            });
        });
    }

    /**
     * 获取一个事件会触发的函数的次数
     * @param evt 
     */
    getEvtCallCount (evt: any) {
        let evtRec = this.recordMap.get( evt );
        if (!evtRec) {
            return 0;
        }

        let totalCount = 0;
        evtRec.forEach(( funRec, callFun ) => {
            funRec.forEach(( times, tar ) => {
                totalCount += times;
            });
        });

        return totalCount;
    }

    /**
     * 获取总监听的数量
     */
    getTotalCallCount () {
        let sumCount = 0;
        this.recordMap.forEach(( val, evt ) => {
            sumCount += this.getEvtCallCount( evt );
        });
        return sumCount;
    }

    /**
     * 添加的时候的回调
     */
    private addCallBack: Function = () => {};
    handleAdd (callBack: Function) {
        this.addCallBack = callBack;
    }

    /**
     * 清除的时候的回调
     */
    private clearCallBack: Function = () => {};
    handleClear (callBack: Function) {
        this.clearCallBack = callBack;
    }

    /**
     * 只监听一次
     * @param evt 
     * @param callBack 
     * @param tar 
     */
    once (evt: EventCollection, callBack: Function, tar?: Object) {
        this.on( evt, callBack, tar );
        this.on( evt, () => {
            this.off( evt, callBack, tar );
        });
    }
}