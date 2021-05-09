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

    async getAllEmployeeNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = "select id, first_name,last_name from employee";
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllEmployeesFullData(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select  e.id,
            first_name,
            last_name,
            r.title,
            r.salary,
            (select concat(e2.first_name,' ',e2.last_name) from employee as e2 where e.manager_id = e2.id) as 'manager',
            d.name
            from employee as e
            left join role as r on e.role_id = r.id
            left join department as d on r.department_id = d.id`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }

    async getAllManagerNames(){

        let conn = await newConnect();    
        
        return new Promise((resolve,reject)=>{          
            
            let query = `select distinct id,
            concat(first_name, ' ',last_name) as 'name'          
            from employee
            where id in (select manager_id from employee where manager_id is not null)`;
            
            conn.query(query, (err,res)=>{
                if (err) throw err;
                conn.end();                
                resolve(res);
            });    
             
        });
    }