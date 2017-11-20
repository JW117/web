var mysql = require('mysql');

var pool;

exports.connect = function(done) {
    pool = mysql.createPool({
        connectionLimit: 100,   //접속 인원 수. 앱 접속 인원 많아지면 증가시킬 필요
        host : 'localhost',
        user : 'root',
        password : 'bestfood',
        database : 'bestfood' 
    });
}

exports.get = function() {
    return pool;
}