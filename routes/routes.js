
const {landingPage, redirectUrl} = require('../controllers/homescreen')

const routes = (app)=>{
    app.use('/url', require('./url')) 
    app.get('/', landingPage)  
    app.get('/:id', redirectUrl)
}

module.exports = {routes}