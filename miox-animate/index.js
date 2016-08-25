/**
 * Created by evio on 16/7/23.
 */
'use strict';
import onTransitionEnd from './transitionend';
const expectedDuration = 350;
const delaytime = 1000 / 60;

export default function animation(configs = {
    effect: 'slide'
}){
    return async function(direction, newWebview, oldWebview){
        if ( direction === null ){
            addClass(newWebview, 'active');
            removeClass(oldWebview, 'active');
            return;
        }

        if ( !configs.effect ){
            removeClass(oldWebview,'active');
            addClass(newWebview,'active');
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

async function delay(){
    await new Promise(resolve => setTimeout(resolve, delaytime));
}

async function Enter(newWebview, oldWebview, configs){
    const className = configs.effect;
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

    await delay();

    newWebview.style.transition = "";
    addClass(oldWebview,'mx-webview-backward');
    removeClass(oldWebview,'active');
    removeClass(newWebview,'mx-webview-forward');

    await onTransitionEnd(newWebview, expectedDuration);

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
}

async function Leave(newWebview, oldWebview, configs){
    const className = configs.effect;
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

    await delay();

    newWebview.style.transition="";
    removeClass(newWebview,'mx-webview-backward');
    addClass(oldWebview,'mx-webview-forward');

    await onTransitionEnd(newWebview, expectedDuration);

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
}