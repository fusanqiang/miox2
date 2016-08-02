/**
 * Created by evio on 16/7/20.
 */
'use strict';

import isGeneratorFunction from 'is-generator-function';
import Server from './server';
import compose from './compose';
import convert from './convert';
import { parse } from 'url';
import { getKey, keyName, is } from './session-key';

export default class Application extends Server {
    constructor(el = document.body){
        super();
        this.wrapElement = el;
        this.middleware = [];
        this.env = process.env.NODE_ENV || 'development';
        this.enginer = null;
        this.animater = null;
        this.webviews = {};
        this.direction = null;
        this.mustCreate = true;
        this.rendering = false;

        this.on('history:destroy', removes => {
            let i = removes.length;
            while (i--) {
                const webview = this.webviews[removes[i]];
                if ( webview ){
                    webview.destroy();
                }
            }
        });

        this.on('history:listen', function(action){
            if ( action === 'POP' && this.direction === null ){
                const prev = this.req.prevKey;
                const next = this.req.nextKey;
                const prevIndex = prev ? getKey(prev).index : null;
                const nextIndex = next ? getKey(next).index : null;
                if ( prevIndex === null ){
                    return this.direction = null;
                }
                if ( nextIndex > prevIndex ){
                    this.direction = 'NEW-WEBVIEW-FROM-RIGHT-TO-CENTER';
                }
                else if ( nextIndex < prevIndex ){
                    this.direction = 'NEW-WEBVIEW-FROM-LEFT-TO-CENTER';
                }
                else{
                    this.direction = null;
                }
            }
        })
    }

    get(key){
        return this.webviews[key];
    }

    set(key, webview){
        return this.webviews[key] = webview;
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        if (isGeneratorFunction(fn)) {
            fn = convert(fn);
        }
        this.middleware.push(fn);
        return this;
    }

    async listen(){
        this.wrapper();
        super.createServer(this.callback());
        await super.listen();
    }

    callback(){
        const fn = compose(this.middleware);
        if (!this.listeners('error').length) this.on('error', this.onerror);
        return (req, res, resolve) => {
            const ctx = this.createContext(req, res);
            this.emit('server:start');
            fn(ctx).then(() => {
                this.emit('server:end');
                resolve && resolve();
            }).catch(this.onerror);
        }
    }

    createContext(req, res){
        this.req.res = res;
        this.res.req = req;
        this.req.app = this.res.app = this;
        this.method = 'patch';
        return this;
    }

    onerror(err) {
        const msg = err.stack || err.toString();
        console.error();
        console.error(msg.replace(/^/gm, '  '));
        console.error();
    }

    engine(monitor){
        const mt = new monitor(this);
        mt.install && mt.install();
        return this.enginer = mt;
    }

    animate(fn){
        this.animater = fn;
        return this;
    }

    wrapper(){
        this.appElement = document.createElement('div');
        this.webviewsElement = document.createElement('div');
        this.wrapElement.appendChild(this.appElement);
        this.appElement.appendChild(this.webviewsElement);
        this.appElement.classList.add('mx-app');
        this.webviewsElement.classList.add('mx-webviews');
        return this;
    }

    createForward(url){
        if ( this.rendering ) return;
        const object = parse(url);
        this.direction = 'NEW-WEBVIEW-FROM-RIGHT-TO-CENTER';
        this.mustCreate = true;
        this.history.push({
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
        this.direction = 'NEW-WEBVIEW-FROM-LEFT-TO-CENTER';
        this.mustCreate = true;
        this.history.push({
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
        this.direction = 'NEW-WEBVIEW-FROM-RIGHT-TO-CENTER';
        this.mustCreate = false;

        if ( !url ){
            return this.history.goForward();
        }

        const position = this.search(url);
        if ( position === null ){
            return this.createForward(url);
        }
        const index = getKey(keyName(this.req.nextKey)).index;
        this.history.go(position - index);
    }
    backward(url){
        if ( this.rendering ) return;
        this.direction = 'NEW-WEBVIEW-FROM-LEFT-TO-CENTER';
        this.mustCreate = false;

        if ( !url ){
            return this.history.goBack();
        }

        const position = this.search(url);
        if ( position === null ){
            return this.createBackward(url);
        }
        const index = getKey(keyName(this.req.nextKey)).index;
        this.history.go(position - index);
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

    async render(webview){
        let el, web, _el;
        if ( this.mustCreate ){
            web = await this.enginer.create(webview);
        }else{
            web = this.get(this.req.nextKey);
        }
        if ( !web ){
            web = await this.enginer.create(webview);
        }

        el = web.el;

        const old = this.get(this.req.prevKey);
        if (old){
            _el = old.el;
        }
        if ( el && _el && el === _el ){
            _el = null;
        }
        if ( !this.animater ){
            throw new Error('miss animate slide function for changing pages');
        }
        
        await this.animater(this.direction, el, _el);
        this.direction = null;
        this.mustCreate = false;
    }
}