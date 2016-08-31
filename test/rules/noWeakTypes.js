import noWeakTypes from '../../src/rules/noWeakTypes';
import { RuleTester } from 'eslint';

const ruleTester = new RuleTester({
  parser: 'babel-eslint',
});

const moreInfo = '\nSee https://github.com/flowtype/flow-typed/blob/master/CONTRIBUTING.md#library-definition-best-practices for more info';

ruleTester.run('flow-typed/no-weak-types', noWeakTypes, {
  valid: [
    'declare var a: string;',
    'declare type b = { a: string }',
  ],
  invalid: [
    {
      code: 'declare var a: any;',
      errors: [{
        message: `Do not use any types.${moreInfo}`,
      }],
    },
    {
      code: 'declare var a: Function;',
      errors: [{
        message: `Do not use Function types.${moreInfo}`,
      }],
    },
    {
      code: 'declare var a: Object;',
      errors: [{
        message: `Do not use Object types.${moreInfo}`,
      }],
    },
    {
      code: 'declare type a = { b: Object };',
      errors: [{
        message: `Do not use Object types.${moreInfo}`,
      }],
    },
  ],
});
