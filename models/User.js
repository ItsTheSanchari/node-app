const client = require('../utils/database')
const mongoDb = require('mongodb')
class User {
    constructor(userName,email) {
        this.userName = userName
        this.email = email
    }
    save() {
        return client.db('shop').collection('User').insertOne({
            userName:this.userName,
            email:this.email
        }).then((userCreated) => {
            console.log('userCreated',userCreated)
        }).catch(error => {
            console.log('error',error)
        })
    }

    static findById(userId) {
        return client.db('shop').collection("User").findOne({
            _id : mongoDb.ObjectId(userId)
        })
        // .next()
        // .then((User)=>{
        //     console.log('found user',User)
        // })
        // .catch(error => {
        //     console.log('error',error)
        // })
    }


}