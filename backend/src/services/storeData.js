const { Firestore } = require("@google-cloud/firestore");

async function storeData(data, id) {
  const db = new Firestore();
  const predictionCollection = db.collection("predictions");
  return predictionCollection.doc(id).set(data);
}

module.exports = { storeData };
