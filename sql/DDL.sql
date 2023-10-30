-- Creating Clients table
DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients (
    clientID INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(15)
);


-- -- Creating Addresses table
CREATE TABLE Addresses (
    addressID INT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    -- status VARCHAR(50),
    -- dateStarted DATE,
    -- dateComplete DATE,
    cID INT,
    FOREIGN KEY (cID) REFERENCES Clients(clientID)
);

-- -- Creating Projects table
-- CREATE TABLE Projects (
--     projectID INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     dateStarted DATE,
--     dateComplete DATE,
--     status VARCHAR(50),
--     projectDescription TEXT,
--     aID INT,
--     FOREIGN KEY (aID) REFERENCES Addresses(addressID)
-- );

-- -- Creating Employees table
-- CREATE TABLE Employees (
--     employeeID INT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     email VARCHAR(255),
--     billingRate DECIMAL(10, 2)
-- );

-- -- Creating Projects_Employees linking table
-- CREATE TABLE Projects_Employees (
--     projectEmployeeID INT PRIMARY KEY,
--     eID INT,
--     pID INT,
--     FOREIGN KEY (eID) REFERENCES Employees(employeeID),
--     FOREIGN KEY (pID) REFERENCES Projects(projectID)
-- );
