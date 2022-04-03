const { kill } = require('process');
const {Client} = require('whatsapp-web.js');

let client;
let killClient = false;
let timer = null;


const createSession = async (req, res)=>{
    try {
        client = new Client({qrMaxRetries: 1});
        killClient = true;
        if(timer){
            clearTimeout(timer);
        }

        client.on('qr', (qr) => {
        // Generate and scan this code with your phone
            console.log((new Date()).getTime() ,': ',  qr);
            res.json({
                status: true,
                data: {
                    urlCode: qr,
                },
            });
            // timer = setTimeout(()=>{
            //     if(killClient){
            //         console.log('Client Killed');
            //         client.destroy();
            //     }
            // }, 120000)
        });
        client.on('authenticated', ()=>{
            killClient = false;
        });
        client.initialize();
    } catch (err) {
        console.log(err);
    }
};


const sendMessages = async (req, res) => {
    try{
        if (!req.body.list) {
            return res.send({
                status: false,
                message: 'list required',
            });
        }
        if (!req.body.message) {
            return res.send({
                status: false,
                message: 'message required',
            });
        }
        const input = req.body.list.split('\n');
        const list = [];
        const failedList = [];

        input.forEach( (num) => {
            num = num.trim();
            num.replace('+', '');
            if ((num.length == 12 && num[0]=='9' && num[0]=='1')) {
                list.push(`${num}@c.us`);
            } else if (num.length == 10) {
                list.push(`91${num}@c.us`);
            } else {
                failedList.push(num);
            }
        });

        for (const num of list) {
            try {
                await client.sendMessage(num, req.body.message);
            } catch (err) {
                failedList.push(num.split('@')[0]);
            }
        }

        res.json({
            status: true,
            data: {
                failedList,
            },
        });
    } catch(err){
        console.log(err);
        res.status(500).send("Error");
    }
};


module.exports = {
    sendMessages,
    createSession,
};

