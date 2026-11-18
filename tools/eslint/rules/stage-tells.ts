import {
    AST_NODE_TYPES,
    ESLintUtils,
    TSESTree,
} from "@typescript-eslint/utils";

type Options = [{ allowUnlit: string[] }];
type MessageIds =
    | "unlitActor"
    | "defaultFov"
    | "autoRotate"
    | "orbitControls"
    | "spinInPlace";

const LADDER = ".claude/skills/stagecraft/layers";
const UNLIT = ["MeshBasicMaterial", "MeshBasicNodeMaterial"];
const ORBIT = "OrbitControls";
const DEFAULT_FOVS = new Set([50, 75]);
const AXES = new Set(["x", "y", "z"]);

const isInvisible = (node: TSESTree.JSXOpeningElement) =>
    node.attributes.some(
        (attribute) =>
            attribute.type === AST_NODE_TYPES.JSXAttribute &&
            attribute.name.type === AST_NODE_TYPES.JSXIdentifier &&
            attribute.name.name === "colorWrite" &&
            attribute.value?.type === AST_NODE_TYPES.JSXExpressionContainer &&
            attribute.value.expression.type === AST_NODE_TYPES.Literal &&
            attribute.value.expression.value === false,
    );

const isBaked = (node: TSESTree.NewExpression) =>
    node.arguments.some(
        (argument) =>
            argument.type === AST_NODE_TYPES.ObjectExpression &&
            argument.properties.some(
                (property) =>
                    property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Identifier &&
                    property.key.name === "lightMap",
            ),
    );

const nameOf = (node: TSESTree.JSXTagNameExpression) =>
    node.type === AST_NODE_TYPES.JSXIdentifier ? node.name : "";

const keyName = (node: TSESTree.Property) =>
    node.key.type === AST_NODE_TYPES.Identifier ? node.key.name : "";

const isRotationAxis = (node: TSESTree.Node) =>
    node.type === AST_NODE_TYPES.MemberExpression &&
    node.property.type === AST_NODE_TYPES.Identifier &&
    AXES.has(node.property.name) &&
    node.object.type === AST_NODE_TYPES.MemberExpression &&
    node.object.property.type === AST_NODE_TYPES.Identifier &&
    node.object.property.name === "rotation";

export const stageTells = ESLintUtils.RuleCreator.withoutDocs<
    Options,
    MessageIds
>({
    meta: {
        type: "problem",
        docs: {
            description:
                "Flag stage code that produces Pre-first to Third generation stages.",
        },
        messages: {
            unlitActor: `An unlit material on a stage object reads as programmer art (MAT-G0-1). Use a physically based material. ${LADDER}/02-material.md`,
            defaultFov: `A library default field of view is a lens nobody chose (CAM-G3-1). Choose a focal length per shot. ${LADDER}/05-camera.md`,
            autoRotate: `Auto-rotation is a screensaver, not a performance (CAM-G3-1). Move the camera from the script. ${LADDER}/05-camera.md`,
            orbitControls: `A drag-to-rotate viewer replaces the performance (CAM-G2-1). The script moves the camera; the pointer adds a damped sway. ${LADDER}/05-camera.md`,
            spinInPlace: `Rotation added every frame is spinning in place with no cause (MOT-G3-1). Make rotation a verb in the script. ${LADDER}/06-motion.md`,
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowUnlit: { type: "array", items: { type: "string" } },
                },
                additionalProperties: false,
            },
        ],
    },
    defaultOptions: [{ allowUnlit: ["animatic", "/ink."] }],
    create(context, [{ allowUnlit }]) {
        const unlitAllowed = allowUnlit.some((part) =>
            context.filename.includes(part),
        );
        const unlitNames = new Set(UNLIT.flatMap((name) => [name, `${name[0]?.toLowerCase()}${name.slice(1)}`]));

        return {
            JSXOpeningElement(node) {
                const name = nameOf(node.name);
                if (unlitNames.has(name) && !unlitAllowed && !isInvisible(node))
                    context.report({ node, messageId: "unlitActor" });
                if (name === ORBIT)
                    context.report({ node, messageId: "orbitControls" });
            },
            JSXAttribute(node) {
                if (
                    node.name.type === AST_NODE_TYPES.JSXIdentifier &&
                    node.name.name === "autoRotate"
                )
                    context.report({ node, messageId: "autoRotate" });
            },
            NewExpression(node) {
                if (node.callee.type !== AST_NODE_TYPES.Identifier) return;
                if (unlitNames.has(node.callee.name) && !unlitAllowed && !isBaked(node))
                    context.report({ node, messageId: "unlitActor" });
                if (node.callee.name === ORBIT)
                    context.report({ node, messageId: "orbitControls" });
            },
            Property(node) {
                const key = keyName(node);
                if (
                    key === "fov" &&
                    node.value.type === AST_NODE_TYPES.Literal &&
                    typeof node.value.value === "number" &&
                    DEFAULT_FOVS.has(node.value.value)
                )
                    context.report({ node, messageId: "defaultFov" });
                if (
                    key === "autoRotate" &&
                    node.value.type === AST_NODE_TYPES.Literal &&
                    node.value.value === true
                )
                    context.report({ node, messageId: "autoRotate" });
            },
            AssignmentExpression(node) {
                if (
                    (node.operator === "+=" || node.operator === "-=") &&
                    isRotationAxis(node.left)
                )
                    context.report({ node, messageId: "spinInPlace" });
            },
        };
    },
});
