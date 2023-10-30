DROP TABLE IF EXISTS Clients;

CREATE TABLE Clients (
    clientID INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255)
);

INSERT INTO Clients (name, email)
VALUES 
('Smith Doe', 'john.doe@email.com'),
('Jane Smith', 'jane.smith@email.com'),
('Robert Johnson', 'robert.johnson@email.com');

DROP TABLE IF EXISTS Addresses;
CREATE TABLE Addresses (
    addressID INTEGER PRIMARY KEY AUTOINCREMENT,
    address VARCHAR(255),
    -- status VARCHAR(50),
    -- dateStarted DATE,
    -- dateComplete DATE,
    cID INTEGER,
    FOREIGN KEY (cID) REFERENCES Clients(clientID)
);

INSERT INTO Addresses (address, cID)
VALUES 
('123 Apple St, Fruitville', '1'),
('456 Berry Rd, Berrytown', '1'),
('789 Green Ln, Treecity', '2');
