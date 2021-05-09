const mysql = require('mysql');


class ConnectionString {
    constructor(user,host,port,database,password){
        this.user = user;
        this.host = host;
        this.PORT = port;
        this.database = database;
        this.password = password;
    }
}

//connection string to be reused
const connStr = new ConnectionString("root","localhost",3001,"employee_db","rootroot");

//connection function to get new connections
async function newConnect(){
    let conn = mysql.createConnection(connStr);
    conn.connect(err=>{
        if(err) throw err;
    });
    //console.log("connected");
    return conn;
}

class DAL {

    async getAllDepartments(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }
    async getAllDepartmentNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select name from department";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllEmployees(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select * from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }