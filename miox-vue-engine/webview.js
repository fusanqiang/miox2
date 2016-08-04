/**
 * Created by evio on 16/7/22.
 */
'use strict';

import Component from './component';
import Vue from 'vue';

export default class Webview extends Component {
    constructor(el){
        super();
        this.el = el;
    }

    __defineCompile__(){
        this.init && this.init();
        const data = this.__defineBuildComponent__();
        data.el = this.el;
        data.replace = false;
        this.vm = new Vue(data);
        this.vm.$webview = this;
    }

    __defineDestroy__(){
        this.vm && this.vm.$destroy(true);
    }

    destroy(){
        this.__defineDestroy__();
    }
}