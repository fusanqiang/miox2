/**
 * Created by evio on 16/7/22.
 */
'use strict';

import isClass from 'is-class';
import { parse } from 'url';
import { getKey, keyName, is } from '../miox/src/session-key';

export default class VueEngine {
    constructor(ctx){
        this.ctx = ctx;
        this.ctx.render = this.render.bind(this);
        this.webviews = {};
        this.direction = 'FROM-LEFT-TO-CENTER';
        this.mustCreate = true;
        this.rendering = false;

        (methods => {
            let i = methods.length;
            while (i--) this.ctx[methods[i]] = this[methods[i]].bind(this);
        }).call(this, ['render', 'createForward', 'createBackward', 'forward', 'backward']);

        ctx.on('history:destroy', removes => {
            let i = removes.length;
            while (i--) {
                const webview = this.webviews[removes[i]];
                if ( webview ){
                    webview.__defineDestroy__();
                }
            }
        });

        // ctx.on('history:listen', () => {
        //     console.log('listen')
        // });
    }

    get(key){
        return this.webviews[key];
    }

    async render(webview){
        let el, web, _el;
        const ctx = this.ctx;
        if ( this.mustCreate ){
            web = await this.create(webview);
        }else{
            web = this.get(ctx.req.nextKey);
        }

        el = web.el;

        if ( !ctx.animater ){
            throw new Error('miss animate slide function for changing pages');
        }

        const old = this.get(ctx.req.prevKey);
        if (old){
            _el = old.el;
        }

        await ctx.animater(this.direction, el, _el);
        this.direction = null;
        this.mustCreate = false;
    }

    async create(webview){
        const ctx = this.ctx;
        if ( !isClass(webview) ){
            throw new Error('`webview` argument is not a class object.');
        }
        return this.webviews[ctx.req.nextKey] = await new Promise((resolve, reject) => {
            const web = new webview(this.createWebviewRoot());
            web.on('ready', () => resolve(web));
            web.on('error', reject);
            web.__defineCompile__();
        });
    }

    createWebviewRoot(){
        const element = document.createElement('div');
        this.ctx.webviewsElement.appendChild(element);
        element.classList.add('mx-webview');
        return element;
    }

    createForward(url){
        if ( this.rendering ) return;
        const object = parse(url);
        this.direction = 'FROM-LEFT-TO-CENTER';
        this.mustCreate = true;
        this.ctx.history.push({
            pathname: object.pathname,
            search: object.search,
            state: {
                index: window.history.length,
                url: url
            }
        });
    }
    createBackward(url){
        if ( this.rendering ) return;
        const object = parse(url);
        this.direction = 'FROM-RIGHT-TO-CENTER';
        this.mustCreate = true;
        this.ctx.history.push({
            pathname: object.pathname,
            search: object.search,
            state: {
                index: window.history.length,
                url: url
            }
        });
    }
    forward(url){
        if ( this.rendering ) return;
        this.direction = 'FROM-LEFT-TO-CENTER';
        this.mustCreate = false;
        const postion = this.search(url);
        if ( postion === null ){
            return this.createForward(url);
        }
        const index = getKey(keyName(ctx.req.nextKey)).index;
        window.history.go(postion - index);
    }
    backward(url){
        if ( this.rendering ) return;
        this.direction = 'FROM-RIGHT-TO-CENTER';
        this.mustCreate = false;
        const postion = this.search(url);
        if ( postion === null ){
            return this.createBackward(url);
        }
        const index = getKey(keyName(ctx.req.nextKey)).index;
        window.history.go(postion - index);
    }

    search(url){
        let len = window.sessionStorage.length;
        let index = null;
        while( len-- ){
            let key = window.sessionStorage.key(len);
            if( is(key) ){
                let state = JSON.parse(window.sessionStorage.getItem(key));
                if ( state.url === url ){
                    index = state.index;
                    break;
                }
            }
        }
        return index;
    }
}