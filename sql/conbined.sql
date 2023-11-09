-- Drop tables if they exist in the correct order (taking foreign keys into account)
DROP TABLE IF EXISTS Projects_Employees;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Addresses;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Clients;

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
    FOREIGN KEY (cID) REFERENCES Clients(clientID)
);

-- Create the Projects table
CREATE TABLE Projects (
    projectId INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    aID INTEGER,
    FOREIGN KEY (aID) REFERENCES Addresses(addressID)
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
  ("Lance Joseph","donec@yahoo.ca"),
  ("Olga Moses","lorem@google.edu"),
  ("Shana Carver","ut.nec@icloud.edu"),
  ("Lamar Frost","fusce.fermentum@outlook.org"),
  ("Ila Evans","dignissim@outlook.edu"),
  ("Elizabeth Wilcox","a@aol.org"),
  ("Barclay Leonard","lacinia@protonmail.ca"),
  ("Samantha Mcfarland","id.enim@yahoo.ca"),
  ("Daquan Barron","tristique.aliquet@yahoo.org"),
  ("Elaine Bennett","leo.morbi@icloud.edu");
INSERT INTO `Clients` (`name`,`email`)
VALUES
  ("Nolan Owens","arcu.vestibulum.ante@aol.edu"),
  ("Galena Farrell","urna.convallis@yahoo.ca"),
  ("Ronan Lawson","magna.sed@google.ca"),
  ("Brady Elliott","velit.eu.sem@yahoo.couk"),
  ("Christine Blevins","at@hotmail.couk"),
  ("Aimee Jacobson","nam.interdum@hotmail.ca"),
  ("Stephen Nunez","at.pede.cras@google.edu"),
  ("Vincent Paul","lectus.rutrum.urna@aol.net"),
  ("Leslie Hooper","lacus.ut@yahoo.edu"),
  ("Veda Osborn","ad.litora@google.com");
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
INSERT INTO `Clients` (`name`,`email`)
VALUES
  ("Barclay Slater","lorem@icloud.edu"),
  ("Brittany Cardenas","blandit.nam@icloud.ca"),
  ("Desiree Gentry","convallis.ligula@hotmail.com"),
  ("Melinda Holman","felis.nulla@yahoo.com"),
  ("Christian Beard","vitae.aliquam@outlook.ca"),
  ("Lawrence Mcdonald","elementum.purus@aol.couk"),
  ("Wesley Aguirre","venenatis.a.magna@icloud.net"),
  ("Abel Oliver","erat@icloud.org"),
  ("Macon Spencer","non.dui@hotmail.com"),
  ("Ethan Gillespie","lacus@protonmail.org");



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
INSERT INTO `Employees` (`name`,`email`,`billingRate`)
VALUES
  ("Jemima Ewing","interdum.feugiat@google.org",60),
  ("Chastity Douglas","enim.gravida@icloud.com",63),
  ("Jermaine Wallace","donec.nibh@google.couk",80),
  ("Gail Tyson","orci@google.net",89),
  ("Sacha Sheppard","nulla.eu@hotmail.couk",85),
  ("Rose Ewing","purus.accumsan@icloud.net",64),
  ("Melodie Shaw","nec.malesuada@outlook.org",55),
  ("Serena Le","est.ac@icloud.edu",69),
  ("Cameron Leonard","aliquam.gravida.mauris@protonmail.couk",77),
  ("Ahmed Henson","libero.integer@outlook.edu",68);
INSERT INTO `Employees` (`name`,`email`,`billingRate`)
VALUES
  ("Matthew Massey","nisi.nibh@yahoo.com",67),
  ("Mason Mccray","iaculis.quis.pede@yahoo.com",85),
  ("Kieran Forbes","risus.morbi.metus@yahoo.ca",54),
  ("Walter Olsen","quisque.varius@hotmail.ca",55),
  ("Danielle Macias","amet.lorem@protonmail.ca",88),
  ("Jackson Smith","pede.blandit.congue@yahoo.com",57),
  ("Amela Fitzgerald","id@protonmail.net",66),
  ("Gay Hogan","nulla.interdum@aol.net",73),
  ("Wang Joyce","non.arcu@aol.net",80),
  ("Yvonne Atkinson","amet.consectetuer@outlook.org",68);
INSERT INTO `Employees` (`name`,`email`,`billingRate`)
VALUES
  ("Bruce Decker","litora.torquent@aol.org",88),
  ("Evelyn Combs","ut.eros@yahoo.couk",69),
  ("Elmo Chen","mauris.ut@protonmail.com",60),
  ("Hunter Washington","pede.nonummy@outlook.ca",84),
  ("Ariel Murphy","vel@google.com",57),
  ("Jameson Nolan","tellus.nunc.lectus@aol.com",80),
  ("Yoshi Trevino","mollis.nec.cursus@hotmail.ca",58),
  ("Kennan Gordon","ipsum@aol.edu",83),
  ("Lester Cain","fringilla@protonmail.net",41),
  ("Elmo Mccall","euismod.enim@google.edu",66);
INSERT INTO `Employees` (`name`,`email`,`billingRate`)
VALUES
  ("Whitney Alston","sagittis.semper.nam@outlook.ca",61),
  ("Inez Wiley","elit.pede.malesuada@outlook.couk",83),
  ("Martina Wells","nec@yahoo.org",88),
  ("Jolene Finley","orci.quis@aol.edu",55),
  ("Henry Gill","justo@icloud.net",46),
  ("Shelley Chase","ornare@outlook.edu",45),
  ("Tanek Solis","vitae.sodales@google.org",81),
  ("Victor Mills","fusce@yahoo.edu",63),
  ("Justine Potter","nullam.feugiat@google.net",85),
  ("Idola Winters","sed.id.risus@outlook.ca",67);



INSERT INTO `Addresses` (`address`,`cID`)
VALUES
  ("903-4580 Ligula. Av.",7),
  ("1332 Ac St.",5),
  ("996-6707 Mauris Rd.",8),
  ("Ap #236-4063 Magnis Ave",24),
  ("Ap #328-7779 Nec, St.",16),
  ("Ap #772-6912 Nam Av.",17),
  ("Ap #712-9343 Pede St.",29),
  ("Ap #703-8078 Amet, Street",26),
  ("319-2005 Vulputate Road",15),
  ("476-9718 Magna. Road",19);
INSERT INTO `Addresses` (`address`,`cID`)
VALUES
  ("P.O. Box 701, 8684 Ut Av.",19),
  ("Ap #230-7107 Ipsum St.",26),
  ("860-5357 Vestibulum Rd.",24),
  ("Ap #936-559 In Avenue",6),
  ("Ap #860-1881 Aliquam Av.",26),
  ("Ap #314-4131 Tincidunt Rd.",27),
  ("P.O. Box 728, 4779 Et, St.",22),
  ("705-5981 Blandit Road",12),
  ("Ap #763-2262 Aliquam Rd.",10),
  ("P.O. Box 457, 416 Mi Av.",22);
INSERT INTO `Addresses` (`address`,`cID`)
VALUES
  ("851-358 Volutpat St.",30),
  ("866-8572 Ipsum Street",3),
  ("Ap #807-5209 Tempus Ave",8),
  ("347-2066 Natoque Rd.",14),
  ("P.O. Box 868, 7384 Pede Ave",20),
  ("P.O. Box 879, 1940 Lobortis Road",16),
  ("P.O. Box 131, 5426 Rutrum St.",17),
  ("9293 Sed, Rd.",15),
  ("9973 Velit Road",28),
  ("3040 Montes, St.",20);
  
 
INSERT INTO `Projects` (`name`,`aID`)
VALUES
  ("Bruno Webster",8),
  ("Chester Berger",2),
  ("Myles Figueroa",15),
  ("Brett Mclean",9),
  ("Sara Calderon",24),
  ("Margaret Berg",10),
  ("Brett Bradley",10),
  ("Phillip Nichols",5),
  ("Glenna Melendez",3),
  ("Jocelyn Dotson",15);
INSERT INTO `Projects` (`name`,`aID`)
VALUES
  ("Jerry Kelly",14),
  ("Wylie Whitehead",20),
  ("Yvette Roach",8),
  ("Zeus Mckinney",7),
  ("Nyssa Mccall",27),
  ("Clare Wong",25),
  ("Tanisha Mcpherson",15),
  ("Clinton Zamora",22),
  ("Xenos Griffin",27),
  ("Cody Knight",13);
INSERT INTO `Projects` (`name`,`aID`)
VALUES
  ("Bruno Wheeler",20),
  ("Gareth Sexton",24),
  ("Gannon Hutchinson",2),
  ("Ingrid Slater",18),
  ("Montana Larsen",2),
  ("Levi Haley",15),
  ("Gareth Noble",28),
  ("Zachary Conway",2),
  ("Mason Maddox",25),
  ("Malik Wright",28);
  
  

INSERT INTO `Projects_Employees` (`eID`,`pID`)
VALUES
  (28,26),
  (6,1),
  (22,8),
  (30,14),
  (17,3),
  (5,28),
  (6,11),
  (25,8),
  (2,3),
  (9,10);
INSERT INTO `Projects_Employees` (`eID`,`pID`)
VALUES
  (6,21),
  (23,15),
  (3,2),
  (17,11),
  (11,5),
  (7,25),
  (3,26),
  (26,28),
  (19,24),
  (19,27);
INSERT INTO `Projects_Employees` (`eID`,`pID`)
VALUES
  (15,11),
  (5,20),
  (21,17),
  (25,23),
  (8,5),
  (29,27),
  (10,19),
  (10,7),
  (6,18),
  (13,12);


  

