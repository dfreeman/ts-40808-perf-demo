import { traverse } from '@babel/core';

traverse(null, {
  ArrayPattern(path) {
    console.log(path.node.elements);
  },
});
