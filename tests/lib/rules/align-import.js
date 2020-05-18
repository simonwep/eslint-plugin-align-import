/**
 * @fileoverview Tests for align-import rule.
 * @author Simon Reinisch <https://github.com/Simonwep>
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/align-import');
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

ruleTester.run('align-import', rule, {

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
import {users, posts}         from '@store';
import {createClassname}      from '../utils/classname';

import {on, off}   from '../utils/events';
import * as styles from '../styles/core';
        `,
        `
import defaultExport                   from "module-name";
import * as name                       from "module-name";
import { export1 }                     from "module-name";
import { export2 as alias1 }           from "module-name";
import { export3 , export4 }           from "module-name";
import { foo , bar }                   from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 }     from "module-name";
import defaultExport3, * as name2      from "module-name";
import "module-name";
        `
    ],

    invalid: [

        {
            code: `
import {CheckBox, InputField} from '@components';
import {users, posts} from '@store';
import {createClassname} from '../utils/classname';
import {on, off} from '../utils/events';
import * as styles from '../styles/core';
            `,
            output: `
import {CheckBox, InputField} from '@components';
import {users, posts}         from '@store';
import {createClassname}      from '../utils/classname';
import {on, off}              from '../utils/events';
import * as styles            from '../styles/core';
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Align from-clause from import statements',
                    line: 3,
                    column: 1,
                    endLine: 3,
                    endColumn: 37
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 4,
                    column: 1,
                    endLine: 4,
                    endColumn: 52
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 5,
                    column: 1,
                    endLine: 5,
                    endColumn: 41
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 6,
                    column: 1,
                    endLine: 6,
                    endColumn: 42
                }

            ]
        },
        {
            code: `
import {CheckBox, InputField} from '@components';
import {users, posts} from '@store';
import {createClassname} from '../utils/classname';

import {on, off} from '../utils/events';
import * as styles from '../styles/core';
            `,
            output: `
import {CheckBox, InputField} from '@components';
import {users, posts}         from '@store';
import {createClassname}      from '../utils/classname';

import {on, off}   from '../utils/events';
import * as styles from '../styles/core';
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Align from-clause from import statements',
                    line: 3,
                    column: 1,
                    endLine: 3,
                    endColumn: 37
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 4,
                    column: 1,
                    endLine: 4,
                    endColumn: 52
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 6,
                    column: 1,
                    endLine: 6,
                    endColumn: 41
                }
            ]
        },
        {
            code: `
import   {CheckBox, InputField} from '@components';
  import    {users, posts}                    from     '@store';
    import      {createClassname}        from '../utils/classname';
            `,
            output: `
import   {CheckBox, InputField}   from '@components';
  import    {users, posts}        from '@store';
    import      {createClassname} from '../utils/classname';
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Align from-clause from import statements',
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 52
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 3,
                    column: 3,
                    endLine: 3,
                    endColumn: 65
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 4,
                    column: 5,
                    endLine: 4,
                    endColumn: 68
                }
            ]
        },
        {
            code: `
import {
    x
} from 'y';
import {CheckBox, InputField} from '@components';
import {users, posts}       from     '@store';
import {
    y
} from 'y';
            `,
            output: `
import {
    x
} from 'y';
import {CheckBox, InputField} from '@components';
import {users, posts}         from '@store';
import {
    y
} from 'y';
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Align from-clause from import statements',
                    line: 6,
                    column: 1,
                    endLine: 6,
                    endColumn: 47
                }

            ]
        },
        {
            code: `
import defaultExport         from "module-name";
import * as name  from "module-name";
import { export1 }           from "module-name";
import { export2 as alias1 } from "module-name";
import { export3 , export4 } from "module-name";
import { foo , bar }         from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 }            from "module-name";
import defaultExport2, { export8 }     from "module-name";
import defaultExport3, * as name2 from "module-name";
import "module-name";
            `,
            output: `
import defaultExport                   from "module-name";
import * as name                       from "module-name";
import { export1 }                     from "module-name";
import { export2 as alias1 }           from "module-name";
import { export3 , export4 }           from "module-name";
import { foo , bar }                   from "module-name/path/to/specific/un-exported/file";
import { export5 , export6 as alias7 } from "module-name";
import defaultExport2, { export8 }     from "module-name";
import defaultExport3, * as name2      from "module-name";
import "module-name";
            `,
            options: ['always'],
            errors: [
                {
                    message: 'Align from-clause from import statements',
                    line: 2,
                    column: 1,
                    endLine: 2,
                    endColumn: 49
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 3,
                    column: 1,
                    endLine: 3,
                    endColumn: 38
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 4,
                    column: 1,
                    endLine: 4,
                    endColumn: 49
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 5,
                    column: 1,
                    endLine: 5,
                    endColumn: 49
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 6,
                    column: 1,
                    endLine: 6,
                    endColumn: 49
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 7,
                    column: 1,
                    endLine: 7,
                    endColumn: 83
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 8,
                    column: 1,
                    endLine: 8,
                    endColumn: 70
                },
                {
                    message: 'Align from-clause from import statements',
                    line: 10,
                    column: 1,
                    endLine: 10,
                    endColumn: 54
                }

            ]
        }
    ]
});
