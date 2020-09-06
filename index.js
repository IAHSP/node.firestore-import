#!/usr/bin/env node

require('dotenv').config(); //loads the secrets set in the .env file, into process.env
const fs = require('fs');
const firebase = require('firebase');

firebase.initializeApp({
  projectId: process.env.PROJECTID,
  apiKey: process.env.APIKEY
});
const db = firebase.firestore();

let rawdata = fs.readFileSync('_users-with-countryCustom-field.json');
let usersObj = JSON.parse(rawdata);
let users = usersObj.users;

console.log('please wait while the users are imported...');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const start = async () => {
  await asyncForEach(Object.keys(users), async (idx) => {
    //await waitFor(50);
    console.log(idx + ": inserting: " + users[idx].firstName + " " + users[idx].lastName);
    //await db.collection('users').add(users[idx]);
    await db.collection("users").doc(idx).set(users[idx]);
  });
  console.log('Done');
}

start();


//for(var idx in users){
  ////db.collection('users').add(users[idx]);
  //console.log(idx + ": inserting: " + users[idx].firstName + " " + users[idx].lastName);
  //db.collection('users').add(users[idx])
  //.then(() => {
    ////console.log(idx + ": inserting: " + users[idx].firstName + " " + users[idx].lastName);
  //})
  //.catch((err) => {
    //console.log(err);
  //});
//}
