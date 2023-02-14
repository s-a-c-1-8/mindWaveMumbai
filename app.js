var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    port = 7788,
    fs = require('fs'),
    path = require("path"),
    bodyParser = require('body-parser'),
    thinkgear = require('node-thinkgear-sockets'),
    client = thinkgear.createClient({ enableRawOutput: false });
const  SerialPort  = require("serialport")
const { MockBinding } = require("@serialport/binding-mock");
const { SerialPortStream } = require("@serialport/stream");
const Readline = require('@serialport/parser-readline')
const usbport = new SerialPort("COM10", {
    baudRate: 9600
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/asset", express.static(path.join(__dirname, "asset")));

app.get('/', function (req, res) {
    res.render("home.ejs");
});

app.get('/acer', function (req, res) {
    res.render("example2.ejs");
});

app.get('/race', function (req, res) {
    res.render("gauage.ejs");
});

app.get('/login', function (req, res) {
    res.render("page3.ejs");
});

app.get('/winner', function (req, res) {
    res.render("winner.ejs");

});
app.get('/guage', function (req, res) {
    res.render("newGuage.ejs");
});

server.listen(port, () => console.log('on port' + port))

io.on('connection', onConnection);

var connectedSocket = null;

function onConnection(socket) {
    connectedSocket = socket;
}

client.on('data', function (data) {
    var myobj = data;
    // console.log(myobj);
    io.emit('meditation', (myobj.eSense.attention));
    console.log(myobj.eSense.attention);
    var data = myobj.eSense.attention
    var data = data.toString();
   
    // if (data == 0) {
    //     usbport.write('x', function (err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //         console.log('message written as ' + 'x');
    //     })
    // }

    // if (data > 0 && data <= 20) {
    //     usbport.write('a', function (err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //         console.log('message written as ' + 'a');
    //     })
    // }
    // if ((data > 20 && data <= 40)) {
    //     usbport.write('b', function (err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //         console.log('message written as ' + 'b');
    //     })
    // }
    // if ((data > 40 && data <= 70)) {
    //     usbport.write('c', function (err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //         console.log('message written as ' + 'c');
    //     })
    // }
    // if (data > 70) {
    //     usbport.write('d', function (err) {
    //         if (err) {
    //             return console.log('Error on write: ', err.message);
    //         }
    //         console.log('message written as ' + 'd');
    //     })
    // }
});

io.on('connection', function (socket) {
    console.log("conncted")

    socket.on("win", () => {
        console.log('winnnner');
        usbport.write('a', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written as ' + 'a');
        })
    })

    socket.on("start", () => {
        console.log('start');
        usbport.write('s', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written as ' + 's');
        })
    })

    socket.on("restart", () => {
        // alert('restart')
        console.log('re-start');
        usbport.write('z', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written as ' + 'z');
        })
    })

    socket.on("stop", () => {
        console.log('stop');
        usbport.write('x', function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written as ' + 'x');
        })
    })

});

client.connect();
  
parser = usbport.pipe(new Readline());
parser.on('data', function (data) {
    console.log(data);
    if (data == 1) {
    console.log('Winnner');
    io.emit('winner', 1);
    return
    }
});