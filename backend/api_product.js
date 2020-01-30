const express = require('express')
const router = express.Router()
const jwt = require('./jwt')
const Product = require('./models/product')
const uuidv1 = require('uuid/v1')
const formidable = require('formidable')
const fs = require('fs-extra')

router.get('/product', jwt.verify, async (req, res) => {
    try {
        let result = await Product.find({}).sort({ product_id: -1 })
        if (!result) {
            return res.statusCode(404).json({ result: result, message: "Failure" })
        }
        res.json({ result: result, message: "Request Successfully" })
    } catch (error) {
        res.status(500).json({ result: error, message: "Failure" })
    }
})

router.get('/product/:id', jwt.verify, async (req, res) => {
    try {
        const id = req.params.id
        let result = await Product.findOne({ product_id: id }, { stock: 0 })
        if (!result) {
            return res.statusCode(404).json({ result: result, message: "Failure" })
        }
        res.json({ result: result, message: "Request Successfully" })
    } catch (error) {
        res.status(500).json({ result: error, message: "Failure" })
    }
})

router.post('/product', jwt.verify, (req, res) => {
    let form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
        fields.image = await uploadImage(files) || ''
        let result = await Product.create(fields)
        res.json({ result: result, message: 'insert successfully' })
    })
})

router.put('/product/:id', jwt.verify, async (req, res) => {
    const result = await Product.findOne({ product_id: req.params.id })
    if (result) {
        let form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {
            fields.image = await uploadImage(files) || result.image
            let doc = await Product.findOneAndUpdate({ product_id: result.product_id }, fields)
            res.json({ result: doc, message: 'update successfully' })
        })
    }
    else {
        res.status(404).json({ result: result, message: '' })
    }
})

router.delete('/product/:id', jwt.verify, async (req, res) => {
    try {
        const id = req.params.id
        let result = await Product.findOneAndDelete({ product_id: id })
        if (!result) {
            return res.statusCode(404).json({ result: result, message: "Failure" })
        }
        res.json({ result: result, message: "Request Successfully" })
    } catch (error) {
        res.status(500).json({ result: error, message: "Failure" })
    }
})

uploadImage = async (files) => {
    var fileName
    const image = files.image
    if (image && image.size > 0) {
        const fileExtention = image.name.split('.')[image.name.length - 1]
        fileName = `${uuidv1()}.${fileExtention}`
        const oldpath = image.path
        const newpath = `${__dirname}/uploaded/images/${fileName}`
        if (fs.exists(newpath)) {
            await fs.remove(newpath)
        }
        await fs.move(oldpath, newpath)
    }
    return fileName
}


module.exports = router