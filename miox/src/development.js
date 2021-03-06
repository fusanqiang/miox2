/**
 * Created by evio on 16/7/20.
 */
'use strict';

import { Bootstrap } from './index';
import Router from '../../miox-router/index';
import { Webview, plugin, Engine } from '../../miox-vue-engine/index';
import animate from '../../miox-animate/index';
import components from '../../miox-vue-components';

import WebSQL from '../../miox-websql/index';


class Aspect extends Webview {
    constructor(el){
        super(el);
    }
    
    init(){
        this.on('ready', function(vm){
            console.log('ready:', vm);
        });
    }

    methods(options){
        options.a = function(){
            this.createForward('/t');
        };
        options.b = function(){
            this.backward('/');
        };
    }

    template(node){
        return `
            <appview>
                <appview-head>
                    <navgation>
                        <navgation-item left>left</navgation-item>
                        <navgation-item center>标题</navgation-item>
                        <navgation-item right>right</navgation-item>
                    </navgation>
                </appview-head>
                <appview-body>
                    <h1 v-create-forward patch="/t">A: go</h1>
                    <h1 v-backward patch="/">A: back</h1>
                </appview-body>
                <appview-foot>789</appview-foot>
            </appview>
        `;
    }
}

class AspectB extends Webview {
    constructor(el){
        super(el);
    }

    init(){
        const ctx = this.ctx;
        this.on('ready', function(vm){
            //console.log('ready:', vm);
            console.log(ctx.get(ctx.req.prevKey))
        });
    }

    template(node){
        return `
            <h1 v-backward patch="/">B : back</h1>
        `;
    }
}

Bootstrap(async app => {
    const r = new Router();
    app.engine(Engine);
    app.animate(animate());
    plugin(components);

    r.patch('/', async function(ctx){
        //console.log('in',ctx);
        await ctx.render(Aspect);
        //console.log('ok')
    })

    r.patch('/t', async function(ctx){
        await ctx.render(AspectB);
    })

    app.on('server:start', () => {
        //console.log('start')
    });
    app.on('server:end', () => {
        //console.log('end')
    });
    app.use(r.routes());
}).catch(console.info);
