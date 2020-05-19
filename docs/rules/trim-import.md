# Trim import statements (trim-import)

This rule removes any trailing and leading spaces of import-keywords.

## Rule Details

This rule enforces consistend spacing around import keywords.

Examples of **incorrect** code for this rule:

```js
import    {CheckBox, InputField} from '@components';
   import    {users, posts} from '@store';
import    {createClassname} from '../utils/classname';
  import   {on, off} from '../utils/events';
```


Examples of **correct** code for this rule:


```js
import {CheckBox, InputField} from '@components';
import {users, posts} from '@store';
import {createClassname} from '../utils/classname';
import {on, off} from '../utils/events';
```


## When Not To Use It

If you don't want to enforce consistent import-spacing.
