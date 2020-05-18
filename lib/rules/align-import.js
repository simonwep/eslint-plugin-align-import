/**
 * @fileoverview Rule to align import statements.
 * @author Simon Reinisch <https://github.com/Simonwep>
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: 'layout',

        docs: {
            description: 'align your import-statements',
            category: 'Stylistic Issues'
        },

        fixable: 'code',

        schema: [
            {enum: ['always', 'never']}
        ]
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        const canAlign = node => {
            return node &&
                node.type === 'ImportDeclaration' &&
                node.specifiers.length > 0;
        };

        const resolveImportIndentation = node => {
            if (canAlign(node)) {
                const {specifiers} = node;
                const lastSpecifier = specifiers[specifiers.length - 1];

                const offset = sourceCode.getText()
                    .slice(lastSpecifier.range[1], node.source.range[0])
                    .indexOf('}');

                return lastSpecifier.loc.end.column
                    + (offset >= 0 ? offset + 1 : 0);
            }

            return null;
        };

        /**
         * Resolves the indentation of an import block
         * @param node
         */
        const resolveBlockIndentation = node => {
            const {parent} = node;

            // Indent only root-level imports
            if (parent.type !== 'Program') {
                return;
            }

            // Resolve import-offset
            const {body} = parent;
            let offset = body.indexOf(node);
            if (offset === -1) {
                return;
            }

            // Find start of import-block
            let lastLine = node.loc.start.line;
            for (; ; offset--) {
                const next = body[offset - 1];

                if (next === undefined ||
                    next.type !== 'ImportDeclaration' ||
                    next.loc.start.line !== lastLine - 1) {
                    break;
                } else {
                    lastLine--;
                }
            }

            // Find minimum, fitting indentation
            const startNode = body[offset];
            let indentation = resolveImportIndentation(startNode);

            for (let i = offset + 1; i < body.length; i++) {
                const nextNode = body[i];

                if (nextNode &&
                    nextNode.type === 'ImportDeclaration' &&
                    nextNode.loc.start.line === lastLine + 1) {

                    const nextIndent = resolveImportIndentation(nextNode);
                    if (nextIndent === null) {
                        break;
                    }

                    indentation = Math.max(indentation, nextIndent);
                    lastLine++;
                } else {
                    break;
                }
            }

            return indentation;
        };

        const hasInconsistentIndentation = node => {
            if (!canAlign(node)) {
                return false;
            }

            const blockIndent = resolveBlockIndentation(node) + 6;
            const sourceStart = node.source.loc.start.column;
            return blockIndent !== sourceStart;
        };

        /**
         * Aligns import statements
         * @param node
         * @param fixer
         */
        const alignImport = (node, fixer) => {
            const indent = resolveBlockIndentation(node);
            const nodeIndent = resolveImportIndentation(node);
            const padding = indent - nodeIndent;

            // Leading space in front of the import statement
            const importOffset = node.loc.start.column;
            const rangeStart = node.range[0] + (nodeIndent - importOffset);
            const rangeEnd = node.source.range[0];

            return fixer.replaceTextRange(
                [rangeStart, rangeEnd],
                ' from '.padStart(padding + 6, ' ')
            );
        };

        return {
            ImportDeclaration(node) {

                // Skip multiline imports
                const {start, end} = node.loc;
                if (start.line !== end.line) {
                    return;
                }

                if (hasInconsistentIndentation(node)) {
                    context.report({
                        node,
                        message: 'Align from-clause from import statements',
                        fix(fixer) {
                            return alignImport(node, fixer);
                        }
                    });
                }
            }
        };
    }
};
