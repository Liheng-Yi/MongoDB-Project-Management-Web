const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://eli1838459978:198578ddd@cluster0.zcrzloi.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        const database = client.db("ProjectManagement");
        const clients = database.collection("employees");
    
        const newClients = [
            {
                "name": "Oleg Johnson",
                "email": "fermentum.risus@aol.net",
                "billingRate": 12
            },
            {
                "name": "Velma Haynes",
                "email": "libero.mauris.aliquam@hotmail.couk",
                "billingRate": 17
            },
            {
                "name": "Tatum Holland",
                "email": "eu@aol.org",
                "billingRate": 14
            },
            {
                "name": "Kai Wyatt",
                "email": "at.pretium@hotmail.net",
                "billingRate": 13
            },
            {
                "name": "Rosalyn Peterson",
                "email": "nulla.in@icloud.org",
                "billingRate": 17
            }
        ];

        const result = await clients.insertMany(newClients);
        console.log(`New clients inserted with the following ids: ${result.insertedIds}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch
