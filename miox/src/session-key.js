/**
 * Created by evio on 16/7/21.
 */
'use strict';

export const getKey = function(key){
    const locationKey = keyName(key);
    return JSON.parse(window.sessionStorage.getItem(locationKey));
};

export const setKey = function(key, value){
    const locationKey = keyName(key);
    window.sessionStorage.setItem(locationKey, JSON.stringify(value));
};

export const keyName = function(key){
    return /^@@/.test(key) ? key :'@@History/' + key;
};

export const is = function(name){
    return name.indexOf('@@History') > -1;
};