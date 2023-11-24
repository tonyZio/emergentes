
module.exports.renderIndex = (req,res)=>{
    const token = req.cookies['jwt'];
    if(token){
        /*fetch('localhost:3000/login', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        }); */
        res.render('home',true);
    }
}