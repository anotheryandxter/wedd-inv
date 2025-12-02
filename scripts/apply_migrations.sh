#!/usr/bin/env bash
# apply_migrations.sh
# Simple helper to apply SQL migration files to your DATABASE_URL using psql.
# Usage:
#   export DATABASE_URL="postgresql://..."
#   ./scripts/apply_migrations.sh scripts/009_add_splash_columns.sql

set -euo pipefail
if [ -z "${DATABASE_URL-}" ]; then
  echo "ERROR: Please set DATABASE_URL environment variable (Postgres connection string)."
  echo "Example: export DATABASE_URL=\"postgresql://user:pass@host:5432/dbname\""
  exit 2
fi
if [ $# -lt 1 ]; then
  echo "Usage: $0 <sql-file>"
  exit 2
fi
SQLFILE="$1"
if [ ! -f "$SQLFILE" ]; then
  echo "SQL file not found: $SQLFILE"
  exit 2
fi

echo "Applying migration: $SQLFILE to $DATABASE_URL"
psql "$DATABASE_URL" -f "$SQLFILE"

if [ $? -eq 0 ]; then
  echo "Migration applied successfully."
else
  echo "Migration failed."
  exit 1
fi
