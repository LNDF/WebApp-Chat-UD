-- Create database
CREATE DATABASE IF NOT EXISTS webchatapp;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'webchatapp'@'%' IDENTIFIED BY 'webchatapp';
GRANT ALL PRIVILEGES ON webchatapp.* TO 'webchatapp'@'%';
FLUSH PRIVILEGES;