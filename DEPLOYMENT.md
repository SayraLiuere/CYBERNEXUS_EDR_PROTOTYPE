# GitHub Pages Deployment Guide or fix

## Current Status

 site should be live at: **https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/**

## Troubleshooting Blank Page

If you're seeing a blank page, try these steps:

### 1. Check Browser Console
- Open Developer Tools (F12)
- Go to Console tab
- Look for any red error messages
- Common issues:
  - 404 errors for assets (path issues)
  - JavaScript errors
  - CORS errors

### 2. Verify GitHub Pages Settings
1. Go to repository Settings → Pages
2. Source should be set to **"GitHub Actions"** (not "Deploy from a branch")
3. If it's set to branch, change it to GitHub Actions

### 3. Check Workflow Status
1. Go to Actions tab
2. Click on the latest "Deploy to GitHub Pages" workflow run
3. Check if it completed successfully (green checkmark)
4. If it failed, click on it to see error details

### 4. Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear cache and reload

### 5. Test Direct Asset URLs
Try accessing these directly:
- `https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/assets/index-[hash].js`
- `https://sayraliuere.github.io/CYBERNEXUS_EDR_PROTOTYPE/assets/index-[hash].css`

Replace `[hash]` with the actual hash from the build.

## Manual Deployment (if needed)

If automatic deployment isn't working:

1. Build locally:
```bash
npm run build
```

2. The `dist` folder contains the built files

3. You can manually upload the `dist` folder contents to the `gh-pages` branch, but GitHub Actions is recommended.

## Configuration Details

- **Base Path**: `/CYBERNEXUS_EDR_PROTOTYPE/`
- **Router**: HashRouter (URLs will have `#` like `/#/endpoints`)
- **Build Output**: `dist/` folder
- **Workflow**: `.github/workflows/deploy.yml`

## Common Issues

### Issue: Assets not loading (404 errors)
**Solution**: Make sure `base` in `vite.config.js` matches your repository name exactly (case-sensitive)

### Issue: Routing not working
**Solution**: HashRouter is used, so URLs will be like:
- `/#/` (Dashboard)
- `/#/endpoints`
- `/#/alerts`
- `/#/reports`

### Issue: Workflow fails
**Solution**: 
1. Check Actions tab for error details
2. Make sure Pages is set to use GitHub Actions
3. Verify Node.js version in workflow matches your local version

## Need Help?

If the site is still blank after checking these:
1. Share the browser console errors
2. Share the workflow run logs from Actions tab
3. Verify the repository name matches exactly: `CYBERNEXUS_EDR_PROTOTYPE`
