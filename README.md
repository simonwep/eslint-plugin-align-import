<h3 align="center">
    eslint-plugin-align-import
</h3>

<p align="center">
  <a href="https://github.com/Simonwep/eslint-plugin-align-import/actions"><img
     alt="Build Status"
     src="https://img.shields.io/github/workflow/status/Simonwep/eslint-plugin-align-import/CI?style=flat-square"/></a>
  <a href="https://www.npmjs.com/package/eslint-plugin-align-import"><img
     alt="Download count"
     src="https://img.shields.io/npm/dm/eslint-plugin-align-import.svg?style=popout-square"></a>
  <img alt="Current version"
       src="https://img.shields.io/github/tag/Simonwep/eslint-plugin-align-import.svg?color=3498DB&label=version&style=flat-square">
  <a href="https://github.com/sponsors/Simonwep"><img
     alt="Support me"
     src="https://img.shields.io/badge/github-support-3498DB.svg?style=popout-square"></a>
</p>

### What is this?

This plugin / rule will align all your import statements:
> from

```js
import defaultExport from "module-name";
import * as name  from "module-name";
import { export1 } from "module-name";
import { export2 as alias1 } from "module-name";
import { export3 , export4 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 } from "module-name";
import defaultExport3, * as name2 from "module-name";
```

> to

```js
import defaultExport                   from "module-name";
import * as name                       from "module-name";
import { export1 }                     from "module-name";
import { export2 as alias1 }           from "module-name";
import { export3 , export4 }           from "module-name";
import { foo , bar }                   from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 }     from "module-name";
import defaultExport3, * as name2      from "module-name";
```


### Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm install eslint --save-dev
```

Next, install `eslint-plugin-align-import`:

```
$ npm install eslint-plugin-align-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-align-import` globally.

### Usage

Add `babel-align-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "babel-align-import"
    ]
}
```

You might have to update the [`no-multi-spaces`](https://eslint.org/docs/rules/no-multi-spaces) rule to allow multiple spaces in front of `import`:

```json
{
    "rules": {
        "no-multi-spaces": ["error", {"exceptions": {"ImportDeclaration": true}}]
    }
}
```

There are two rules available:

| rule | description |
| ---- | ----------- |
| [align-import/align-import](docs/rules/align-import.md) | Aligns your import statements, this is probably the rule you're looking for. |
| [align-import/trim-import](docs/rules/trim-import.md) | This rule will remove any extra space around your `import` keyword. |




