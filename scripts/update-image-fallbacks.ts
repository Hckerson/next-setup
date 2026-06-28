import { Project, SyntaxKind, JsxAttribute, JsxExpression, BinaryExpression } from "ts-morph";
import * as path from "path";

/**
 * Script to add or replace fallbacks in Next.js <Image /> components.
 * 
 * Run with: npx ts-node scripts/update-image-fallbacks.ts
 */

const projectRoot = process.cwd();
const project = new Project({
    tsConfigFilePath: path.join(projectRoot, "tsconfig.json"),
});

const sourceFiles = project.getSourceFiles().filter(f => {
    const filePath = f.getFilePath();
    return filePath.endsWith('.tsx') || filePath.endsWith('.jsx');
});

const FALLBACK_IMAGE = '"/images/general/empty-img.jpg"'; 

let modifiedFilesCount = 0;
let modifiedImagesCount = 0;

for (const file of sourceFiles) {
    let fileModified = false;

    const jsxOpeningElements = file.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
    const jsxSelfClosingElements = file.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);
    const allImageElements = [...jsxOpeningElements, ...jsxSelfClosingElements].filter(el => {
        return el.getTagNameNode().getText() === "Image" || el.getTagNameNode().getText() === "img";
    });

    for (const imageEl of allImageElements) {
        const srcAttr = imageEl.getAttribute("src");
        if (!srcAttr || srcAttr.getKind() !== SyntaxKind.JsxAttribute) continue;

        const jsxAttr = srcAttr as JsxAttribute;
        const initializer = jsxAttr.getInitializer();

        if (initializer && initializer.getKind() === SyntaxKind.JsxExpression) {
            const expression = (initializer as JsxExpression).getExpression();
            if (!expression) continue;

            // If it's a hardcoded string inside curly braces (e.g. src={"/logo.png"}), ignore it!
            if (expression.getKind() === SyntaxKind.StringLiteral || expression.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral) {
                continue;
            }

            if (expression.getKind() === SyntaxKind.BinaryExpression) {
                const binaryExpr = expression as BinaryExpression;
                const operator = binaryExpr.getOperatorToken().getKind();

                if (operator === SyntaxKind.BarBarToken || operator === SyntaxKind.QuestionQuestionToken) {
                    const left = binaryExpr.getLeft();
                    const right = binaryExpr.getRight();
                    
                    // If left side is a string literal, we don't need a fallback at all!
                    // This reverts components that were accidentally modified in the previous run.
                    if (left.getKind() === SyntaxKind.StringLiteral || left.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral) {
                        expression.replaceWithText(left.getText());
                        fileModified = true;
                        modifiedImagesCount++;
                    } else {
                        // Dynamic left side, ensure right side is the correct fallback
                        const rightText = right.getText();
                        if (rightText !== FALLBACK_IMAGE && rightText !== "'/images/general/empty-img.jpg'") {
                            right.replaceWithText(FALLBACK_IMAGE);
                            fileModified = true;
                            modifiedImagesCount++;
                        }
                    }
                } else {
                    expression.replaceWithText(`(${expression.getText()}) || ${FALLBACK_IMAGE}`);
                    fileModified = true;
                    modifiedImagesCount++;
                }
            } 
            else if (expression.getKind() === SyntaxKind.ConditionalExpression) {
                expression.replaceWithText(`(${expression.getText()}) || ${FALLBACK_IMAGE}`);
                fileModified = true;
                modifiedImagesCount++;
            }
            else {
                expression.replaceWithText(`${expression.getText()} || ${FALLBACK_IMAGE}`);
                fileModified = true;
                modifiedImagesCount++;
            }
        }
    }

    if (fileModified) {
        modifiedFilesCount++;
    }
}

if (modifiedFilesCount > 0) {
    project.saveSync();
    console.log(`✅ Updated/Fixed ${modifiedImagesCount} <Image /> src fallbacks across ${modifiedFilesCount} files.`);
} else {
    console.log("✅ No <Image /> components needed updating.");
}
