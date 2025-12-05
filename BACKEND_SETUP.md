# Backend Setup for Cross-Device Login

## Current Status
The app currently uses localStorage which is device-specific. To enable cross-device login, you need a backend API.

## Quick Setup Options

### Option 1: Firebase (Recommended - Free & Easy)

1. Go to https://firebase.google.com/
2. Create a new project
3. Enable Authentication
4. Update `src/services/api.ts` to use Firebase SDK

### Option 2: Supabase (Free Tier Available)

1. Go to https://supabase.com/
2. Create a new project
3. Get your API keys
4. Update `src/services/api.ts` to use Supabase client

### Option 3: Simple Node.js Backend

See `backend-example/` folder for a simple Express.js backend example.

## For Demo Purposes

**Current behavior:** Each device needs to sign up separately (localStorage is device-specific)

**To test cross-device:** 
- Sign up on Device 1
- Sign up with the same credentials on Device 2
- Both devices will have separate accounts (this is expected with localStorage)

## Production Solution

For production, replace the API service calls in `src/services/api.ts` with actual backend API calls.

