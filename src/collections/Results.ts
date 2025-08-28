import { CollectionConfig } from 'payload';

const Results: CollectionConfig = {
    slug: 'results',
    labels: {
        singular: 'Result',
        plural: 'Results',
    },
    admin: {
        useAsTitle: 'user',
    },
    access: {
        create: ({ req: { user } }) => !!user,
        read: ({ req: { user } }) => !!user?.role && user.role === 'admin',
        update: ({ req: { user } }) => !!user?.role && user.role === 'admin',
        delete: ({ req: { user } }) => !!user?.role && user.role === 'admin',
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
        },
        {
            name: 'exam',
            type: 'relationship',
            relationTo: 'exams',
            required: true,
        },
        {
            name: 'answers',
            type: 'array',
            fields: [
                {
                    name: 'question',
                    type: 'relationship',
                    relationTo: 'questions',
                    required: true,
                },
                {
                    name: 'selectedOption',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'isCorrect',
                    type: 'checkbox',
                    required: true,
                },
            ],
        },
        {
            name: 'score',
            type: 'number',
            required: true,
        },
        {
            name: 'totalQuestions',
            type: 'number',
            required: true,
        },
        {
            name: 'correctAnswers',
            type: 'number',
            required: true,
        },
        {
            name: 'timeSpent',
            type: 'number',
            required: true,
        },
        {
            name: 'passed',
            type: 'checkbox',
            required: true,
        },
        {
            name: 'completedAt',
            type: 'date',
            defaultValue: () => new Date(),
        },
    ],
    timestamps: true,
    hooks: {
        beforeChange: [
            async ({ data }) => {
                if (!data.answers) return data;

                const totalQuestions = data.answers.length;
                const correctAnswers = data.answers.filter(a => a.isCorrect).length;
                const score = Math.round((correctAnswers / totalQuestions) * 100);
                const passingScore = 60;

                return {
                    ...data,
                    totalQuestions,
                    correctAnswers,
                    score,
                    passed: score >= passingScore,
                    completedAt: new Date(),
                };
            },
        ],
        afterChange: [
            async ({ doc, payload }) => {
                await payload.update({
                    collection: 'users',
                    id: doc.user,
                    data: {
                        lastExamScore: doc.score,
                        lastExamPassed: doc.passed,
                        lastExamCompletedAt: doc.completedAt,
                    },
                });
            },
        ],
    },
};

export default Results;
