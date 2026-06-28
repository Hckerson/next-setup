import { Project, SourceFile } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

/**
 * Script to find and remove unused components using static analysis.
 * Run this script from the project root using:
 *
 * npm install -D ts-morph
 * npx ts-node scripts/remove-unused-components.ts
 *
 * Note: It performs a reachability analysis starting from files outside
 * the 'components/' directory.
 */

const projectRoot = process.cwd();

const project = new Project({
    tsConfigFilePath: path.join(projectRoot, "tsconfig.json"),
});

const allFiles = project.getSourceFiles();
const visited = new Set<string>();

// Treat files outside of the `components/` directory as entry points
const entryFiles = allFiles.filter((f) => {
    const p = f.getFilePath().replace(/\\/g, "/");
    return (
        !p.includes("/components/") &&
        !p.includes("/public/") &&
        !p.includes("/node_modules/")
    );
});

function visit(file: SourceFile) {
    const filePath = file.getFilePath();
    if (visited.has(filePath)) return;

    visited.add(filePath);

    // Get all files that this file imports or exports from
    const referencedFiles = file.getReferencedSourceFiles();
    for (const refFile of referencedFiles) {
        visit(refFile);
    }
}

// Start trace
console.log("Analyzing project dependencies...");
for (const file of entryFiles) {
    visit(file);
}

const unusedComponents: string[] = [];

for (const file of allFiles) {
    const p = file.getFilePath().replace(/\\/g, "/");
    // If the file is in components and was never reached during the trace
    if (p.includes("/components/") && !visited.has(file.getFilePath())) {
        unusedComponents.push(file.getFilePath());
    }
}

if (unusedComponents.length === 0) {
    console.log("✅ No unused components found.");
} else {
    console.log(`🗑️ Found ${unusedComponents.length} unused component(s):`);
    unusedComponents.forEach((f) => {
        console.log(`- ${f}`);
        try {
            fs.unlinkSync(f);
            console.log(`  -> Removed.`);
        } catch (err) {
            console.error(`  -> Failed to remove: ${(err as Error).message}`);
        }
    });
}
