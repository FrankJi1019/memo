const express = require('express')
const Memo = require('../models/memo')

const router = express.Router()

router.post('/', (req, res) => {
    let data = ''
    req.on('data', chuck => {
        data += chuck
    })
    req.on('end', () => {
        data = JSON.parse(data)
        const newMemo = new Memo({
            ...data,
            date: new Date(data.date)
        })
        newMemo.save().then(() => {
            Memo.find().then(memos => {
                memos = memos.filter(memo => {
                    return newMemo.username === memo.username
                })
                res.json({memos})
            })
        })
    })
})

router.get('/:username', (req, res) => {
    Memo.find().then(memos => {
        memos = memos.filter(memo => {
            return memo.username === req.params.username
        })
        res.json({memos})
    })
})

module.exports = router