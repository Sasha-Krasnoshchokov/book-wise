// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Lead Dev Tip: You can customize rules here.
    // Example: Enforce a list of specific scopes (e.g., 'api', 'ui', 'deps')
    'scope-enum': [2, 'always', ['api', 'ui', 'infra', 'dx', 'deps', 'refactor']],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
