/**
 * Created by evio on 16/8/5.
 */
'use strict';

import vuex from 'vuex';

export const Vuex = vuex;

export const install = function(Engine, Vue){
    Engine.addParam('store');
    Engine.addParam('vuex');

    Engine.addInit(function(database){
        if ( database.vuex ){
            if ( Object.keys(database.vuex).length === 0 ){
                delete database.vuex;
            }
        }
    });

    Engine.addInit(function(database){
        if ( database.store ){
            if ( !database.store._getterCacheId ){
                delete database.store;
            }
        }
    });

    Vue.use(Vuex);
};