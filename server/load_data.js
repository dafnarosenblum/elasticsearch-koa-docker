const esConnection = require('./connection');

async function insertFileData (fileName, fileContent) {
  try {
    let bulkOps = [];
    bulkOps.push({ index: { _index: esConnection.index, _type: esConnection.type } });
    bulkOps.push({
      fileName,
      fileContent
    });
    await esConnection.client.bulk({ body: bulkOps })
  } catch (err) {
    console.error(err)
  }
}

module.exports = insertFileData;
