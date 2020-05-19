/**
 * @fileoverview Rule to trim import statements.
 * @author Simon Reinisch <https://github.com/Simonwep>
 */
'use strict';

/*
 * ------------------------------------------------------------------------------
 *  Rule Definition
 * ------------------------------------------------------------------------------
 */

module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'trim your import-statements',
            category: 'Stylistic Issues'
        },

        fixable: 'code',

        schema: [
            {enum: ['always', 'never']}
        ]
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        /**
         * Removes leading space of an import statement
         * @param node
         * @param fixer
         */
        const trimSpaceBeforeImport = (node, fixer) => {
            const {range: [start], loc} = node;
            const {column} = loc.start;

            return fixer.removeRange([start - column, start]);
        };

        const hasSpaceBeforeImport = node => {
            return node.loc.start.column > 0;
        };

        const leadingSpaces = text => {
            let spaces = 0;

            while (spaces < text.length && text[spaces] === ' ') {
                spaces++;
            }

            return spaces;
        };

        /**
         * Removes multiple spaces between the import-keyword and the specifiers
         * @param node
         * @param fixer
         */
        const trimSpaceAfterImport = (node, fixer) => {
            const {specifiers} = node;
            const sourceOffset = node.source.range[0];
            const nodeStart = node.range[0];
            const importOffset = (nodeStart + 6);
            const importText = sourceCode.getText()
                .slice(importOffset, sourceOffset);

            // Could be an unnamed import
            if (specifiers.length) {
                const spaces = leadingSpaces(importText);
                return fixer.replaceTextRange([importOffset, importOffset + spaces], ' ');
            }

            // Check if it's an empty import (import {} from 'x')
            if (importText.includes('{')) {
                return fixer.replaceTextRange([importOffset, sourceOffset], ' {} from ');
            }

            return fixer.replaceTextRange([importOffset, sourceOffset], ' ');
        };

        const hasSpaceAfterImport = node => {
            const {specifiers} = node;
            const sourceOffset = node.source.range[0];
            const nodeStart = node.range[0];
            const importOffset = (nodeStart + 6);
            const importText = sourceCode.getText()
                .slice(importOffset, sourceOffset);

            // Could be an unnamed import
            if (specifiers.length) {
                return leadingSpaces(importText) > 1;
            }

            const diff = sourceOffset - importOffset;

            // Check if it's an empty import (import {} from 'x')
            const emptyImport = sourceCode.getText()
                .slice(importOffset, sourceOffset)
                .includes('{');

            return emptyImport ? diff > 9 : diff > 1;
        };

        return {
            ImportDeclaration(node) {

                // Skip multiline imports
                const {start, end} = node.loc;
                if (start.line !== end.line) {
                    return;
                }

                if (hasSpaceBeforeImport(node)) {
                    context.report({
                        node,
                        message: 'Leading space in front of import keyword',
                        fix(fixer) {
                            return trimSpaceBeforeImport(node, fixer);
                        }
                    });
                }

                if (hasSpaceAfterImport(node)) {
                    context.report({
                        node,
                        message: 'Trailing space after import keyword',
                        fix(fixer) {
                            return trimSpaceAfterImport(node, fixer);
                        }
                    });
                }
            }
        };
    }
};
