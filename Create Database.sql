Create Database Copernicus
use Copernicus
CREATE TABLE Customers (
    Id INT PRIMARY KEY,
    Email NVARCHAR(MAX),
    First NVARCHAR(MAX),
    Last NVARCHAR(MAX),
    Company NVARCHAR(MAX),
    CreatedAt DATETIME NULL,
    Country NVARCHAR( MAX)
);

