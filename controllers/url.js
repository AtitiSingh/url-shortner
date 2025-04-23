const {nanoid} = require('nanoid')
const URL = require('../models/url')

const generateShortUrl = async(req, res)=>{
    console.log('req.body: ', req.body)
    if(!req.body){
        return res.status(400).json({
            success: false,
            message: 'Missing request body'
        })
    }
    let {url} = req.body
    if(!url){
        return res.status(400).json({
            success: false,
            message: 'Url is required to create short url'
        })
    }
    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectUrl: url,
        visitHistory: []
    })
    const data = await URL.find({shortId: shortId}).lean();
    return res.status(200).json({
        success: true,
        data: data
    })

}

const getUrlById = async(req, res)=>{
    console.log('req.params: ', req.params)
    const id = req.params.id
    if(!id){
        return res.status(400).json({
            success: false,
            message: 'id params is requied'
        })
    }
    const data = await URL.findOne({shortId: id}).lean()
    return res.status(200).json({
        success: true,
        data: data
    })
}

const getAllUrls = async(req, res)=>{
    const data = await URL.find().lean()
    return res.status(200).json({
        success: true,
        data: data
    })
}

const getAnalyticsOfUrlById = async(req, res)=>{
    console.log('req.params: ', req.params)
    const id = req.params.id
    if(!id){
        return res.status(400).json({
            success: false,
            message: 'id params is requied'
        })
    }
    const data = await URL.findOne({shortId: id}).lean()
    return res.status(200).json({
        success: true,
        clicks: data.visitHistory.length
    })
}

module.exports = {
    generateShortUrl,
    getUrlById,
    getAllUrls,
    getAnalyticsOfUrlById
}