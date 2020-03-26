/**
 * 任务事件
 */

enum ArchivesEvents {

    /**
     * 修改存档信息
     */
    MODIFICATION_PRESER_SIGN = "MODIFICATION_PRESER_SIGN",

    /**
     * 修改读档信息
     */
    MODIFICATION_READ_SIGN = "MODIFICATION_READ_SIGN",

    /**
     * 更新存档信息 ，界面需要监听该信号做出相应修改
     */
    UP_PRESER_SIGN = "UP_PRESER_SIGN",

    /**
     * 更新读档信息 ，界面需要监听该信号做出相应修改
     */
    UP_READ_SIGN = "UP_READ_SIGN",

    /**
     * 保存读档信息到本地或者服务器
     */
    SAVE_READ_SIGN = "SAVE_READ_SIGN",
  
}

export default ArchivesEvents;