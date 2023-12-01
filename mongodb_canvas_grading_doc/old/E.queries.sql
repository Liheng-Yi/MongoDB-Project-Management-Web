-- joins the Clients, Addresses, and Projects tables to fetch information about 
-- each project along with its corresponding client and address.


SELECT Clients.name AS ClientName,
       Projects.name AS ProjectName,
       Addresses.address AS ProjectAddress
FROM Projects
JOIN Addresses ON Projects.AId = Addresses.AddressId
JOIN Clients ON Addresses.ClientId = Clients.ClientId;




-- Retrieve employee information based on who the clients are

SELECT DISTINCT
    Clients.name AS ClientName,
    Employees.EmployeeID,
    Employees.name AS EmployeeName,
    Employees.email AS EmployeeEmail,
    Employees.billingRate
FROM Employees
JOIN Projects_Employees ON Employees.EmployeeID = Projects_Employees.EId
JOIN Projects ON Projects_Employees.PId = Projects.ProjectID
JOIN Addresses ON Projects.AId = Addresses.AddressId
JOIN Clients ON Addresses.ClientId = Clients.ClientId
ORDER BY ClientName, EmployeeName;

-- finds the average billing rate of employees who have worked 
-- on a specific project

SELECT AVG(billingRate) AS AverageBillingRate
FROM Employees
WHERE EmployeeID IN (
    SELECT EId 
    FROM Projects_Employees 
    WHERE PId = 1   -- Replace 1 with the desired ProjectID
);

-- how many projects each employee is working on
SELECT EId, COUNT(PId) AS NumberOfProjects
FROM Projects_Employees
GROUP BY EId
HAVING COUNT(PId) > 1;


-- find all employees who are working 
-- on projects associated with clients whose names start with "L".

SELECT Clients.name AS ClientName,
       Employees.name AS EmployeeName, 
       Employees.email AS EmployeeEmail, 
       Projects.name AS ProjectName
FROM Projects_Employees
JOIN Employees ON Projects_Employees.EId = Employees.EmployeeID
JOIN Projects ON Projects_Employees.PId = Projects.ProjectID
JOIN Addresses ON Projects.AId = Addresses.AddressId
JOIN Clients ON Addresses.ClientId = Clients.ClientId
WHERE Clients.name LIKE 'L%'
