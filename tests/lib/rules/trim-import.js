/**
 * @fileoverview Tests for align-import rule.
 * @author Simon Reinisch <https://github.com/Simonwep>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/trim-import');
const {RuleTester} = require('eslint');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
});

ruleTester.run('trim-import', rule, {

    valid: [
        `
import {CheckBox, InputField} from '@components';
import {users, posts}         from '@store';
import {createClassname}      from '../utils/classname';
import {on, off}              from '../utils/events';
import * as styles            from '../styles/core';
        `,
        `
import {CheckBox, InputField} from '@components';
import {users, posts} from '@store';
import {createClassname} from '../utils/classname';

import {on, off} from '../utils/events';
import * as styles from '../styles/core';
        `,
        `
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export2 as alias1 } from "module-name";
import { export3 , export4 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 } from "module-name";
import defaultExport3, * as name2 from "module-name";
import "module-name";
        `
    ],

    invalid: [
        {
            code: `
import       defaultExport from "module-name";
  import   *  as   name from "module-name";
  import   {   export1 } from "module-name";
   import     {   export2 as alias1 } from "module-name";
  import   {   export3 , export4 } from "module-name";
 import   {   foo , bar } from "module-name/path/to/specific/un-exported/file";
 import   {     export5 , export6 as alias7 } from "module-name";
import     defaultExport2, { export8 } from "module-name";
  import     defaultExport3, * as name2 from "module-name";
  import   "module-name";
            `,
            output: `
import defaultExport from "module-name";
import *  as   name from "module-name";
import {   export1 } from "module-name";
import {   export2 as alias1 } from "module-name";
import {   export3 , export4 } from "module-name";
import {   foo , bar } from "module-name/path/to/specific/un-exported/file";
import {     export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 } from "module-name";
import defaultExport3, * as name2 from "module-name";
import "module-name";
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Trailing space after import keyword',
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 47
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 3,
                    column: 3,
                    endLine: 3,
                    endColumn: 44
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 3,
                    column: 3,
                    endLine: 3,
                    endColumn: 44
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 4,
                    column: 3,
                    endLine: 4,
                    endColumn: 45
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 4,
                    column: 3,
                    endLine: 4,
                    endColumn: 45
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 5,
                    column: 4,
                    endLine: 5,
                    endColumn: 58
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 5,
                    column: 4,
                    endLine: 5,
                    endColumn: 58
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 6,
                    column: 3,
                    endLine: 6,
                    endColumn: 55
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 6,
                    column: 3,
                    endLine: 6,
                    endColumn: 55
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 7,
                    column: 2,
                    endLine: 7,
                    endColumn: 80
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 7,
                    column: 2,
                    endLine: 7,
                    endColumn: 80
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 8,
                    column: 2,
                    endLine: 8,
                    endColumn: 66
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 8,
                    column: 2,
                    endLine: 8,
                    endColumn: 66
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 9,
                    column: 1,
                    endLine: 9,
                    endColumn: 59
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 10,
                    column: 3,
                    endLine: 10,
                    endColumn: 60
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 10,
                    column: 3,
                    endLine: 10,
                    endColumn: 60
                },
                {
                    message: 'Leading space in front of import keyword',
                    line: 11,
                    column: 3,
                    endLine: 11,
                    endColumn: 26
                },
                {
                    message: 'Trailing space after import keyword',
                    line: 11,
                    column: 3,
                    endLine: 11,
                    endColumn: 26
                }

            ]
        }
    ]
});
