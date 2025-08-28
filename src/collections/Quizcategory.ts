// collections/Categories.js
import { CollectionConfig } from 'payload';

const QuizCategories: CollectionConfig = {
  slug: 'quizcategories',
  labels: {
    singular: 'Category',
    plural: 'Categories',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};

export default QuizCategories;
