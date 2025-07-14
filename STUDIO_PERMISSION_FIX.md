# Fix Studio Permissions Issue

## The Problem
You're seeing "Insufficient permissions" when trying to access the Studio. This happens when your account doesn't have the right permissions for the Sanity project.

## Quick Fix - Option 1: Use Your Own Studio

### Step 1: Create a New Studio in Your Project
Run this in your terminal:
```bash
npx sanity@latest init --template clean
```

When prompted:
- **Project**: Select "Create new project" or use existing "3yaebsnk"
- **Dataset**: Use "production" 
- **Output path**: Use "studio" (or any folder name)

### Step 2: Update Configuration
The init command will create a `sanity.config.js` file. Make sure it has:
```javascript
export default defineConfig({
  projectId: '3yaebsnk',
  dataset: 'production',
  // ... other config
})
```

### Step 3: Run Your Studio
```bash
cd studio
npm run dev
```

## Quick Fix - Option 2: Update Project Permissions

### Step 1: Check Project Settings
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your "LE" project
3. Click "Settings" → "API"
4. Make sure your token has "Editor" permissions

### Step 2: Add Your Account as Admin
1. Go to "Members" tab in your project
2. Add your email as an "Administrator" or "Editor"
3. Save changes

## Quick Fix - Option 3: Use the Built-in Studio

### Step 1: Access Through Project Dashboard
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your "LE" project  
3. Click "Content" in the left sidebar
4. This opens the built-in Studio

### Step 2: If Content Tab is Missing
Your project might not have the Studio enabled. Let's fix this:

1. Go to your project settings
2. Enable "Studio" in the features section
3. Or deploy a new Studio instance

## The Real Solution

Since you're getting permission errors, the fastest fix is to:

1. **Create your own Studio locally** (Option 1 above)
2. **Deploy it to your domain** 
3. **Add that URL to your Sanity project**

This gives you full control and eliminates permission issues.

Would you like me to help you set up Option 1 (create your own Studio)?