import * as fs from "fs";
import * as path from "path";

/**
 * Script to find unused static assets in the 'public/' directory.
 * Run this script from the project root using:
 *
 * npx ts-node scripts/remove-unused-public.ts
 */

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");

if (!fs.existsSync(publicDir)) {
    console.error("❌ No public directory found!");
    process.exit(1);
}

// 1. Get all files in the public directory
function getFilesRecursively(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFilesRecursively(filePath));
        } else {
            results.push(filePath);
        }
    }
    return results;
}

// 2. Get all source code files to scan for references
function getSourceFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // Ignore directories that shouldn't contain references
            if (
                !["node_modules", ".next", "public", ".git", "dist"].includes(
                    file,
                )
            ) {
                results = results.concat(getSourceFiles(filePath));
            }
        } else {
            // Only check relevant source files (ts, tsx, js, jsx, css, etc.)
            if (filePath.match(/\.(tsx?|jsx?|css|scss|md)$/i)) {
                results.push(filePath);
            }
        }
    }
    return results;
}

console.log("Analyzing public directory assets...");
const publicFiles = getFilesRecursively(publicDir);
const sourceFiles = getSourceFiles(projectRoot);

console.log(`Scanning ${sourceFiles.length} source files...`);

// Read all source file contents into one giant string for fast searching
const sourceContents = sourceFiles
    .map((f) => fs.readFileSync(f, "utf-8"))
    .join("\n");

const unusedFiles: string[] = [];

for (const pubFile of publicFiles) {
    // Ignore hidden files (like .DS_Store or .gitkeep)
    if (path.basename(pubFile).startsWith(".")) continue;

    const fileName = path.basename(pubFile);
    const relativePath = pubFile
        .substring(publicDir.length)
        .replace(/\\/g, "/"); // e.g., /images/logo.png

    // A file is considered "used" if its exact filename or relative path
    // is mentioned ANYWHERE in the source code.
    if (
        !sourceContents.includes(fileName) &&
        !sourceContents.includes(relativePath)
    ) {
        unusedFiles.push(pubFile);
    }
}

if (unusedFiles.length === 0) {
    console.log("✅ No unused files found in the public directory.");
} else {
    console.log(
        `🗑️ Found ${unusedFiles.length} unused file(s) in public directory:`,
    );
    unusedFiles.forEach((f) => {
        const rel = f.substring(publicDir.length).replace(/\\/g, "/");
        console.log(`- public${rel}`);

        // Uncomment the lines below to actually delete the files

        try {
            fs.unlinkSync(f);
            console.log(`  -> Removed.`);
        } catch (err) {
            console.error(`  -> Failed to remove: ${(err as Error).message}`);
        }
    });
    console.log(
        "\n⚠️ To actually delete these files, open the script and uncomment the fs.unlinkSync lines.",
    );
}
