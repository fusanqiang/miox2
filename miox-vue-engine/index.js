/**
 * Created by evio on 16/7/23.
 */
'use strict';

import WEBVIEW from './webview';
import COMPONENT from './component';
import ENGINE from './engine';
import VUE from 'vue';
import isClass from 'is-class';

export const Webview = WEBVIEW;
export const Component = COMPONENT;
export const Engine = ENGINE;
export const Vue = VUE;

export const define = function(name, webview){
    if ( isClass(webview) || typeof webview === 'function' ){
        const obj = new webview();
        webview = obj.toJSON();
    }
    Vue.component(name, webview);
};

export const plugin = function(fn){
    if ( typeof fn === 'function' ){
        return fn({ Webview, Component, Vue, define });
    }
};