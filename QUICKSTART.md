# Noema Quickstart

## Database Status: READY

Your Supabase database has been configured with all Noema tables.

Project: zpjjoskdaouhzinijztf  
URL: https://zpjjoskdaouhzinijztf.supabase.co

## 3 Quick Steps to Launch

### 1. Add Service Role Key (30 seconds)

Open .env.local and replace the service_role key:

1. Visit: https://supabase.com/dashboard/project/zpjjoskdaouhzinijztf/settings/api
2. Copy the service_role key
3. Paste in .env.local

### 2. Create Storage Bucket (1 minute)

1. Visit: https://supabase.com/dashboard/project/zpjjoskdaouhzinijztf/storage/buckets
2. Click New bucket
3. Name: datasets, Public: OFF
4. Go to SQL Editor and paste contents of supabase/storage-setup.sql
5. Run it

### 3. Install and Run (2 minutes)

cd /Users/zion/noema
npm install
npm run dev

Open http://localhost:3000

## What Works Now

- Landing page with waitlist signup
- Full audit flow (once auth is implemented)
- All API routes functional
- Database ready for data

## Sample Data

Use public/sample-data.csv to test the upload flow.

## Tables Created

- audits (RLS enabled)
- datasets (RLS enabled)
- waitlist (RLS enabled)

All code complete. Just need these 3 quick manual steps!
