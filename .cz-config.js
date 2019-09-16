'use strict';

module.exports = {

  types: [
    {
      value: 'article',
      name : '🦉  article:      Add new article'
    },
    {
      value: 'update',
      name : '🐳  update:      Update article'
    },
    {
      value: 'fix',
      name : '🐞  fix:      A bug fix'
    },
    {
      value: 'refactor',
      name : '🛠  refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: 'docs',
      name : '📚  docs:     Documentation only changes'
    },
    {
      value: 'style',
      name : '🌈  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: 'revert',
      name : '⏪  revert:   Revert to a commit'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};