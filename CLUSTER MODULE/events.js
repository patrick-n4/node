
// const eventEmitter = require('events').EventEmitter;
// let event = new eventEmitter();
// event.on('msg', () => {
//     console.log("I am the message that you was waiting for!");
// })
// event.emit('msg')
// console.log(event.eventNames())
// console.log(process.env.PORT)
const http = require('http')
let a;
http.createServer((a, res) => {
    console.log(a);
})
console.log(a)