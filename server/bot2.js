const {Client} = require('whatsapp-web.js');

let client;

const createSession = async (req, res)=>{
    try {
        client = new Client({qrMaxRetries: 1});

        client.on('qr', (qr) => {
        // Generate and scan this code with your phone
            console.log('QR RECEIVED', qr);
            res.json({
                status: true,
                data: {
                    urlCode: qr,
                },
            });
        });
        client.initialize();
    } catch (err) {
        console.log(err);
    }
};


const sendMessages = async (req, res) => {
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
};


module.exports = {
    sendMessages,
    createSession,
};

