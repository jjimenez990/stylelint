"use strict";

const rule = require("..");
const { messages, ruleName } = rule;

testRule(rule, {
  ruleName,
  config: [2],
  syntax: "jsx",
  fix: true,

  accept: [
    {
      code: `
export default <img style={{ transform: 'translate(1, 1)', display: 'block' }} />;
`
    },
    {
      code: `
export default <img style={{
  transform: 'translate(1, 1)'
}} />;
`
    },
    {
      code: `
export default <img style=
  {
    {
      transform: 'translate(1, 1)'
    }
  }
/>;
`
    }
  ],
  reject: [
    {
      code: `
export default <img style={{
    transform: 'translate(1, 1)'
}} />;
`,
      fixed: `
export default <img style={{
  transform: 'translate(1, 1)'
}} />;
`,
      message: messages.expected("2 spaces"),
      line: 3,
      column: 4
    }
  ]
});
