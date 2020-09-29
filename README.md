This repo contains a very small TypeScript project, along with a `check.js` script that runs a watched check using the
TS compiler API.

The issue described in https://github.com/microsoft/TypeScript/issues/40808 can be seen by running `node check.js` and
making simple (or no-op) changes to `src/index.ts`. You can swap which of lines 6/7 is commented to see the performance
difference.

When using `createSemanticDiagnosticsBuilderProgram`, rechecking after a change to `src/index.ts` generally takes
1200-1700ms on my local machine:

```
6031 Starting compilation in watch mode...
6194 Found 0 errors. Watching for file changes.
Typecheck: 2770.981ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 1675.083ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 1317.464ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 1206.516ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 1326.270ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 1303.234ms
```

By comparison, `createEmitAndSemanticDiagnosticsBuilderProgram` generally takes 3-6ms:

```
6031 Starting compilation in watch mode...
6194 Found 0 errors. Watching for file changes.
Typecheck: 2634.201ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 5.974ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 4.051ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 4.247ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 3.042ms
6032 File change detected. Starting incremental compilation...
6194 Found 0 errors. Watching for file changes.
Typecheck: 5.793ms
```
