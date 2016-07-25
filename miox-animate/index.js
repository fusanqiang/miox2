/**
 * Created by evio on 16/7/23.
 */
'use strict';
import onTransitionEnd from './transitionend';
const expectedDuration = 350;
const delay = 1000 / 60;

export default function animation(configs = {
    effect: 'slide'
}){
    return async function(direction, newWebview, oldWebview){
        if ( direction === null ){
            addClass(newWebview, 'active');
            removeClass(oldWebview, 'active');
            return;
        }
        switch (direction) {
            case 'NEW-WEBVIEW-FROM-RIGHT-TO-CENTER':
                await Enter(newWebview, oldWebview, configs);
                break;
            case 'NEW-WEBVIEW-FROM-LEFT-TO-CENTER':
                await Leave(newWebview, oldWebview, configs);
                break;
        }
    }
}

function addClass(el, name){
    el && el.classList.add(name);
    return el;
}

function removeClass(el, name){
    el && el.classList.remove(name);
    return el;
}

async function Enter(newWebview, oldWebview, configs){
    const className = configs.effect;
    return new Promise(resolve => {
        newWebview.style.zIndex = 1000;
        oldWebview.style.zIndex = 999;

        newWebview.style.visibility = "visible";
        oldWebview.style.visibility = "visible";

        addClass(newWebview, 'moving');
        addClass(oldWebview, 'moving');

        newWebview.style.transition = "none";
        addClass(newWebview,'mx-webview-forward');

        className && addClass(newWebview, className);
        className && addClass(oldWebview, className);

        //开始 变换
        setTimeout(function(){
            newWebview.style.transition = "";
            addClass(oldWebview,'mx-webview-backward');
            removeClass(oldWebview,'active');
            removeClass(newWebview,'mx-webview-forward');
        }, delay);


        //结束 变换
        onTransitionEnd(newWebview, expectedDuration, function(){
            addClass(newWebview,'active');

            removeClass(newWebview, 'moving');
            removeClass(oldWebview, 'moving');

            removeClass(oldWebview, 'mx-webview-backward');
            newWebview.style.zIndex = "";
            oldWebview.style.zIndex = "";
            newWebview.style.visibility = "";
            oldWebview.style.visibility = "";
            className && removeClass(newWebview, className);
            className && removeClass(oldWebview, className);
            resolve();
        });
    });
}

async function Leave(newWebview, oldWebview, configs){
    const className = configs.effect;
    return new Promise(resolve => {
        //准备 变换
        newWebview.style.zIndex = 999;
        oldWebview.style.zIndex = 1000;

        newWebview.style.visibility = "visible";
        oldWebview.style.visibility = "visible";

        addClass(newWebview, 'moving');
        addClass(oldWebview, 'moving');

        newWebview.style.transition="none";
        addClass(newWebview,'mx-webview-backward');

        className && addClass(newWebview, className);
        className && addClass(oldWebview, className);

        //开始 变换
        setTimeout(function(){
            newWebview.style.transition="";
            removeClass(newWebview,'mx-webview-backward');
            addClass(oldWebview,'mx-webview-forward');
        },1000/60);

        //结束 变换
        onTransitionEnd(newWebview, expectedDuration, function(){
            addClass(newWebview,'active');

            removeClass(newWebview, 'moving');
            removeClass(oldWebview, 'moving');

            removeClass(oldWebview, 'mx-webview-forward');
            removeClass(oldWebview, 'active');
            newWebview.style.zIndex = "";
            oldWebview.style.zIndex = "";
            newWebview.style.visibility = "";
            oldWebview.style.visibility = "";
            className && removeClass(newWebview, className);
            className && removeClass(oldWebview, className);
            resolve();
        });
    })
}