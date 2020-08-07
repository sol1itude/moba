const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    avatar: String,
    title: String,
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores: {
        difficult: Number,
        skills: Number,
        attack: Number,
        survive: Number
    },
    skills: [{
        icon: String,
        name: String,
        description: String,
        tips: String
    }],
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],//顺风出装
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],//逆风出装
    usageTips: String,
    battleTips: String,
    teamTips: String,
    partners: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero'
        },
        description: String
    }]

})

module.exports = mongoose.model('Hero', schema)