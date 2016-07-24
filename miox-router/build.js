!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.MioxVueRouter=e():t.MioxVueRouter=e()}(this,function(){return function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return t[n].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),s=r(2),a=n(s),u=r(1),c=n(u),f=["patch"],l=function(){function t(e){return o(this,t),this instanceof t?(this.opts=e||{},this.methods=this.opts.methods||["PATCH"],this.params={},void(this.stack=[])):new t(e)}return i(t,[{key:"patch",value:function(t,e){var r=void 0;return"string"==typeof e||e instanceof RegExp?r=Array.prototype.slice.call(arguments,2):(r=Array.prototype.slice.call(arguments,1),e=t,t=null),this.register(e,["patch"],r,{name:t}),this}},{key:"use",value:function(){var t=this,e=Array.prototype.slice.call(arguments),r="(.*)";return Array.isArray(e[0])&&"string"==typeof e[0][0]?(e[0].forEach(function(r){t.use.apply(t,[r].concat(e.slice(1)))}),this):("string"==typeof e[0]&&(r=e.shift()),e.forEach(function(e){e.router?(e.router.stack.forEach(function(e){r&&e.setPrefix(r),t.opts.prefix&&e.setPrefix(t.opts.prefix),t.stack.push(e)}),t.params&&Object.keys(t.params).forEach(function(r){e.router.param(r,t.params[r])})):t.register(r,[],e,{end:!1})}),this)}},{key:"prefix",value:function(t){return t=t.replace(/\/$/,""),this.opts.prefix=t,this.stack.forEach(function(e){e.setPrefix(t)}),this}},{key:"routes",value:function(){var t=this,e=function(e,r){var n=t.opts.routerPath||e.routerPath||e.req.pathname,o=t.match(n,e.method),i=void 0;return e.matched?e.matched.push.apply(e.matched,o.path):e.matched=o.path,o.route?(i=o.pathAndMethod.reduce(function(t,e){return t.push(function(t,r){return t.captures=e.captures(n,t.captures),t.params=e.params(n,t.captures,t.params),r()}),t.concat(e.stack)},[]),(0,a["default"])(i)(e,r)):r()};return e.router=this,e}},{key:"all",value:function(t,e,r){var r;return"string"==typeof e?r=Array.prototype.slice.call(arguments,2):(r=Array.prototype.slice.call(arguments,1),e=t,t=null),this.register(e,f,r,{name:t}),this}},{key:"register",value:function(t,e,r,n){n=n||{};var o=this,i=this.stack;if(Array.isArray(t))return t.forEach(function(t){o.register.call(o,t,e,r,n)}),this;var s=new c["default"](t,e,r,{end:n.end!==!1||n.end,name:n.name,sensitive:n.sensitive||this.opts.sensitive||!1,strict:n.strict||this.opts.strict||!1,prefix:n.prefix||this.opts.prefix||""});return this.opts.prefix&&s.setPrefix(this.opts.prefix),Object.keys(this.params).forEach(function(t){s.param(t,this.params[t])},this),i.push(s),s}},{key:"route",value:function(t){for(var e=this.stack,r=e.length,n=0;n<r;n++)if(e[n].name&&e[n].name===t)return e[n];return!1}},{key:"url",value:function(t,e){var r=this.route(t);if(r){var n=Array.prototype.slice.call(arguments,1);return r.url.apply(r,n)}return new Error("No route found for name: "+t)}},{key:"match",value:function(t,e){for(var r,n=this.stack,o={path:[],pathAndMethod:[],route:!1},i=n.length,s=0;s<i;s++)r=n[s],r.match(t)&&(o.path.push(r),0!==r.methods.length&&~r.methods.indexOf(e)||(o.pathAndMethod.push(r),r.methods.length&&(o.route=!0)));return o}},{key:"param",value:function(t,e){return this.params[t]=e,this.stack.forEach(function(r){r.param(t,e)}),this}}],[{key:"url",value:function(t,e){return c["default"].prototype.url.call({path:t},e)}}]),t}();e["default"]=l,t.exports=e["default"]},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){try{return decodeURIComponent(t)}catch(e){return t}}Object.defineProperty(e,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},a=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),u=r(4),c=n(u),f=function(){function t(e,r,n,i){o(this,t),this.opts=i||{},this.name=this.opts.name||null,this.methods=[],this.paramNames=[],this.stack=Array.isArray(n)?n:[n],r.forEach(function(t){var e=this.methods.push(t.toUpperCase());"GET"===this.methods[e-1]&&this.methods.unshift("HEAD")},this),this.stack.forEach(function(t){var n="undefined"==typeof t?"undefined":s(t);if("function"!==n)throw new Error(r.toString()+" `"+(this.opts.name||e)+"`: `middleware` must be a function, not `"+n+"`")},this),this.path=e,this.regexp=(0,c["default"])(e,this.paramNames,this.opts)}return a(t,[{key:"match",value:function(t){return this.regexp.test(t)}},{key:"params",value:function e(t,r,n){for(var e=n||{},o=r.length,s=0;s<o;s++)if(this.paramNames[s]){var a=r[s];e[this.paramNames[s].name]=a?i(a):a}return e}},{key:"captures",value:function(t){return t.match(this.regexp).slice(1)}},{key:"url",value:function r(t){var e=t,r=this.path,n=c["default"].compile(r);if("object"!=("undefined"==typeof t?"undefined":s(t))&&(e=Array.prototype.slice.call(arguments)),e instanceof Array){for(var o=c["default"].parse(r),i={},a=o.length,u=0,f=0;u<a;u++)o[u].name&&(i[o[u].name]=e[f++]);return n(i)}return n(t)}},{key:"param",value:function(t,e){var r=this.stack,n=this.paramNames,o=function(r,n){return e.call(this,r.params[t],r,n)};return o.param=t,n.forEach(function(e,i){var s=n[i-1];t===e.name&&(s?r.some(function(t,e){if(t.param===s.name)return r.splice(e,0,o)})||r.some(function(t,e){if(!t.param)return r.splice(e,0,o)}):r.unshift(o))}),this}},{key:"setPrefix",value:function(t){return this.path&&(this.path=t+this.path,this.paramNames=[],this.regexp=(0,c["default"])(this.path,this.paramNames,this.opts)),this}}]),t}();e["default"]=f,t.exports=e["default"]},function(t,e,r){"use strict";function n(t){if(!Array.isArray(t))throw new TypeError("Middleware stack must be an array!");var e=!0,r=!1,n=void 0;try{for(var i,s=t[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var a=i.value;if("function"!=typeof a)throw new TypeError("Middleware must be composed of functions!")}}catch(u){r=!0,n=u}finally{try{!e&&s["return"]&&s["return"]()}finally{if(r)throw n}}return function(e,r){function n(s){if(s<=i)return o.Promise.reject(new Error("next() called multiple times"));i=s;var a=t[s]||r;if(!a)return o.Promise.resolve();try{return o.Promise.resolve(a(e,function(){return n(s+1)}))}catch(u){return o.Promise.reject(u)}}var i=-1;return n(0)}}var o=r(3);t.exports=n},function(t,e,r){var n;(function(t,o,i){/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
(function(){"use strict";function s(t){return"function"==typeof t||"object"==typeof t&&null!==t}function a(t){return"function"==typeof t}function u(t){B=t}function c(t){tt=t}function f(){return function(){t.nextTick(y)}}function l(){return function(){z(y)}}function p(){var t=0,e=new nt(y),r=document.createTextNode("");return e.observe(r,{characterData:!0}),function(){r.data=t=++t%2}}function h(){var t=new MessageChannel;return t.port1.onmessage=y,function(){t.port2.postMessage(0)}}function d(){return function(){setTimeout(y,1)}}function y(){for(var t=0;t<Z;t+=2){var e=st[t],r=st[t+1];e(r),st[t]=void 0,st[t+1]=void 0}Z=0}function m(){try{var t=r(9);return z=t.runOnLoop||t.runOnContext,l()}catch(e){return d()}}function v(t,e){var r=this,n=new this.constructor(w);void 0===n[ct]&&L(n);var o=r._state;if(o){var i=arguments[o-1];tt(function(){$(o,n,i,r._result)})}else C(r,n,t,e);return n}function g(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var r=new e(w);return T(r,t),r}function w(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function _(){return new TypeError("A promises callback cannot return that same promise.")}function x(t){try{return t.then}catch(e){return ht.error=e,ht}}function E(t,e,r,n){try{t.call(e,r,n)}catch(o){return o}}function A(t,e,r){tt(function(t){var n=!1,o=E(r,e,function(r){n||(n=!0,e!==r?T(t,r):S(t,r))},function(e){n||(n=!0,M(t,e))},"Settle: "+(t._label||" unknown promise"));!n&&o&&(n=!0,M(t,o))},t)}function k(t,e){e._state===lt?S(t,e._result):e._state===pt?M(t,e._result):C(e,void 0,function(e){T(t,e)},function(e){M(t,e)})}function j(t,e,r){e.constructor===t.constructor&&r===at&&constructor.resolve===ut?k(t,e):r===ht?M(t,ht.error):void 0===r?S(t,e):a(r)?A(t,e,r):S(t,e)}function T(t,e){t===e?M(t,b()):s(e)?j(t,e,x(e)):S(t,e)}function P(t){t._onerror&&t._onerror(t._result),O(t)}function S(t,e){t._state===ft&&(t._result=e,t._state=lt,0!==t._subscribers.length&&tt(O,t))}function M(t,e){t._state===ft&&(t._state=pt,t._result=e,tt(P,t))}function C(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+lt]=r,o[i+pt]=n,0===i&&t._state&&tt(O,t)}function O(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n,o,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?$(r,n,o,i):o(i);t._subscribers.length=0}}function R(){this.error=null}function N(t,e){try{return t(e)}catch(r){return dt.error=r,dt}}function $(t,e,r,n){var o,i,s,u,c=a(r);if(c){if(o=N(r,n),o===dt?(u=!0,i=o.error,o=null):s=!0,e===o)return void M(e,_())}else o=n,s=!0;e._state!==ft||(c&&s?T(e,o):u?M(e,i):t===lt?S(e,o):t===pt&&M(e,o))}function U(t,e){try{e(function(e){T(t,e)},function(e){M(t,e)})}catch(r){M(t,r)}}function I(){return yt++}function L(t){t[ct]=yt++,t._state=void 0,t._result=void 0,t._subscribers=[]}function F(t){return new bt(this,t).promise}function Y(t){var e=this;return new e(X(t)?function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)}:function(t,e){e(new TypeError("You must pass an array to race."))})}function D(t){var e=this,r=new e(w);return M(r,t),r}function H(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function J(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function V(t){this[ct]=I(),this._result=this._state=void 0,this._subscribers=[],w!==t&&("function"!=typeof t&&H(),this instanceof V?U(this,t):J())}function q(t,e){this._instanceConstructor=t,this.promise=new t(w),this.promise[ct]||L(this.promise),X(e)?(this._input=e,this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&S(this.promise,this._result))):M(this.promise,G())}function G(){return new Error("Array Methods must be provided an Array")}function K(){var t;if("undefined"!=typeof o)t=o;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var r=t.Promise;r&&"[object Promise]"===Object.prototype.toString.call(r.resolve())&&!r.cast||(t.Promise=wt)}var W;W=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var z,B,Q,X=W,Z=0,tt=function(t,e){st[Z]=t,st[Z+1]=e,Z+=2,2===Z&&(B?B(y):Q())},et="undefined"!=typeof window?window:void 0,rt=et||{},nt=rt.MutationObserver||rt.WebKitMutationObserver,ot="undefined"==typeof self&&"undefined"!=typeof t&&"[object process]"==={}.toString.call(t),it="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,st=new Array(1e3);Q=ot?f():nt?p():it?h():void 0===et?m():d();var at=v,ut=g,ct=Math.random().toString(36).substring(16),ft=void 0,lt=1,pt=2,ht=new R,dt=new R,yt=0,mt=F,vt=Y,gt=D,wt=V;V.all=mt,V.race=vt,V.resolve=ut,V.reject=gt,V._setScheduler=u,V._setAsap=c,V._asap=tt,V.prototype={constructor:V,then:at,"catch":function(t){return this.then(null,t)}};var bt=q;q.prototype._enumerate=function(){for(var t=this.length,e=this._input,r=0;this._state===ft&&r<t;r++)this._eachEntry(e[r],r)},q.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===ut){var o=x(t);if(o===at&&t._state!==ft)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===wt){var i=new r(w);j(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new r(function(e){e(t)}),e)}else this._willSettleAt(n(t),e)},q.prototype._settledAt=function(t,e,r){var n=this.promise;n._state===ft&&(this._remaining--,t===pt?M(n,r):this._result[e]=r),0===this._remaining&&S(n,this._result)},q.prototype._willSettleAt=function(t,e){var r=this;C(t,void 0,function(t){r._settledAt(lt,e,t)},function(t){r._settledAt(pt,e,t)})};var _t=K,xt={Promise:wt,polyfill:_t};r(7).amd?(n=function(){return xt}.call(e,r,e,i),!(void 0!==n&&(i.exports=n))):"undefined"!=typeof i&&i.exports?i.exports=xt:"undefined"!=typeof this&&(this.ES6Promise=xt),_t()}).call(this)}).call(e,r(6),function(){return this}(),r(8)(t))},function(t,e,r){function n(t){for(var e,r=[],n=0,o=0,i="";null!=(e=g.exec(t));){var s=e[0],a=e[1],u=e.index;if(i+=t.slice(o,u),o=u+s.length,a)i+=a[1];else{var f=t[o],l=e[2],p=e[3],h=e[4],d=e[5],y=e[6],m=e[7];i&&(r.push(i),i="");var v=null!=l&&null!=f&&f!==l,w="+"===y||"*"===y,b="?"===y||"*"===y,_=e[2]||"/",x=h||d||(m?".*":"[^"+_+"]+?");r.push({name:p||n++,prefix:l||"",delimiter:_,optional:b,repeat:w,partial:v,asterisk:!!m,pattern:c(x)})}}return o<t.length&&(i+=t.substr(o)),i&&r.push(i),r}function o(t){return a(n(t))}function i(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function s(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function a(t){for(var e=new Array(t.length),r=0;r<t.length;r++)"object"==typeof t[r]&&(e[r]=new RegExp("^(?:"+t[r].pattern+")$"));return function(r,n){for(var o="",a=r||{},u=n||{},c=u.pretty?i:encodeURIComponent,f=0;f<t.length;f++){var l=t[f];if("string"!=typeof l){var p,h=a[l.name];if(null==h){if(l.optional){l.partial&&(o+=l.prefix);continue}throw new TypeError('Expected "'+l.name+'" to be defined')}if(v(h)){if(!l.repeat)throw new TypeError('Expected "'+l.name+'" to not repeat, but received `'+JSON.stringify(h)+"`");if(0===h.length){if(l.optional)continue;throw new TypeError('Expected "'+l.name+'" to not be empty')}for(var d=0;d<h.length;d++){if(p=c(h[d]),!e[f].test(p))throw new TypeError('Expected all "'+l.name+'" to match "'+l.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?l.prefix:l.delimiter)+p}}else{if(p=l.asterisk?s(h):c(h),!e[f].test(p))throw new TypeError('Expected "'+l.name+'" to match "'+l.pattern+'", but received "'+p+'"');o+=l.prefix+p}}else o+=l}return o}}function u(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function c(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function f(t,e){return t.keys=e,t}function l(t){return t.sensitive?"":"i"}function p(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(t,e)}function h(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(m(t[o],e,r).source);var i=new RegExp("(?:"+n.join("|")+")",l(r));return f(i,e)}function d(t,e,r){for(var o=n(t),i=y(o,r),s=0;s<o.length;s++)"string"!=typeof o[s]&&e.push(o[s]);return f(i,e)}function y(t,e){e=e||{};for(var r=e.strict,n=e.end!==!1,o="",i=t[t.length-1],s="string"==typeof i&&/\/$/.test(i),a=0;a<t.length;a++){var c=t[a];if("string"==typeof c)o+=u(c);else{var f=u(c.prefix),p="(?:"+c.pattern+")";c.repeat&&(p+="(?:"+f+p+")*"),p=c.optional?c.partial?f+"("+p+")?":"(?:"+f+"("+p+"))?":f+"("+p+")",o+=p}}return r||(o=(s?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=n?"$":r&&s?"":"(?=\\/|$)",new RegExp("^"+o,l(e))}function m(t,e,r){return e=e||[],v(e)?r||(r={}):(r=e,e=[]),t instanceof RegExp?p(t,e):v(t)?h(t,e,r):d(t,e,r)}var v=r(5);t.exports=m,t.exports.parse=n,t.exports.compile=o,t.exports.tokensToFunction=a,t.exports.tokensToRegExp=y;var g=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},function(t,e){t.exports=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)}},function(t,e){function r(){l&&c&&(l=!1,c.length?f=c.concat(f):p=-1,f.length&&n())}function n(){if(!l){var t=s(r);l=!0;for(var e=f.length;e;){for(c=f,f=[];++p<e;)c&&c[p].run();p=-1,e=f.length}c=null,l=!1,a(t)}}function o(t,e){this.fun=t,this.array=e}function i(){}var s,a,u=t.exports={};!function(){try{s=setTimeout}catch(t){s=function(){throw new Error("setTimeout is not defined")}}try{a=clearTimeout}catch(t){a=function(){throw new Error("clearTimeout is not defined")}}}();var c,f=[],l=!1,p=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];f.push(new o(t,e)),1!==f.length||l||s(n,0)},o.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=i,u.addListener=i,u.once=i,u.off=i,u.removeListener=i,u.removeAllListeners=i,u.emit=i,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e){}])});