const URL = require('../models/url')

const landingPage = (req, res)=>{
    return res.send('Welcome to url shortner app')
}

const redirectUrl = async(req, res)=>{
    console.log('req.params: ', req.params)
    const id = req.params.id
    if(!id){
        return res.status(400).json({
            success: false,
            message: 'id params is requied'
        })
    }
    const data = await URL.findOneAndUpdate(
        {shortId: id},
        {$push:{
            visitHistory: {
                timestamp:  new Date()
            }
        }}
    )
    return res.redirect(data.redirectUrl)
}

module.exports = {
    landingPage,
    redirectUrl
}