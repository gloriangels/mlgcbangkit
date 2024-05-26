const tf = require("@tensorflow/tfjs-node");

const InputError = require("../exceptions/InputError");

async function predictClass(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const predicition = model.predict(tensor);

    const confidenceScore = await predicition.data();

    let suggestion;
    let label;

    if (confidenceScore > 0.5) {
      label = "Cancer";
      suggestion = "Anda sehat!";
    } else {
      label = "Non-cancer";
      suggestion = "Segera periksa ke dokter!";
    }

    return { label, suggestion };
  } catch (error) {
    console.log(error);
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi", 400);
  }
}

module.exports = predictClass;
