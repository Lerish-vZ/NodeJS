/////////////////////////////////////9.3/////////////////////////////////////

//////////9_6/////////

exports.sendReqParam = (req, res) => { //create a funtion to handle route-specific requests
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
}