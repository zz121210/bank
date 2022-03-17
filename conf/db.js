const mysql = require('mysql')

const db = mysql.createConnection({
  connectionLimit : 100,
  waitForConnections : true,
  queueLimit :0,
  host     : 'zz12121000.cafe24.com',
  user     : 'zz12121000',
  password : 'rnfptskfn1!',
  database : 'zz12121000',
<<<<<<< HEAD
  // host     : 'localhost',
  // user     : 'root',
  // password : 'sk369369',
  // database : 'bank',
=======
>>>>>>> master
  wait_timeout : 28800,
  connect_timeout :10
})

function handleDisconnect() {
  db.connect(function(err) {            
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                   
  });                                 
                                         
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      return handleDisconnect();                      
    } else {                                    
      throw err;                              
    }
  });
}

handleDisconnect(); 

setInterval(() => { 
  db.query('SELECT 1'); 
}, 10000);

module.exports = db;