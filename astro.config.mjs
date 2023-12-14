import { defineConfig } from 'astro/config';
import NetlifyCMS from 'astro-netlify-cms';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config:{
        path: './custom-config.cjs'
      }
    }),
    NetlifyCMS({
      config: {
        // Use Netlify’s “Git Gateway” authentication and target our default branch
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        // Logo for backend
        logo_url: `https://res.cloudinary.com/stephangriesel/image/upload/v1687318146/logo_cqhhz9.png`,
        // Configure where our media assets are stored & served from
        media_folder: 'public/upload',
        public_folder: '/upload',
        // Configure the content collections
        collections: [
          {
            name: 'pricelist',
            label: 'Price List',
            label_singular: 'Item',
            folder: 'src/pages/posts',
            create: true,
            delete: true,
            sortable_fields: ['commit_date', 'title', 'language.en'],
            fields: [
              { name: 'title', widget: 'string', label: 'Item' },
              { name: 'price', widget: 'string', label: 'Price' },
              {
                name: 'layout',
                widget: 'select',
                default: '../../layouts/ItemPost.astro',
                options: [
                  { label: 'Item post', value: '../../layouts/ItemPost.astro' },
                ],
              },
            ],
          },
        ],
      },
    }),
  ],
});
