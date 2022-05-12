const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")

const config = require('./config/key')

const { User } = require("./model/User")

// 분석해서 가져올 수 있게
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
//userNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
mongoose.connect(config.mongoURI).then(()=> console.log('mongo finally'))
    .catch(err=>console.log(err));


app.get('/', (req, res) => {
    res.send('Hello World 안녕하세요! 저절로 될까?')
})


app.post('/register', (req, res) => {

    // 회원가입할떄 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터베이스에 넣어준다
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })

    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})