module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.*?)\] - (.*?): (.*)/,
      headerCorrespondence: ['platform', 'type', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { platform, type, subject } = parsed
          if (platform === null && type === null && subject === null) {
            return [
              false,
              "\x1b[31mERROR\x1b[0m: Please follow the format '[cloud] - [chore]: subject'",
            ]
          }
          return [true, '']
        },
        'gitmoji-type-enum': (parsed, _when, expectedValue) => {
          const platformType = ['Cloud', 'Development', 'QA'] //change your platforms here
          const { type, platform } = parsed
          if (type && !expectedValue.includes(type)) {
            return [
              false,
              `\x1b[31mERROR\x1b[0m: [${type}] doesn't include in [${expectedValue}]`,
            ]
          }
          if (platform && !platformType.includes(platform)) {
            return [
              false,
              `\x1b[31mERROR\x1b[0m: [${platform}] doesn't include in [${platformType}]`,
            ]
          }
          return [true, '']
        },
      },
    },
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
    'gitmoji-type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feature',
        'bugfix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'translation',
        'security',
      ],
    ],
    'subject-empty': [2, 'never'],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'footer-empty': [2, 'always'],
  },
}
