CREATE TABLE TextAndImage (
    id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
    description TEXT,       -- Field to store long text description
    image BYTEA            -- Field to store binary data for the image
);