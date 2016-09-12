import negativeTests from './rules/negativeTests';
import noWeakTypes from './rules/noWeakTypes';

export default {
  rules: {
    'negative-tests': negativeTests,
    'no-weak-types': noWeakTypes,
  },
  rulesConfig: {
    'negative-tests': 0,
    'no-weak-types': 0,
  },
};
