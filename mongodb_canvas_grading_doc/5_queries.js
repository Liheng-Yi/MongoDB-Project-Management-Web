// returns the names of projects that have exactly two employees working on them
// aggregation 
const query = [
    {
        $unwind: "$projects"
    },
    {
        $match: {
            "projects.employees": { $size: 2 }
        }
    },
    {
        $project: {
            _id: 0,
            projectName: "$projects.name"
        }
    }
];

// find all clients who have projects with two employees and whose project names contain the word "d".
// complex search criterion 
const query2 = [
    {
        $project: {
            name: 1,
            projectsWithTwoEmployees: {
                $filter: {
                    input: "$projects",
                    as: "project",
                    cond: { 
                        $and: [
                            { $eq: [{ $size: "$$project.employees" }, 2] },
                            { $regexMatch: { input: "$$project.name", regex: "d", options: "i" } }
                        ]
                    }
                }
            }
        }
    },
    {
        $match: {
            "projectsWithTwoEmployees.0": { $exists: true }
        }
    }
];

// return how many projects does one specific user have

// counting documents for an specific user
const clientName = "Declan Galloway"; 

const query3 = [
    {
        $match: { "name": clientName }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            numberOfProjects: { $size: "$projects" }
        }
    }
];


// add 10 dollars/per hour to specific employee

const employeeId = new ObjectId("65696b6e5d9716cd0b049460"); 

const updateResult = await employees.updateOne(
    { "_id": employeeId },
    { $inc: { "billingRate": 10 } }
);

// find employees with a billing rate greater than or equal to 30, 
//project only their names and email addresses, and sort the results by billing rate in descending order



db.employees.find(
  { "billingRate": { $gte: 30 } }, 
  { "_id": 0, "name": 1, "email": 1 } 
).sort(
  { "billingRate": -1 } 
)










