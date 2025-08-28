import type { CollectionConfig } from 'payload'
import { expressMiddleware } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'User', 
    plural: 'Users',
  },
  admin: {
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours in seconds
    maxLoginAttempts: 5,
    lockTime: 600000, // 10 minutes in milliseconds
  },
  endpoints: [
    {
      path: '/custom-login',
      method: 'post',
      handler: async (req, res, next) => {
        const { email, password } = req.body;

        try {
          const user = await req.payload.login({
            collection: 'users',
            data: { email, password },
            req,
          });

          return res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
            token: user.token,
          });
        } catch (error) {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
          });
        }
      },
    },
    {
      path: '/custom-register',
      method: 'post', 
      handler: async (req, res, next) => {
        const { name, email, password, role = 'user' } = req.body;

        try {
          const user = await req.payload.create({
            collection: 'users',
            data: {
              name,
              email,
              password,
              role,
            },
            req,
          });

          return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'User creation failed',
            error: error.message,
          });
        }
      },
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'password',
      type: 'password',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'lastLogin',
      type: 'date',
    },
  ],
  timestamps: true,
}
