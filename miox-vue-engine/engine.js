/**
 * Created by evio on 16/7/22.
 */
'use strict';

import isClass from 'is-class';
import Vue from 'vue';

export default class Engine {
    constructor(ctx){
        this.ctx = ctx;
    }

    async create(webview){
        const ctx = this.ctx;
        if ( !isClass(webview) ){
            throw new Error('`webview` argument is not a class object.');
        }
        return ctx.set(ctx.req.nextKey, await new Promise((resolve, reject) => {
            const web = new webview(this.createWebviewRoot());
            web.on('ready', () => resolve(web));
            web.on('error', reject);
            web.__defineCompile__();
        }));
    }

    createWebviewRoot(){
        const element = document.createElement('div');
        this.ctx.webviewsElement.appendChild(element);
        element.classList.add('mx-webview');
        return element;
    }

    install() {
        const ctx = this.ctx;
        ['createForward', 'createBackward', 'forward', 'backward'].forEach( which => {
            if ( ctx[which] ){
                Vue.prototype[which] = url => ctx[which](url);
            }
        });
    }
}