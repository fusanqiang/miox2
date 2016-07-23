/**
 * Created by evio on 16/7/20.
 */
'use strict';

export default {
    _ip: 1,
    get ip(){
        return this._ip;
    },
    set ip(val){
        this._ip = val;
    }
}