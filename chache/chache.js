const client = require('./client')

const isChached = async(req,res,next)=>{
    const mail = req.params.email 
    const chachedData= JSON.parse(await client.get(mail))
    if(chachedData){
        return res.send(chachedData)
    }else{
        next()
    }
}

module.exports = isChached;

