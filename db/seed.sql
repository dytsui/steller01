INSERT OR IGNORE INTO students (id, name, level, handicap, dominant_hand, avatar)
VALUES
  ('stu-ava', 'Ava Lin', 'Intermediate', 18.4, 'right', 'AL'),
  ('stu-luca', 'Luca Chen', 'Beginner', 28.2, 'right', 'LC'),
  ('stu-nora', 'Nora Park', 'Junior', 12.1, 'left', 'NP'),
  ('stu-ethan', 'Ethan Wong', 'Intermediate', 15.7, 'right', 'EW'),
  ('stu-mila', 'Mila Tan', 'Beginner', 31.5, 'right', 'MT');

INSERT OR IGNORE INTO swing_sessions (id, student_id, title, mode, screen_mode, source_video_key)
VALUES
  ('swing-demo-001', 'stu-ava', 'Ava · 7 iron baseline', 'upload', 0, 'demo/ava-7iron.mp4'),
  ('swing-demo-002', 'stu-luca', 'Luca · Driver on TV replay', 'screen', 1, 'demo/luca-driver-tv.mp4'),
  ('swing-demo-003', 'stu-nora', 'Nora · Face-on wedge capture', 'camera', 0, 'demo/nora-wedge-live.mp4'),
  ('swing-demo-004', 'stu-ethan', 'Ethan · Down-the-line driver', 'upload', 0, 'demo/ethan-driver-dtl.mp4'),
  ('swing-demo-005', 'stu-mila', 'Mila · Tablet replay screen mode', 'screen', 1, 'demo/mila-tablet-screen.mp4');

INSERT OR IGNORE INTO analysis_jobs (id, session_id, status, progress, queue_trace)
VALUES
  ('job-demo-001', 'swing-demo-001', 'completed', 100, 'upload->queue->job-room->report'),
  ('job-demo-002', 'swing-demo-002', 'completed', 100, 'screen->queue->job-room->report'),
  ('job-demo-003', 'swing-demo-003', 'processing', 64, 'capture->queue->job-room'),
  ('job-demo-004', 'swing-demo-004', 'queued', 12, 'upload->queue'),
  ('job-demo-005', 'swing-demo-005', 'failed', 100, 'screen->queue->diagnostics-failed');

INSERT OR IGNORE INTO analysis_reports (session_id, score_total, tempo_ratio, primary_issue, secondary_issue, structured_json)
VALUES
  ('swing-demo-001', 82, 2.9, 'Head sway through impact', 'Restricted hip turn', '{"demo":true}'),
  ('swing-demo-002', 74, 2.5, 'Screen glare too high', 'Tempo too fast', '{"demo":true}'),
  ('swing-demo-003', 85, 3.0, 'Lead wrist lift at top', 'Finish balance soft', '{"demo":true}'),
  ('swing-demo-004', 79, 2.7, 'Early extension tendency', 'Low shoulder turn', '{"demo":true}');

INSERT OR IGNORE INTO training_plans (id, session_id, title, focus, reps, cue)
VALUES
  ('plan-demo-001', 'swing-demo-001', 'Head box strike ladder', 'Impact stability', '3 sets × 6 swings', 'Keep your head inside the box until the ball is gone.'),
  ('plan-demo-002', 'swing-demo-002', 'Screen re-shoot checklist', 'Capture trust', '2 setup runs', 'Reduce glare and make the player larger before recording.'),
  ('plan-demo-003', 'swing-demo-004', 'Hip turn wall drill', 'Rotation depth', '4 sets × 5 reps', 'Turn trail hip behind you, not toward the ball.');

INSERT OR IGNORE INTO coach_notes (id, student_id, session_id, note, visibility)
VALUES
  ('note-001', 'stu-ava', 'swing-demo-001', 'Responds well to one-cue coaching and visual head-box references.', 'private'),
  ('note-002', 'stu-luca', 'swing-demo-002', 'Screen Mode footage often needs a second pass due to living-room glare.', 'private');

INSERT OR IGNORE INTO memberships (id, student_id, tier, status, renews_at)
VALUES
  ('mem-ava', 'stu-ava', 'pro', 'active', '2026-09-01'),
  ('mem-luca', 'stu-luca', 'starter', 'active', '2026-05-01');

INSERT OR IGNORE INTO recommended_content (id, issue_id, title, content_type, duration_label, link_hint)
VALUES
  ('rec-001', 'head-sway-impact', 'Quiet head impact station', 'video', '03:24', '/training'),
  ('rec-002', 'restricted-hip-turn', 'Trail hip depth ladder', 'video', '04:15', '/training'),
  ('rec-003', 'screen-low-confidence', 'How to film a screen without glare', 'article', '02:10', '/upload');
