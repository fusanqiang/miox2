/**
 * Created by evio on 16/7/22.
 */
'use strict';

import { EventEmitter } from 'events';
import isClass from 'is-class';
import deepCopy from 'deepcopy';
import Vue from 'vue';
import { Params, Events, Inits } from './params';

export default class Component extends EventEmitter {
    constructor(){
        super();
        this.__objects__ = Params;
        this.__methods__ = Events;
        this.__dataBase__ = {};
        this.__duplicate__ = document.createElement('div');
        this.__initData__();
    }

    __initData__(){
        this.__objects__.forEach(object => {
            this.__dataBase__[object] = {};
        });
        this.__methods__.forEach(method => {
            const ctx = this;
            this.__dataBase__[method] = function(){
                ctx.emit(method, this);
            }
        });
    }

    __defineBuildComponent__(){
        this.__dataBase__.name = this.constructor.name || 'miox-component-factory';
        this.__objects__.forEach(object => {
            if ( typeof this[object] === 'function' ){
                const result = this[object](this.__dataBase__[object]);
                if ( result ){
                    this.__dataBase__[object] = result;
                }

                if ( 'components' === object ){
                    each(
                        this.__dataBase__.components,
                        (component, key) => this.__dataBase__.components[key] = compile(component, key)
                    );
                }

                if ( 'mixins' === object ){
                    if ( !Array.isArray(this.__dataBase__.mixins) ){
                        this.__dataBase__.mixins = [this.__dataBase__.mixins];
                    }
                    this.__dataBase__.mixins.forEach((mixin, index) => {
                        if ( mixin.components ){
                            each(
                                mixin.components,
                                (component, key) => this.__dataBase__.mixins[index].components[key] = compile(component, key)
                            );
                        }
                    });
                }

                if (
                    'extends' === object &&
                    typeof this.__dataBase__.extends !== 'function' &&
                    this.__dataBase__.extends.components
                ){
                    each(
                        this.__dataBase__.extends.components,
                        (component, key) => this.__dataBase__.extends.components[key] = compile(component, key)
                    );
                }

            }
        });

        if ( typeof this.template === 'function' ){
            const template = this.template(this.__duplicate__);
            if ( template ){
                if ( typeof template === 'string' ){
                    const el = document.createElement('div');
                    el.innerHTML = template;
                    this.__duplicate__ = el;
                }else{
                    this.__duplicate__.appendChild(template);
                }
            }
            this.__dataBase__.template = this.__duplicate__.innerHTML;
        }

        if ( this.parent ){
            this.__dataBase__.parent = this.parent;
        }

        Inits.forEach(init => init(this.__dataBase__));

        return this.__dataBase__;
    }

    toJSON(){
        const result = this.__defineBuildComponent__();
        if ( result.propsData ){
            delete result.propsData;
        }
        if ( typeof result.data !== 'function' ){
            const _data = deepCopy(result.data || {});
            result.data = function(){
                return _data;
            }
        }
        return result;
    }

    static getVue(){
        return Vue;
    }
}

function each(objects, cb){
    const keys = Object.keys(objects);
    let i = keys.length;
    while ( i-- ) {
        cb(objects[keys[i]], keys[i]);
    }
}

function compile(value, key){
    if ( isClass(value) || typeof value === 'function' ){
        const result = new value();
        if ( result.toJSON ){
            return result.toJSON();
        }else{
            throw new Error(key + ' is not a component.');
        }
    }
    return value;
}