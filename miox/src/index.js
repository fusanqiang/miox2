/**
 * Created by evio on 16/7/20.
 */
'use strict';

/**
 * import modules
 */
import './scss/index.scss';
import 'setimmediate';
import 'babel-polyfill';
import domReady from 'domready';
import fastClick from 'fastclick';
import Application from './application';

/**
 * export modules
 */
export * as Vue from 'vue';
export { Promise } from 'es6-promise';

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