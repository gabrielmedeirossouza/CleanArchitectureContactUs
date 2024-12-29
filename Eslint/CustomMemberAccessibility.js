export const customMemberAccessibility = {
    'custom-member-accessibility': {
        rules: {
            'add-public-modifier': {
                meta: {
                    type: "problem",
                    docs: {
                        description: "Add default public modifier to class methods and properties",
                        category: "Stylistic Issues",
                        recommended: false,
                    },
                    fixable: "code",
                    schema: [],
                    messages: {
                        addPublicModifier: "Missing accessibility modifier on method definition. Adding 'public'.",
                    },
                },
                create(context) {
                    return {
                        Identifier(node) {
                            const toModifyTypes = ['MethodDefinition', 'PropertyDefinition'];
                            if (toModifyTypes.includes(node.parent.type) && !node.parent.accessibility && node.name !== 'constructor') {

                                context.report({
                                    node: node.parent,
                                    messageId: "addPublicModifier",
                                    fix(fixer) {
                                        return fixer.insertTextBeforeRange(node.parent.key.parent.range, "public ");
                                    },
                                })
                            }

                        },
                    };
                },
            },
        },
    },
}
