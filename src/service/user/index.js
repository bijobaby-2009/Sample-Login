import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database = 'user.db';

export async function createUserTable(){
    try {
        let db = await SQLite.openDatabase({ name :database , location : 'default'});
        return await db.executeSql(
            'CREATE TABLE IF NOT EXISTS user ( id int PRIMARY KEY, name TEXT, email TEXT, phone TEXT);'
        );
    }
    catch (e)
    {
        throw e;
    }
}
export async function insertUserTable(data){
    try {

        console.log('ins',data);
        let db = await SQLite.openDatabase({name:database, location: 'default'});
        let dbData= await db.executeSql(
            'INSERT OR REPLACE INTO user (id,name,email,phone) VALUES (?,?,?,?)', [data.id,data.name,data.email,data.phone]
        );
        console.log('dbData',dbData);
        return dbData;
    }
    catch (e)
    {
        throw e;
    }
}

export async function getUserData(resultCB){
    try {
        let db = await SQLite.openDatabase({name:database, location:'default'});
        console.log('db',db);
        let results = await db.executeSql('SELECT * FROM user');
        console.log('result3',results);
        let data = [];
        if ( results && results.length > 0 && results[0].rows) {
           const len = results[0].rows.length;
           console.log('result4',results[0].rows);
           for (let i = 0; i < len; i++){
                let item = results[0].rows.item(i);
                data.push(item);
           }
        }
        resultCB(data);
    }
    catch (e)
    {
        throw e;
    }
}

export async function getLastUserData(resultCB){
    try {
        let db = await SQLite.openDatabase({name:database, location:'default'});
        let results = db.executeSql('SELECT *FROM user ORDER BY id DESC LIMIT 1');
        let data = [];
        if ( results && (await results).length > 0 && results[0].rows){
            const len = results[0].rows.length;
            for (let i = 0; i < len; i++ ){
                 let item = results[0].rows.item(i);
                 data.push(item);
            }
        }
        resultCB(data);
    }
    catch (e)
    {
        throw e;
    }
}
