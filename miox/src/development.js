/**
 * Created by evio on 16/7/20.
 */
'use strict';

import { Bootstrap } from './index';
import Router from '../../miox-router/index';
import { Webview, Component, Engine } from '../../miox-vue-engine/index';
import animate from '../../miox-animate/index';


class Aspect extends Webview {
    constructor(el){
        super(el);
    }
    
    init(){
        this.on('ready', function(vm){
            //console.log('ready:', vm);
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
            <h1 v-create-forward patch="/t">A: go</h1>
            <h1 v-backward patch="/">A: back</h1>
        `;
    }
}

class AspectB extends Webview {
    constructor(el){
        super(el);
    }

    init(){
        this.on('ready', function(vm){
            //console.log('ready:', vm);
        });
    }

    template(node){
        return `
            <h1 v-backward patch="/">B : back</h1>
        `;
    }
}

(async () => {
    const app = await Bootstrap();
    const r = new Router();

    app.engine(Engine);
    app.animate(animate());

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
    app.request.ip = 2;
    app.use(async (ctx, next) => {
       await new Promise(resolve => {
           setTimeout(() => {resolve()}, 1000);
       });
        //console.log(2);
        await next();
    });

    app.use(async (ctx,next) => {
        await new Promise(resolve => {
            setTimeout(() => {resolve()}, 1000);
        });
        //console.log(4)
        await next();
    });
    app.use(r.routes());
    await app.listen();
    //console.log(app);
})();