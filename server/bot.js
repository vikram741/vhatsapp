const venom = require('venom-bot');
let client;

const createSession = async (req, res)=>{
    try {
        client = undefined;
        client = await venom.create(
            'sessionName',
            (base64Qr, asciiQR, attempts, urlCode) => {
                const matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                const buff = Buffer.from(matches[2], 'base64');
                const text = buff.toString('ascii');
                res.send({
                    status: true,
                    data: {
                        qrCode: text,
                        asciiQR,
                        urlCode,
                    },
                });
            },
            undefined,
            {
                multidevice: false, // for version not multidevice use false.(default: true)
                headless: true, // Headless chrome
                devtools: false, // Open devtools by default
                debug: false, // Opens a debug session
                logQR: false, // Logs QR automatically in terminal
                disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
                disableWelcome: true, // Will disable the welcoming message which appears in the beginning

                autoClose: 60000,
                // Automatically closes the venom-bot only when scanning the QR code
                // (default 60 seconds, if you want to turn it off, assign 0 or false)
            },
        );
    } catch (err) {
        console.log(err);
    }
};


const sendMessages = async (req, res) => {
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
            await client.sendText(num, req.body.message);
        } catch (err) {
            failedList.push(num.split('@')[0]);
        }
    }

    res.send({
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

