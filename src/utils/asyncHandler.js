const asyncHandler=(fun) => async (req,res,next)=>{
    try {
        await fun(req,res,next)
        
    } catch (error) {
        res.status(error.code || 500 ).json({
            message:error.message,
            success:false
        })
    }

}