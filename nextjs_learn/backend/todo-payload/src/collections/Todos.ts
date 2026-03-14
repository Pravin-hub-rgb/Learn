import { CollectionConfig } from "payload";

export const Todos: CollectionConfig = {
    slug: 'todos',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'done',
            type: 'checkbox',
            defaultValue: false,
        }
    ]
}