const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url =
  "mongodb+srv://ensar:34Ferda37@cluster0.wrydx.mongodb.net/world?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("world");

    // Use the collection "people"
    const col = db.collection("city");

    // Construct a document
    let cityDocument = {
      ID: "4080",
      Name: "Kastamonu",
      CountryCode: "TUR",
      District: "Black Sea",
      Population: "125000",
    };

    // Insert a single document
    const insertDocument = await col.insertOne(cityDocument);
    console.log(insertDocument);

    // Update a single document
    const updateDocument = await col.updateOne(
      { Name: "Kastamonu" },
      { $set: { Population: 130000 } }
    );
    console.log(updateDocument);

    // Read all documents
    const readDocuments = await col.find({ CountryCode: "TUR" }).toArray();
    console.log(readDocuments);

    //Read a single document
    const readSingleDocument = await col.findOne({ Name: "Kastamonu" });
    console.log(readSingleDocument);

    //Delete a single document
    const deleteSingleDocument = await col.deleteOne({ Name: "Kastamonu" });
    console.log(deleteSingleDocument);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
