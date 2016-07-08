import negativeTestRule from '../../src/rules/negativeTests';
import { RuleTester } from 'eslint';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});
ruleTester.run('flow-typed/negative-tests', negativeTestRule, {
  valid: [
    `
    // $ExpectError
    foobar();
    // $ExpectError
    bla();
    // $ExpectError
    bar();
    `,
    `
    // $ExpectError with message
    foobar();
    // $ExpectError with other message
    bla();
    // $ExpectError
    asd();
    `,
    {
      code: `
      // $ExpectError
      single();
      `,
      options: [1],
    },
    {
      code: `
      // $ErrorExpected
      foo();
      `,
      options: [{
        minTests: 1,
        errorIndicator: '$ErrorExpected',
      }],
    },
  ],
  invalid: [
    {
      code: `
      foobar();
      `,
      errors: [{
        message: 'Test has to include at least 3 negative Tests.',
      }],
    }, {
      code: `
      // Soem $ExpectError stuff
      foobar();
      `,
      options: [1],
      errors: [{
        message: 'Test has to include at least 1 negative Tests.',
      }],
    }, {
      code: `
      // $ExpectError
      foobar();
      `,
      options: [{
        minTests: 1,
        errorIndicator: '$ErrorExpected',
      }],
      errors: [{
        message: 'Test has to include at least 1 negative Tests.',
      }],
    }, {
      code: `
      // $ExpectError
      foobar();
      `,
      options: [2],
      errors: [{
        message: 'Test has to include at least 2 negative Tests.',
      }],
    },
  ],
});
