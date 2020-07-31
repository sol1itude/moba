module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const Category = require('../../models/Category');
    router.post('/categories', async (req, res) => {
        const category = await Category.create(req.body);
        res.send(category);
    })
    app.use('/admin/api', router)
}


