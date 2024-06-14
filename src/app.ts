import app from './server'

const PORT = process.env.PORT || 4003

let blocked = require("blocked");

blocked(ms => {
  console.log("EVENT LOOP Blocked", ms);
});


// setInterval(() => {
//   var last = process.hrtime.bigint()
//   setImmediate(() => {
//     var now = process.hrtime.bigint()
//     console.log((now - last))
//   })
// }, 500)

// var time = process.hrtime();
// process.nextTick(function() {
//    var diff = process.hrtime(time);
//    console.log('benchmark took %d nanoseconds', diff[0] * 1e9 + diff[1]);
// });


// console.log('Hello => number 1');
// setImmediate(() => {
//   console.log('Running before the timeout => number 3');
// });
// setTimeout(() => {
//   console.log('The timeout running last => number 4');
// }, 0);
// process.nextTick(() => {
//   console.log('Running at next tick => number 2');
// });

process.on('uncaughtException', (err)=>{
  console.log(err)
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})
