#!/bin/bash
# sysinfo_page - Updates the Supabase DB Types

projectRef=rmihkzkyyqwkwttorhnw
npx supabase gen types typescript --project-id "$projectRef" --schema public > supabase/types.ts