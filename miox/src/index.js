/**
 * Created by evio on 16/7/20.
 */
'use strict';

/**
 * import modules
 */
import 'normalize.css';
import './scss/index.scss';
import 'setimmediate';
import 'babel-polyfill';
import domReady from 'domready';
import fastClick from 'fastclick';
import Application from './application';
import Compose from './compose';
import Convert from './convert';
import IsClass from 'is-class';
import IsGeneratorFunction from 'is-generator-function';

/**
 * export modules
 */
export * as Vue from 'vue';
export { Promise } from 'es6-promise';
export { EventEmitter } from 'events';
export const compose = Compose;
export const convert = Convert;
export const isClass = IsClass;
export const isGeneratorFunction = IsGeneratorFunction;
export const FastClick = fastClick;

if ( typeof window.Promise === 'undefined' ){
    window.Promise = Promise;
}

/**
 * wrap domready width async module
 * @example
 *  DomReady().then(() => console.log('dom ready'));
 * @returns {*}
 * @constructor {domReady}
 */
export const DomReady = () => {
    return new Promise(resolve => domReady(() => {
        fastClick.attach(document.body);
        resolve();
    }));
};

export const Bootstrap = async (configs = {
    el: document.body
}) => {
    await DomReady();
    return new Application(configs.el);
};