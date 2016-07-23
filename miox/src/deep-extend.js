/**
 * Created by evio on 16/7/21.
 */
'use strict';

import unique from 'unique-array';

export default function(a, b){
    let d = Object.keys(b).sort();

    var i = d.length;
    while ( i-- ){
        let name = d[i];
        let value = b[name];
        let target = a[name];
        if ( target ){
            if ( Array.isArray(target) ){
                if ( Array.isArray(value) ){
                    a[name] = unique(target.concat(value));
                }else{
                    if ( target.indexOf(value) == -1 ){
                        target.push(value);
                    }
                }
            }else{
                if ( target != value ){
                    a[name] = [target, value];
                }
            }
        }else{
            a[name] = value;
        }
    }
    return a;
}