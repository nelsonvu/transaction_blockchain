// Nam Hoai Vu: vunam722000@gmail.com

const express = require('express');
const app = express();
const router = express.Router();
const server = require("http").createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const session = require('express-session');

require('dotenv').config();
require('./global')(server);

app.set('view engine', 'ejs');

app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require("cors")());

app.get('/', function(req, res) {
  res.render('pages/index');
});

router.use("/upload/backgrounds", express.static("upload/backgrounds"));

router.use('/auth', require('./modules/auth/auth.route'));

// Web3
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.WebsocketProvider('wss://speedy-nodes-nyc.moralis.io/9350000a43e8c70ad1fe86db/bsc/testnet/ws'));

// pendingTransactions
web3.eth.subscribe('pendingTransactions', function(error, result){
  // console.log("result", result)
})
.on("data", function(transaction){
  web3.eth.getTransaction(transaction)
    .then(res => {
      // console.log(res)
      if (res?.to === process.env.ADDRESS) {
        console.log(res)
      }
    });
});




// const subscription = web3.eth.subscribe('logs', {
//   address: '0xaac0b4759a635dbd6f9ead8683fad45b573d7404',
//   // topics: []
// }, function(error, result){
//   if (!error) {
//     console.log("9999", result);
//   } else {
//     console.log(error)
//   }
// })
// .on("connected", function(subscriptionId){
//   console.log("connected", subscriptionId);
// })
// .on("data", function(log){
//   console.log("data", log);
// })
// .on("changed", function(log){
//   console.log("changed", log);
// });

// unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//   if(success)
//       console.log('Successfully unsubscribed!');
// });

// app.post('/send-transaction', async (req, res) => {
//   try {
//     console.log("send")

//     var Tx = require('ethereumjs-tx').Transaction;
//     var privateKey = Buffer.from('cde2354d71b78d0471425114ffde86c5a7ac961dd1e9bc333ab17091830d26ed', 'hex');
  
//     console.log("*****", Number(10000000000).toString(16))
//     var rawTx = {
//       gasPrice: '0x' + Number(10000000000).toString(16),
//       gasLimit: '0x' + Number(31000).toString(16),
//       to: process.env.ADDRESS,
//       value: '0x' + Number(100000000000000).toString(16),
//     }
  
//     var tx = new Tx(rawTx);
//     tx.sign(privateKey);
  
//     var serializedTx = tx.serialize();
  
//     await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
//       .on('receipt', console.log);

//     res.status(200).json({
//       success: true,
//       messages: ['login_success'],
//     });
//   } catch(err) {
//     console.log(err)
//     res.status(400).json({
//       success: false,
//       messages: ['login_success'],
//     });
//   }
// })

app.use(router); 

server.listen(process.env.PORT || 9000, function () {
  console.log('Example app listening on port 9000!');
});

