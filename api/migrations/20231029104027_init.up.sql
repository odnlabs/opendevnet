-- Create the database
CREATE DATABASE opendevnet;

-- Connect to the database
\c opendevnet;

-- Enable the uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the "users" table within the opendevnet database
CREATE TABLE
    "users" (
        id UUID NOT NULL PRIMARY KEY DEFAULT (uuid_generate_v4()),
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        phone_number VARCHAR(20),
        display_name VARCHAR(100),
        avatar VARCHAR NOT NULL DEFAULT 'default',
        banner VARCHAR NOT NULL DEFAULT 'default',
        bio VARCHAR(255) NOT NULL DEFAULT '',
        verified BOOLEAN NOT NULL DEFAULT FALSE,
        verified_at TIMESTAMP WITH TIME ZONE,
        accent_color VARCHAR(7) NOT NULL DEFAULT 'default',
        role VARCHAR(50) NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

CREATE INDEX users_email_idx ON users (email);
