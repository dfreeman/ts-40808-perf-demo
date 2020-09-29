const ts = require('typescript');

const START = new Set([6031, 6032]);
const END = new Set([6193, 6194]);

const createProgram = ts.createSemanticDiagnosticsBuilderProgram;
// const createProgram = ts.createEmitAndSemanticDiagnosticsBuilderProgram;

const host = ts.createWatchCompilerHost(
  'tsconfig.json',
  { noEmit: true },
  ts.sys,
  createProgram,
  () => {},
  (diagnostic) => {
    console.log(diagnostic.code, diagnostic.messageText);

    if (START.has(diagnostic.code)) {
      console.time('Typecheck');
    } else if (END.has(diagnostic.code)) {
      console.timeEnd('Typecheck');
    }
  }
);

ts.createWatchProgram(host);
