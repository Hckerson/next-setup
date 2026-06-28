#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const EXCLUDE_DIRS = ['node_modules', '.next', 'dist', '.git', 'scripts'];
const EXCLUDE_EXTENSIONS = ['.log', '.lock', '.map'];

// Files to never delete
const PROTECTED_FILES = ['font.ts', 'opara.png'];

// Get all files in project (excluding node_modules, etc)
function getAllProjectFiles(dir, fileList = [], depth = 0) {
  if (depth > 10) return fileList; // Prevent deep recursion

  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!EXCLUDE_DIRS.includes(file) && !file.startsWith('.')) {
          getAllProjectFiles(filePath, fileList, depth + 1);
        }
      } else if (
        file.endsWith('.ts') ||
        file.endsWith('.tsx') ||
        file.endsWith('.js') ||
        file.endsWith('.jsx') ||
        file.endsWith('.css') ||
        file.endsWith('.html')
      ) {
        fileList.push(filePath);
      }
    });
  } catch (e) {
    // Directory read error
  }

  return fileList;
}

// Get all asset files from public folder
function getAllAssets(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        getAllAssets(filePath, fileList);
      } else {
        const relativePath = path.relative(PUBLIC_DIR, filePath);
        fileList.push({
          fullPath: filePath,
          relativePath: relativePath,
          filename: path.basename(file),
        });
      }
    });
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e.message);
  }

  return fileList;
}

// Check if asset is referenced in code
function isAssetUsed(asset, projectFiles) {
  const { filename, relativePath } = asset;

  // Patterns to search for
  const patterns = [
    filename,
    filename.split('.')[0], // without extension
    relativePath.replace(/\\/g, '/'),
    `/${filename}`,
    `/public/${relativePath.replace(/\\/g, '/')}`,
  ];

  // Read all project files and search for references
  for (const projectFile of projectFiles) {
    try {
      const content = fs.readFileSync(projectFile, 'utf-8');

      for (const pattern of patterns) {
        // Escape special regex characters
        const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedPattern, 'i');

        if (regex.test(content)) {
          return true;
        }
      }
    } catch (e) {
      // File read error
    }
  }

  return false;
}

// Main function
function findUnusedAssets() {
  console.log('🔍 Scanning for unused assets...\n');

  console.log('📂 Indexing project files...');
  const projectFiles = getAllProjectFiles(PROJECT_ROOT);
  console.log(`✓ Found ${projectFiles.length} source files\n`);

  console.log('📂 Indexing public assets...');
  const allAssets = getAllAssets(PUBLIC_DIR);
  console.log(`✓ Found ${allAssets.length} assets\n`);

  const unusedAssets = [];
  const usedAssets = [];

  console.log('🔎 Checking asset usage...\n');
  allAssets.forEach((asset, index) => {
    process.stdout.write(`\rProgress: [${index + 1}/${allAssets.length}] ${asset.filename}`);

    // Skip protected files
    if (PROTECTED_FILES.includes(asset.filename)) {
      usedAssets.push(asset);
      return;
    }

    if (isAssetUsed(asset, projectFiles)) {
      usedAssets.push(asset);
    } else {
      unusedAssets.push(asset);
    }
  });

  console.log('\n\n📊 Results:\n');
  console.log(`Total assets: ${allAssets.length}`);
  console.log(`Used assets: ${usedAssets.length}`);
  console.log(`Unused assets: ${unusedAssets.length}\n`);

  if (unusedAssets.length > 0) {
    console.log('❌ Unused assets found:\n');
    unusedAssets.forEach(asset => {
      const sizeKB = (fs.statSync(asset.fullPath).size / 1024).toFixed(2);
      console.log(`  - ${asset.relativePath} (${sizeKB} KB)`);
    });

    const totalSizeKB = unusedAssets.reduce(
      (sum, asset) => sum + fs.statSync(asset.fullPath).size / 1024,
      0
    ).toFixed(2);
    console.log(`\nTotal space that could be freed: ${totalSizeKB} KB\n`);

    if (!process.argv.includes('--delete')) {
      console.log('💡 To delete these files, run:');
      console.log('   node scripts/delete-unused-assets.js --delete\n');
    }

    // If --delete flag is provided, delete the files
    if (process.argv.includes('--delete')) {
      console.log('🗑️  Deleting unused assets...\n');
      let deleted = 0;
      let failed = 0;

      unusedAssets.forEach(asset => {
        try {
          fs.unlinkSync(asset.fullPath);
          console.log(`  ✓ Deleted: ${asset.relativePath}`);
          deleted++;
        } catch (e) {
          console.error(`  ✗ Failed to delete ${asset.relativePath}:`, e.message);
          failed++;
        }
      });

      console.log(`\n✅ Cleanup complete! Deleted ${deleted} file(s)`);
      if (failed > 0) {
        console.log(`⚠️  Failed to delete ${failed} file(s)\n`);
      } else {
        console.log(`💾 Freed up ${totalSizeKB} KB of space\n`);
      }
    }
  } else {
    console.log('✅ All assets are being used!\n');
  }
}

// Run
try {
  findUnusedAssets();
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}
