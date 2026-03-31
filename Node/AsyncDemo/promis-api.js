
// Setteled Promis 
const p = Promise.resolve({ id: 1 }); // alredy resolved promis
// p.then(res => console.log(res))

const p1 = Promise.reject(new Error("error"));
p1.catch(err => console.log(err.message))

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ id: 2 });
    }, 5000)

})
// Parallel Promise 

Promise.all([p, p2]).then(res => console.log(res))

Promise.race([p, p2]).then(res => console.log(res))