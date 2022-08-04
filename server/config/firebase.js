var admin = require("firebase-admin");
var serviceAccount = require("./pictionary-0-firebase-adminsdk-5tjmy-65da864f76.json");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = getFirestore();
module.exports = db;