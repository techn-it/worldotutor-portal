
import { CollectionConfig } from 'payload';

const Questions: CollectionConfig = {
    slug: 'questions',
    labels: {
        singular: 'Question',
        plural: 'Questions',
    },
    admin: {
        useAsTitle: 'question',
    },
    access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        read: () => true,
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'quizcategories',
            required: true,
        },
        {
            name: 'question',
            type: 'textarea', 
            required: true,
        },
        {
            name: 'options',
            type: 'array',
            fields: [
                {
                    name: 'text',
                    type: 'text'
                }
            ],
        },
        {
            name: 'correctAnswer',
            type: 'number',
            required: true,
        },
        {
            name: 'explanation',
            type: 'textarea',
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users',
        },
    ],
    hooks: {
        afterRead: [
            async ({ doc, req }) => {
                if (doc.category?.name) {
                    doc.category = doc.category.name; // flatten to string
                }
                return doc;
            },
        ],
    },
    timestamps: true,
};


export default Questions;
