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
          branch: 'latest',
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
            fields: [
              { name: 'title', widget: 'string', label: 'Item' },
              { name: 'price', widget: 'string', label: 'Price' },
              { name: 'description', widget: 'string', label: 'Description', required: true },
              { name: 'tag', widget: 'string', label: 'Tag', required: true },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
              {
                name: 'layout',
                widget: 'select',
                default: '../../layouts/GalleryPost.astro',
                options: [
                  { label: 'Gallery Post', value: '../../layouts/GalleryPost.astro' },
                ],
              },
            ],
          },
        ],
      },
    }),
  ],
});
