-- Drop tables if they exist in the correct order (taking foreign keys into account)
DROP TABLE IF EXISTS Projects_Employees;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Addresses;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Clients;

PRAGMA foreign_keys = ON;

-- Create the Clients table
CREATE TABLE Clients (
    clientID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
);

-- Create the Employees table
CREATE TABLE Employees (
    employeeID INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    billingRate INTEGER
);

-- Create the Addresses table
CREATE TABLE Addresses (
    addressID INTEGER PRIMARY KEY,
    address TEXT NOT NULL,
    cID INTEGER,
    constraint fkcID
    FOREIGN KEY (cID) REFERENCES Clients(clientID) ON DELETE CASCADE
);

-- Create the Projects table
CREATE TABLE Projects (
    projectId INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    aID INTEGER,
    constraint fkaID
    FOREIGN KEY (aID) REFERENCES Addresses(addressID) ON DELETE CASCADE
);

-- Create the join table for Projects and Employees (Projects_Employees)
CREATE TABLE Projects_Employees (
    eID INTEGER NOT NULL,
    pID INTEGER NOT NULL,
    PRIMARY KEY (eID, pID),
    FOREIGN KEY (eID) REFERENCES Employees(employeeID),
    FOREIGN KEY (pID) REFERENCES Projects(projectId)
);


INSERT INTO `Clients` (`name`,`email`)
VALUES
  ("Abra Patton","malesuada.malesuada@hotmail.ca"),
  ("Maite Dyer","massa.mauris@icloud.couk"),
  ("Lucy Stanley","mauris@yahoo.edu"),
  ("Celeste Craig","est.mollis.non@icloud.net"),
  ("Evangeline Burke","nec.orci@aol.net"),
  ("Iona Lindsey","enim.nisl@outlook.com"),
  ("Plato Mason","morbi@icloud.edu"),
  ("Clio Gibson","laoreet@yahoo.ca"),
  ("Nash Cantrell","mauris@protonmail.ca"),
  ("Scarlet Todd","elit.sed@google.org");


INSERT INTO `Employees` (`name`,`email`,`billingRate`)
VALUES
  ("Finn Lyons","nullam@hotmail.org",87),
  ("Chaney Henderson","metus.in@yahoo.net",77),
  ("HeIDi Hardy","fusce.fermentum@aol.edu",70),
  ("Samson Ferrell","nulla.dignissim@hotmail.ca",80),
  ("Kadeem Vazquez","magna.nec@google.ca",86),
  ("Fritz Guerra","libero@protonmail.ca",66),
  ("Megan Britt","vitae.semper.egestas@aol.couk",81),
  ("Fitzgerald Woodward","ullamcorper.velit@icloud.ca",67),
  ("Charles Burton","fusce.feugiat.lorem@icloud.edu",65),
  ("Elvis Stark","id.sapien.cras@icloud.com",57);


-- Addresses Table (revised cID to match existing client IDs)
INSERT INTO `Addresses` (`address`,`cID`)
VALUES
  ("903-4580 Ligula. Av.",1),
  ("1332 Ac St.",2),
  ("996-6707 Mauris Rd.",3),
  ("Ap #236-4063 Magnis Ave",4),
  ("Ap #328-7779 Nec, St.",5),
  ("Ap #772-6912 Nam Av.",6),
  ("Ap #712-9343 Pede St.",7),
  ("Ap #703-8078 Amet, Street",8),
  ("319-2005 Vulputate Road",9),
  ("476-9718 Magna. Road",10);

-- Projects Table (revised aID to match existing address IDs)
INSERT INTO `Projects` (`name`,`aID`)
VALUES
  ("Bruno Webster",1),
  ("Chester Berger",2),
  ("Myles Figueroa",3),
  ("Brett Mclean",4),
  ("Sara Calderon",5),
  ("Margaret Berg",6),
  ("Brett Bradley",7),
  ("Phillip Nichols",8),
  ("Glenna Melendez",9),
  ("Jocelyn Dotson",10);

-- Projects_Employees Table (revised eID and pID to match existing employee and project IDs)
INSERT INTO `Projects_Employees` (`eID`,`pID`)
VALUES
  (1,1),
  (2,2),
  (3,3),
  (4,4),
  (5,5),
  (6,6),
  (7,7),
  (8,8),
  (9,9),
  (10,10);


