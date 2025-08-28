// collections/Exams.ts

import { CollectionConfig } from "payload";

const Exams: CollectionConfig = {
    slug: 'exams',
    labels: {
        singular: 'Exam',
        plural: 'Exams',
    },
    admin: {
        useAsTitle: 'title',
    },
    access: {
        create: ({ req: { user } }) => !!user?.role && user.role === 'admin',
        read: () => true,
        update: ({ req: { user } }) => !!user?.role && user.role === 'admin',
        delete: ({ req: { user } }) => !!user?.role && user.role === 'admin',
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'questions',
            type: 'relationship',
            relationTo: 'questions',
            hasMany: true,
            required: true,
        },
        {
            name: 'timeLimit',
            type: 'number',
            defaultValue: 10,
            required: true,
        },
        {
            name: 'passingScore',
            type: 'number',
            defaultValue: 60,
            required: true,
        },
        {
            name: 'isActive',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'category',
            type: 'text',
            required: true,
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users',
        },
    ],
    timestamps: true,
};

export default Exams;
