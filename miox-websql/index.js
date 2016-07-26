/**
 * Created by evio on 16/7/26.
 */
'use strict';
if ( typeof window.openDatabase === 'undefined' ){
    throw new TypeError('Not support `window.openDatabase`!');
}

const DatabaseSize = 10 * 24 * 24;

import TABLE from './table';

export default class WebSQL {
    constructor(name, version = '', desc = new Date().getTime(), size = DatabaseSize){
        this.name = name;
        this.version = version;
        this.description = desc;
        this.size = size;
        this.__tableConstructor__ = {};
        this.__modals__ = {};
    }

    modals(data){
        this.__modals__ = data;
        return this;
    }

    table(name){
        if ( name ){
            const table = this.__tableConstructor__[name];
            if ( !table ){
                throw new Error('table `' + name + '` is not exists');
            }
            return table;
        }
        return this.__tableConstructor__;
    }

    async open(){
        try{
            const db = window.openDatabase(this.name, this.version, this.description, this.size);
            if ( !db ) throw new Error('open database of `' + this.name + '` faild.');
            this.db = db;
            await this.scanTables();
        }catch(e){
            throw new Error('Something went wrong when open database. \nThe error description is:', e);
        }
    }

    async exec(sql, args = []){
        if ( !sql ){
            throw new Error('miss sql string');
        }
        return await new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql(sql, args,
                    function(transacte, result){
                        result.value = compile(result.rows);
                        resolve(result);
                    },
                    function (transacte, err){
                        reject(err);
                    }
                );
            })
        });
    }

    async scanTables(){
        let table;
        const tx = await this.exec('SELECT name FROM sqlite_master WHERE type=? ORDER BY name ASC', ['table']);
        const rows = tx.value;
        const tables = this.table();
        let i = rows.length;
        while ( i-- ) {
            const item = rows[i];
            table = new TABLE(item.name, this);
            await table.scan();
            tables[item.name] = table;
            if ( this.__modals__[item.name] ) {
                delete this.__modals__[item.name];
            }
        }

        const keys = Object.keys(this.__modals__);
        let j = keys.length;
        while (j--) {
            await this.createTable(keys[j], this.__modals__[keys[j]]);
            table = new TABLE(keys[j], this);
            await table.scan();
            tables[keys[j]] = table;
        }
        delete this.__modals__;
    }

    async createTable(name, colums){
        let sql = "CREATE TABLE IF NOT EXISTS " + name;
        let cols = [];
        for ( let i in colums ){
            if ( colums[i] == 'key' ){
                colums[i] = 'integer primary key autoincrement';
            }
            cols.push(i + ' ' + colums[i]);
        }
        sql += ' (' + cols.join(',') + ');';

        await this.exec(sql);
    }
}

function compile(rows){
    if ( !rows ) return [];
    const result = [];
    for ( let i = 0 ; i < rows.length; i++ ){
        result.push(rows.item(i));
    }
    return result;
}