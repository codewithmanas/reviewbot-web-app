CREATE TABLE IF NOT EXISTS example_table (
    id serial PRIMARY KEY,
    name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- CREATE UNIQUE INDEX example_table_id_idx ON example_table (id); // not needed as by default serial is unique and indexed
CREATE INDEX example_table_name_idx ON example_table (name);
CREATE INDEX example_table_created_at_idx ON example_table (created_at);


INSERT INTO example_table (name) VALUES ('example');

