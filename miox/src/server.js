/**
 * Created by evio on 16/7/20.
 */
'use strict';

import { EventEmitter } from 'events';
import { createHashHistory } from 'history';
import * as Url from 'url';
import * as QueryString from 'querystring';
import deepExtend from './deep-extend';
import { getKey, setKey, keyName } from './session-key';

let firstEnter = false;

export default class Server extends EventEmitter {
    constructor(){
        super();

        if ( !(this instanceof Server) ){
            return new Server();
        }

        this._req = {};
        this._res = {};
        this._unlisten = null;

        this.on('unlisten', function(){
            if ( typeof this._unlisten === 'function' ){
                this._unlisten();
            }
        });
    }

    /**
     * <getter> req
     * @returns {*}
     */
    get req(){
        return this._req;
    }

    /**
     * <setter> req
     * @param value
     */
    set req(value){
        this._req = value;
    }

    /**
     * <getter> res
     * @returns {{}|*}
     */
    get res(){
        return this._res;
    }

    /**
     * <setter> res
     * @param value
     */
    set res(value){
        this._res = value;
    }

    get query(){
        return this.req.query;
    }

    /**
     * 创建服务
     * 自动注册request事件
     * @param RequestListener
     */
    createServer(RequestListener){
        RequestListener && this.on('request', RequestListener);
    }

    /**
     * 监听HISTORY变化
     * @returns {*}
     */
    async listen(){
        this.history = createHashHistory();
        // 获取当前location对象
        const locations = this.history.getCurrentLocation();
        this._unlisten = this.history.listen(locals => setImmediate(async () => await this.historyListener(locals)));

        // 如果当前没有被初始化过
        if ( !locations.state ){
            firstEnter = true;
            await this.rebuildHistory(locations);
        }else{
            await this.createClient(locations);
        }
    }

    async historyListener(locals){
        let removes, key = locals.key, action = locals.action;

        if ( ['PUSH', 'REPLACE'].indexOf(action) > -1 ){
            const stateData = getKey(key);
            const index = history.length;
            if ( stateData.index != index ){
                stateData.index = index;
                setKey(key, stateData);
            }
            removes = await this._removeByKey(stateData.index, keyName(key));
        }

        await this.createClient(locals, removes);
    }

    async createClient(locations, removes = []){
        let action = locations.action;
        if ( action === 'REPLACE' ){
            action = 'REFRESH';
        }

        const req = this.req;
        const oldKey = req.nextKey;

        this.req = this.getClientLocations();
        this.req.method = action;

        /**
         * 解决第一次进入BUG
         * 第一次进入不触发路由选择
         */
        if ( firstEnter && !this.req.query._k ){
            return firstEnter = false;
        }

        if ( action && action != 'REFRESH' ){
            this.req.prevKey = oldKey;
            this.req.nextKey = locations.key;
        }

        await new Promise(resolve => {
            setImmediate(() => {
                this.emit('history:listen', action);
                this.emit('history:destroy', removes);
                this.emit('request', this.req, this.res, resolve);
            });
        });
    }

    getClientLocations(){
        const locations = window.location;
        const nativeSearch = locations.search.replace(/^\?/, '');
        const nativeQuerys = nativeSearch ? QueryString.parse(nativeSearch) : {};
        const nativeHash = locations.hash.replace(/^\#/, '');
        const nativeHashes = nativeHash ? Url.parse(nativeHash, true) : Url.parse('/', true);
        deepExtend(nativeHashes.query, nativeQuerys);
        return nativeHashes;
    }

    async rebuildHistory(locals){
        await this._removeAll();
        this.history.replace({
            pathname: locals.pathname || '/',
            search: locals.search,
            state: {
                index: window.history.length,
                url: this.req.href
            }
        });
    }

    /**
     * 移除所有session
     * @returns {*}
     * @private
     */
    async _removeAll(){
        return await new Promise(resolve => {
            let len = window.sessionStorage.length;
            while( len-- ){
                let key = window.sessionStorage.key(len);
                if( key.indexOf('@@History') === 0 ){
                    window.sessionStorage.removeItem(key);
                }
            }
            setImmediate(resolve);
        });
    }

    /**
     * 替换某个session
     * @param index
     * @param localkey
     * @returns {*}
     * @private
     */
    async _removeByKey(index, localkey){
        return await new Promise(resolve => {
            let len = window.sessionStorage.length;
            let removes = [];
            while( len-- ){
                let key = window.sessionStorage.key(len);
                if( key.indexOf('@@History') === 0 ){
                    let state = JSON.parse(window.sessionStorage.getItem(key));
                    if ( state.index >= index && key != localkey ){
                        removes.push(key.split('/')[1]);
                        window.sessionStorage.removeItem(key);
                    }
                }
            }
            setImmediate(() => resolve(removes.length ? removes : []));
        });
    }
}