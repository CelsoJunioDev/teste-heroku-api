const mongoose = require('mongoose');

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }
 
  dataBaseConnectionMongoDB(){
    const DB_USER = "admin"
    const DB_PASSWORD = "Cjsscjss1993"
    this.mongoDBConnection = mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.phhyv.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
    )
    .then(() => {
      console.log('Conectou ao banco!')

    })
    .catch((err) => console.log(err))
  }
}

module.exports = new Connection();