CREATE TABLE IF NOT EXISTS evaluation_sessions (
  id text PRIMARY KEY,
  dataset_version text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  changes integer NOT NULL DEFAULT 0,
  rating smallint CHECK (rating BETWEEN 1 AND 5),
  comment text CHECK (length(comment) <= 500)
);

CREATE INDEX IF NOT EXISTS evaluation_sessions_started_at_idx
  ON evaluation_sessions (started_at DESC);
