const { MongoClient, ObjectId } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://eli1838459978:198578ddd@cluster0.zcrzloi.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        const database = client.db("ProjectManagement"); 
        const clients = database.collection("clients"); 

        const newClients = [
            {
                "name": "Justin Clayton",
                "email": "malesuada@protonmail.org",
                "address": "6213 Tempor St.",
                "projects": [
                    {
                        "projectId": new ObjectId(), 
                        "name": "turpis egestas.",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b04945f"),
                            new ObjectId("65696b6e5d9716cd0b049460")
                        ]
                    },
                    {
                        "projectId": new ObjectId(), 
                        "name": "Second Project",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049460"), 
                            new ObjectId("65696b6e5d9716cd0b049461")
                        ]
                    }
                ]
            },
            {
                "name": "Daphne Walter",
                "email": "ac.feugiat@icloud.edu",
                "address": "494-3941 Eu Road",
                "projects": [
                    {
                        "projectId": new ObjectId(),
                        "name": "turpis egestas.",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b04945f")
                        ]
                    },
                    {
                        "projectId": new ObjectId(),
                        "name": "Second Project",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049461")
                        ]
                    }
                ]
            },
            {
                "name": "Baxter Wiley",
                "email": "tortor.nunc.commodo@hotmail.com",
                "address": "Ap #920-4735 Laoreet St.",
                "projects": [
                    {
                        "projectId": new ObjectId(),
                        "name": "turpis egestas.",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b04945f"),
                            new ObjectId("65696b6e5d9716cd0b049460"),
                            new ObjectId("65696b6e5d9716cd0b049463")
                        ]
                    },
                    {
                        "projectId": new ObjectId(),
                        "name": "Second Project",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049463")
                        ]
                    }
                ]
            },
            {
                "name": "Brenna Benson",
                "email": "penatibus@protonmail.couk",
                "address": "160-956 Est, St.",
                "projects": [
                    {
                        "projectId": new ObjectId(),
                        "name": "turpis egestas.",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b04945f")
                        ]
                    },
                    {
                        "projectId": new ObjectId(),
                        "name": "Second Project",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049460"), 
                            new ObjectId("65696b6e5d9716cd0b049461")
                        ]
                    }
                ]
            },
            {
                "name": "Declan Galloway",
                "email": "id.magna@aol.com",
                "address": "Ap #493-6547 Sed St.",
                "projects": [
                    {
                        "projectId": new ObjectId(),
                        "name": "turpis egestas.",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049462")
                        ]
                    },
                    {
                        "projectId": new ObjectId(),
                        "name": "Second Project",
                        "employees": [
                            new ObjectId("65696b6e5d9716cd0b049460"), 
                            new ObjectId("65696b6e5d9716cd0b049462")
                        ]
                    }
                ]
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
