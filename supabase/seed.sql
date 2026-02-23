-- Clear existing data (optional but recommended for repeatable seeds)
TRUNCATE TABLE example_table RESTART IDENTITY CASCADE;

-- Insert sample records
INSERT INTO example_table (name) VALUES
  ('Alpha'),
  ('Beta'),
  ('Gamma'),
  ('Delta'),
  ('Epsilon');