CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  level TEXT,
  handicap REAL,
  dominant_hand TEXT,
  avatar TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS swing_sessions (
  id TEXT PRIMARY KEY,
  student_id TEXT,
  title TEXT NOT NULL,
  mode TEXT NOT NULL,
  screen_mode INTEGER DEFAULT 0,
  source_video_key TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS analysis_jobs (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  queue_trace TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES swing_sessions(id)
);

CREATE TABLE IF NOT EXISTS analysis_reports (
  session_id TEXT PRIMARY KEY,
  score_total REAL,
  tempo_ratio REAL,
  primary_issue TEXT,
  secondary_issue TEXT,
  structured_json TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES swing_sessions(id)
);

CREATE TABLE IF NOT EXISTS training_plans (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  title TEXT NOT NULL,
  focus TEXT,
  reps TEXT,
  cue TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES swing_sessions(id)
);

CREATE TABLE IF NOT EXISTS coach_notes (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  session_id TEXT,
  note TEXT NOT NULL,
  visibility TEXT DEFAULT 'private',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id),
  FOREIGN KEY(session_id) REFERENCES swing_sessions(id)
);

CREATE TABLE IF NOT EXISTS share_exports (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  caption TEXT,
  asset_key TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(session_id) REFERENCES swing_sessions(id)
);

CREATE TABLE IF NOT EXISTS memberships (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  tier TEXT NOT NULL,
  status TEXT NOT NULL,
  renews_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS recommended_content (
  id TEXT PRIMARY KEY,
  issue_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content_type TEXT NOT NULL,
  duration_label TEXT,
  link_hint TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_jobs_session ON analysis_jobs(session_id);
CREATE INDEX IF NOT EXISTS idx_reports_score ON analysis_reports(score_total);
CREATE INDEX IF NOT EXISTS idx_notes_student ON coach_notes(student_id);
CREATE INDEX IF NOT EXISTS idx_memberships_student ON memberships(student_id);
