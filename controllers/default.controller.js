
/**
 * For non-existing routes
 * @param {Object} req 
 * @param {Object} res 
 */
exports.errorController = (req , res) =>{
    res.send({msg: "Page not found"})
}