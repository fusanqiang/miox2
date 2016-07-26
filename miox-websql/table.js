/**
 * Created by evio on 16/7/26.
 */
'use strict';
import { EventEmitter } from 'events';

export default class TABLE extends EventEmitter {
    constructor(name, database){
        super();
        this.name = name;
        this.database = database;
        this.db = database.db;
        this.__fields__ = {}
    }

    field(name){
        if ( !name ) {
            return this.__fields__;
        }
        const field = this.__fields__[name];
        if ( !field ){
            throw new Error('miss field `' + name + '` in table of `' + this.name + '`');
        }
        return field;
    }

    async scan(){
        const tx = await this.database.exec('SELECT name, sql FROM sqlite_master WHERE type=? AND name=?', ['table', this.name]);
        const row = tx.value[0];
        const sql = row.sql;
        const sqlExec = /\s\((.+)\)$/.exec(sql);
        if ( sqlExec ){
            const str = sqlExec[1];
            const fields = this.field();
            const arr = str.split(',');
            const field = this.database.__modals__[this.name];
            for ( let i = 0 ; i < arr.length ; i++ ){
                const s = arr[i];
                const a = s.split(/\s+/g);
                const name = a[0];
                const value = a.slice(1).join(' ').trim();
                if ( field && field[name] ){
                    if ( field[name] === 'key' ){
                        field[name] = 'integer primary key autoincrement';
                    }
                    if ( !field[name] ){
                        await this.database.exec(add(this.name, name, value));
                    }
                    else{
                        if ( value !== field[name] ){
                            await this.database.exec(change(this.name, name, value));
                        }
                    }
                    fields[name] = value;
                }
            }
        }
    }

    async insert(data){
        const keys = Object.keys(data);
        let i = keys.length;
        const a = [], b = [], c = [];
        while (i--){
            a.push('?');
            b.push(keys[i]);
            c.push(data[keys[i]]);
        }
        if ( !a.length ) return Promise.reject(new Error('insert miss data'));
        return await this.database.exec('INSERT INTO  ' + this.name + ' (' + b.join(',') + ') VALUES (' + a.join(',') + ')', c);
    }

    async update(data, where, wheres){
        const keys = Object.keys(data);
        let i = keys.length;
        const a = [];
        let c = [];
        while (i--){
            a.push(keys[i] + '=?');
            c.push(data[keys[i]]);
        }
        if ( !a.length ) return Promise.reject(new Error('insert miss data'));
        let sql = 'UPDATE ' + this.name + ' SET ' + a.join(',');
        if ( where ){
            sql += ' WHERE ' + where;
            if ( wheres ){
                c = c.concat(wheres);
            }
        }
        const result = await this.database.exec(sql, c);
        this.emit('update', result);
        return result;
    }

    async delete(where, wheres){
        let sql = 'DELETE FROM ' + this.name;
        let arg = [];
        if ( where ){
            sql += ' WHERE ' + where;
            if ( wheres ){
                arg = arg.concat(wheres);
            }
        }
        const result = await this.database.exec(sql, arg);
        this.emit('delete', result);
        return result;
    }

    async exec(sql, args){
        const result = await this.database.exec(sql, args);
        this.emit('exec', result);
        return result;
    }
}

function change(table, name,value){
    return `ALTER TABLE ${table} ALTER COLUMN ${name} ${value}`;
}

function add(table, name, value){
    return `ALTER TABLE ${table} ADD ${name} ${value}`
}