
let one = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 5000);
  })
  let two =  Promise.resolve(2)
let three =  Promise.resolve(3)
Promise.race([one,two,three]).then(console.log)