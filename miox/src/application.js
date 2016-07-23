/**
 * Created by evio on 16/7/20.
 */
'use strict';

import isGeneratorFunction from 'is-generator-function';
import Server from './server';
import request from './request';
import response from './response';
import compose from 'koa-compose';
import convert from 'koa-convert';

export default class Application extends Server {
    constructor(el = document.body){
        super();
        this.wrapElement = el;
        this.middleware = [];
        this.env = process.env.NODE_ENV || 'development';
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.enginer = null;
        this.animater = null;
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
        return (req, res) => {
            const ctx = this.createContext(req, res);
            this.emit('server:start');
            fn(ctx).then(()=> this.emit('server:end')).catch(this.onerror);
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
}