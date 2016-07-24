/**
 * Created by evio on 16/7/23.
 */
'use strict';

export default function animation(configs = {}){
    return async function(direction, newWebview, oldWebview){
        addClass(newWebview, 'active');
        removeClass(oldWebview, 'active');
        if ( direction === null ){
            return;
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