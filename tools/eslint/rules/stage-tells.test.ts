import { RuleTester } from "@typescript-eslint/rule-tester";
import { afterAll, describe, it } from "vitest";
import { stageTells } from "./stage-tells";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

ruleTester.run("stage-tells", stageTells, {
    valid: [
        {
            name: "a physically based material",
            filename: "components/features/coin.tsx",
            code: `export const Coin = () => <meshPhysicalMaterial metalness={1} />;`,
        },
        {
            name: "an unlit material in the animatic placeholder",
            filename: "components/features/animatic-actor.tsx",
            code: `export const Block = () => <meshBasicMaterial transparent />;`,
        },
        {
            name: "an invisible shadow caster such as a window frame",
            filename: "components/features/window.tsx",
            code: `export const Bar = () => <meshBasicMaterial colorWrite={false} depthWrite={false} />;`,
        },
        {
            name: "an unlit material that displays a baked lightmap",
            filename: "lib/stage/baked-set.ts",
            code: `import { MeshBasicMaterial } from "three"; export const baked = (lightMap: unknown) => new MeshBasicMaterial({ lightMap });`,
        },
        {
            name: "ink on paper in a drawing, which has no light by the set's rule",
            filename: "lib/stage/ink.ts",
            code: `import { MeshBasicNodeMaterial } from "three/webgpu"; export const ink = () => new MeshBasicNodeMaterial();`,
        },
        {
            name: "a chosen focal length",
            code: `export const camera = { fov: 24, near: 0.05 };`,
        },
        {
            name: "rotation set from a script value, not accumulated",
            code: `export const turn = (group: { rotation: { y: number } }, angle: number) => { group.rotation.y = angle; };`,
        },
        {
            name: "a counter that is not a rotation",
            code: `let total = 0; total += 1;`,
        },
    ],
    invalid: [
        {
            name: "an unlit JSX material on a stage object",
            filename: "components/features/coin.tsx",
            code: `export const Coin = () => <meshBasicMaterial color="gold" />;`,
            errors: [{ messageId: "unlitActor" }],
        },
        {
            name: "an unlit node material, which renders the same as the classic one",
            filename: "lib/receipt/paper.ts",
            code: `import { MeshBasicNodeMaterial } from "three/webgpu"; export const paper = new MeshBasicNodeMaterial();`,
            errors: [{ messageId: "unlitActor" }],
        },
        {
            name: "an unlit material constructed in lib",
            filename: "lib/receipt/coin.ts",
            code: `import { MeshBasicMaterial } from "three"; export const coin = new MeshBasicMaterial();`,
            errors: [{ messageId: "unlitActor" }],
        },
        {
            name: "the library default field of view",
            code: `export const camera = { fov: 75 };`,
            errors: [{ messageId: "defaultFov" }],
        },
        {
            name: "auto-rotation as a JSX attribute",
            code: `export const Viewer = () => <Controls autoRotate />;`,
            errors: [{ messageId: "autoRotate" }],
        },
        {
            name: "orbit controls on the stage",
            code: `export const Viewer = () => <OrbitControls />;`,
            errors: [{ messageId: "orbitControls" }],
        },
        {
            name: "spinning in place every frame",
            code: `export const spin = (mesh: { rotation: { y: number } }, delta: number) => { mesh.rotation.y += delta; };`,
            errors: [{ messageId: "spinInPlace" }],
        },
    ],
});
