
import SQLite from 'react-native-sqlite-storage';

const TimeNum = {
    min: 60,
   hour: 60 * 60,
    day: 60 * 60 * 24,
  month: 60 * 60 * 24 * 30,
   year: 60 * 60 * 24 * 30 * 12,
  never: 9999999999
};
function getTime(){
  return Math.floor(Date.now() / 1000);
}
class Storage{
    constructor(){
        const db = SQLite.openDatabase(
            {
                name: 'cache.db',
                location: 'default'
            },
            () => {},
            error => alert(error)
        );
        const createTable = () => {
            db.transaction((tr) =>{
                tr.executeSql("CREATE TABLE IF NOT EXISTS `cache` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, `key` TEXT NOT NULL , `value` TEXT NOT NULL , `created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , `expire_time` BIGINT NOT NULL DEFAULT '86400')")
            })
        };
        createTable();
        this.db = db;
    }
    async getItem(key, success, error){
        var result = undefined;
        await this.db.transaction(async (tr) => {
            await tr.executeSql(
                "SELECT * FROM `cache` WHERE `key`=? LIMIT 1",
                [key],
                (tx, result) => {
                    var len = result.rows.length;
                    if (len == 1){
                        var result = result.rows.item(0);
                    }
                }
            );
        });
        if (result == undefined) return error();
        if (result.expire_time + result.created < getTime()) return error();
        return success(JSON.parse(result.value));
    }
    async setItem(key, value, expire_time = TimeNum.day){
        value = JSON.stringify(value);
        this.getItem(
            key,
            () => {
                this.db.transaction((tx) => {
                    tx.executeSql(
                        "UPDATE `cache` SET value=?, expire_time=?, created=? WHERE key=? LIMIT 1",
                        [value, expire_time, getTime(), key]
                    )
                })
            },
            () => {
                this.db.transaction((tr) => {
                    tr.executeSql(
                        "INSERT INTO `cache` (key, value, expire_time) VALUES (?, ?, ?)"
                        [key, value, expire_time]
                    );
                });
            }
        );
    }
    async remove(key){
        this.db.transaction((tr) => {
            tr.executeSql(
                "DELETE FROM `cache` WHERE `key`=? LIMIT 1",
                [key]
            );
        });
    }

}
class AuthAPI{
    constructor(cache){
        this.cache = cache;
        this.token = null;
        this.domain = 'https://baragunda.ru/sfedu/';
    }
    loginByToken(callback, error){
        this.requesGet('@auth/login.php', {token: this.token}, this._loginByToken);
    }
    _loginByToken(result){
        let json = result.json();
        if (json?.status == 'success'){
            this.cache.setItem('authorized', true);
            this.data = json.data;
        }
    }
    loginByPassword(email, password){
        this.requesGet('@auth/get_token.php', {email: email, password: password}, this._loginByPassword);
    }
    _loginByPassword(result){
        let json = result.json();
        if (json?.status == 'success'){
            this.token = json.token;
            this.loginByToken();
        }
    }
    register(first_name, last_name, education_level, email, password){
        this.requesGet('@auth/reg.php', {
            first_name: first_name,
            last_name: last_name,
            education_level: education_level,
            email: email,
            password: password
        }, (e) => this._register(e, {email:email, password:password}));
    }
    _register(result, data){
        let json = result.json();
        if (json?.status == 'success'){
            this.loginByPassword(...data);
        }
    }
    requesGet(url, params, callback){
        url = url.replace('@', this.domain);
        url = url + '?' + new URLSearchParams(params).toString();
        return fetch(url).then(result => callback(result));
    }
}
class CacheManager{
    constructor(){
        this.localStorage = {};
        this.storage = new Storage();
    }
    onLoad(){
        this.storage.setItem('authorized', false);
        this.localStorage.authorized = false;
    }
    isAuth(){
        var r = false;
        this.storage.getItem('authorized', (v) => {r = v;}, () => {r = false;});
        this.localStorage.authorized = r;
        return r;
    }
};
module.exports.cache = new CacheManager();
module.exports.api = new AuthAPI(module.exports.cache);