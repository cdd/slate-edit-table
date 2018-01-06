import { Schema } from 'slate';

export default function(plugin, change) {
    const schema = new Schema(plugin.schema);
    return change.normalize(schema);
}
