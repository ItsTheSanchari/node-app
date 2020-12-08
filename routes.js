const fs = require('fs');
const requestHandler = (req,res) => {
    const url = req.url;
    const methodType = req.method;
    if(url == '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    } 
    if(url === '/message' && methodType === 'POST') {
        const body = []
        req.on('data',(chunk) => {
            console.log('chunk',chunk)
            body.push(chunk)
        })
        return req.on('end',()=>{
            const parsedbody = Buffer.concat(body).toString()
            const message = parsedbody.split('=')[1]
            fs.writeFile('message.txt',message,err => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            })
        })  
        
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>');
    res.write('<head><title>My First Node APP</head></title>');
    res.write('</html>');
    res.end(); 
}
// module.exports = 
// {
//     handler : requestHandler 
// };
// exports.handler = requestHandler;
// exports.textMessage = 'some hard coated text';
module.exports.handler = requestHandler;
module.exports.textMessage = 'some hard coated text';

