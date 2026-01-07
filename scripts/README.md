# Migrations: running the consolidated script

This repository includes a single consolidated migration script at:

- `scripts/000_all_migrations.sql`

Run this file to apply the full schema and common data changes in one step.

Important notes
- The consolidated script includes `IF NOT EXISTS` guards for most DDL, but
  it also contains destructive operations (e.g., `DELETE FROM gallery`).
  Back up your data before running if you are not sure.

Options to run

1) psql (recommended for direct Postgres access)

   Replace the connection string with your own credentials:

   ```bash
   psql "postgresql://USER:PASSWORD@HOST:PORT/DATABASE" -f scripts/000_all_migrations.sql
   ```

2) Supabase SQL editor

   - Open your Supabase project → SQL Editor → New query
   - Copy the contents of `scripts/000_all_migrations.sql` and run the query

3) If you use a different tool (Adminer, pgAdmin, etc.), open the file and
   execute its SQL using your tool's query/run feature.

Post-run
- Verify tables and columns exist, and confirm any expected defaults.
- If you use Supabase, you may need to restart the project or refresh the API
  to pick up schema changes in some client caches.

If you want me to also remove the consolidated script and keep only per-step
files or to add a brief `README` entry in the repo root, tell me which you
prefer.
