
import { CollectionConfig } from 'payload';
import { Question } from '../payload-types';

interface BulkQuestionData {
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

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
                    type: 'text',
                    required: true,
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
            admin: {
                readOnly: true,
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data, req, operation }) => {
                if (operation === 'create' && req.user) {
                    return {
                        ...data,
                        createdBy: req.user.id,
                    };
                }
                return data;
            },
        ],
        afterRead: [
            async ({ doc, req }) => {
                if (doc.category?.name) {
                    doc.category = doc.category.name;
                }
                return doc;
            },
        ],
    },
   endpoints: [
    {
      path: '/bulk-upload',
      method: 'post',
      handler: async (req) => {
        try {
          const { questions } = await req.json();
          
          if (!questions || !Array.isArray(questions)) {
            return Response.json(
              { error: 'Questions array is required' },
              { status: 400 }
            );
          }

          const payload = req.payload;
          const createdQuestions = [];

          for (const question of questions) {
            try {
              const createdQuestion = await payload.create({
                collection: 'questions',
                data: {
                  category: question.category,
                  question: question.question,
                  options: question.options.map(opt => ({ option: opt })),
                  correctAnswer: question.correctAnswer,
                  explanation: question.explanation || '',
                },
              });
              createdQuestions.push(createdQuestion);
            } catch (error) {
              console.error('Error creating question:', error);
            }
          }

          return Response.json({
            success: true,
            message: `Successfully created ${createdQuestions.length} of ${questions.length} questions`,
            data: createdQuestions,
          });
        } catch (error) {
          console.error('Bulk upload error:', error);
          return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
          );
        }
      },
    },
  ],
    timestamps: true,
};



export default Questions;
