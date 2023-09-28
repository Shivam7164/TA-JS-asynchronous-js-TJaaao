1. Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using Promise.all log the value of each promise that it resolved with.

```js
let one = new Promise((res) => setTimeout(() => res(1), 1000));
let two = new Promise((res) => setTimeout(() => res(2), 2000));
let three = new Promise((res) => setTimeout(() => res(3), 3000));
let four = new Promise((res) => setTimeout(() => res(4), 4000));
Promise.all([one, two, three, four]).then(console.log);
```

2. Create a list of 5 Github usernames in an array and using Promise.all get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
let userList = [
  'lovekushrajput',
  'upendrarajput9',
  'ravindra-me',
  'shivam7164',
  'ajay11695',
];
Promise.all(
  userList.map((user) =>
    fetch(`https://api.github.com/users/${user}`).then((res) => res.json())
  )
).then((res) => {
  res.forEach((ele) => {
    ele.followers;
  });
  res.forEach((ele) => console.log(ele.followers));
});
```

3. Use Promise.race to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

```js
let dog = fetch('https://random.dog/woof.json')
  .then((res) => res.json())
  .then(console.log);
let cat = fetch('https://aws.random.cat/meow')
  .then((res) => res.json())
  .then(console.log);
Promise.race([dog, cat]);
```

4. Use Promise.allSettled to log the value of each promise from the given list of promises. And also check if Promise.all works with one, two and three or not

```js
let one =  Promise.resolve(1)
let two =  Promise.resolve(2)
let three =  Promise.resolve(3)
let four =  Promise.reject('error')
Promise.allSettled([one,two,three,four]).then(console.log)


No `Promise.all` is not working because are using a promise named (four) is rejected.

Promise.all([one,two,three,four]).then(console.log)

```

5. What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// output 

['Arya','Sam',{ name: 'John' }]
```

6.  What are the different states of promises. Give an example of each promise state.
ans => There are 3 different type of states in promises
- pending
-fullfilled
-reject

pending
ex - 
new Promise((res,reject)=> 'pending')

fulfilled
ex-
new Promise((res,reject)=> res('fulfilled promise'))

rejected
ex-
new Promise((res,reject)=> reject('something went wrong'))


7. What are the problems with the callback pattern. Give one example of a callback pattern.

ans => In callback function we cannot look what is going behind the scene.

ex- 
seeTimeout(()=> console.log('callback pattern'),2000)


8. What are the advantages of using promises over callback. Give one example of using a promise over callback.

when we using promise over callback is we can understand and look what is going behind the scene or you can look at the status.

ex - 
let data = new Promise((res,rej)=>{
    setTimeout( ()=> res('Promise resolved'),3000 )
})

9. What are methods available on a promise object. Give an example of each method.

ans=> There are 3  methods is available on a promise object.
- then
- catch
- finally

ex - 
then
let data = fetch('https://api.github.com/users').then(res => res.json()).then(user => user)

catch
data.catch(error=> console.log(error))

finally
data.finally(()=> console.log('finally'))


10. List all the static methods that can be used on the Promise constructor. Give an example of each method.
- all
all always return a promise that is resolve
ex -
let one =  Promise.resolve(1)
let two =  Promise.resolve(2)
let three =  Promise.resolve(3)
Promise.all([one,two,three]).then(console.log)(console.lo)

- allSetteled
allsettled return the promise whether it is in pending state,fullfilled,or error
ex -
let one =  Promise.resolve(1)
let two =  Promise.resolve(2)
let three =  Promise.resolve(3)
let four =  Promise.reject('error')
Promise.allSettled([one,two,three,four]).then(console.log)


- race
race always return which promise execute first.
ex-
let one = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  })
  let two =  Promise.resolve(2)
let three =  Promise.resolve(3)
Promise.race([one,two,three]).then(console.log)

11. What are the types of error that get handled by .catch.
ans=> catch can handle any 
- internet issue
- code missing or error.

12. How do you handle the error while fetching data from a route that is not available.

ans => we  handle the error while fetching data from a route that is not available by using the res.ok 

