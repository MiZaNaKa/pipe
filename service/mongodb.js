var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

class MongoDBService {

    constructor() {
        // this.dbUrl = 'mongodb://localhost:27017';
        this.dbUrl = "mongodb+srv://KhinKhinThant:kktkkt295810@cluster0.ccbic.mongodb.net/";
        this.db = null;
        this.gfs = null;
        this.uploadGridFS = null;
        this.collection=null;
    }

    async start() {
        try {
            await this.connect(this.dbUrl);
            // logger.info('connected to Mongodb.');  
            console.log('connected to Mongodb.');       
        }
        catch (err) {
            // errorlogger.error('Unable to connect to Mongodb. -' + err);
            console.log('Unable to connect to Mongodb. -' + err);
        }
    }

    async connect(url){
        var con = await mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

        this.db = con.db('pipe');  
    }



    close(done) {
        var mongoDBService = this;
        if (mongoDBService.db) {
            mongoDBService.db.close(function (err, result) {
                mongoDBService.db = null;
            })
        }
    }
}

module.exports = new MongoDBService()