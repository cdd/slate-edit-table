import Slate from 'slate';

const contents = [
    'Col 0, Row 2',
    Slate.Block.create({
        type: 'paragraph',
        nodes: [
            Slate.Text.create({
                text: 'Col 1, Row 2'
            })
        ]
    }),
    [
        Slate.Block.create({
            type: 'paragraph',
            nodes: [
                Slate.Text.create({
                    text: 'Col 2,'
                })
            ]
        }),
        Slate.Block.create({
            type: 'paragraph',
            nodes: [
                Slate.Text.create({
                    text: ' Row 2'
                })
            ]
        })
    ]
];

export default function(plugin, change) {
    const { value } = change;
    const cursorBlock = value.document.getDescendant('_cursor_');
    change.moveToRangeOf(cursorBlock);

    return plugin.changes.insertRow(change, 2, i => contents[i]);
}
