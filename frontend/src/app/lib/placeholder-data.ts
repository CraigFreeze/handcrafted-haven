import { v4 as uuidv4 } from 'uuid';

export const users = [
  {
    id: '9a1b7f20-2d64-4db9-9ef2-d42a1b7a1e70',
    email: 'user1@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    id: 'f512de3b-9d7d-4387-bb63-9f7c9e4c4318',
    email: 'user2@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    id: 'b42d2e20-1055-4c71-99ef-c137c5b6d0c3',
    email: 'artisan1@example.com',
    password: 'securepass1',
    role: 'artisan',
  },
  {
    id: 'a32d3bb3-fc45-4cb0-a8de-6f8aa1243f5a',
    email: 'artisan2@example.com',
    password: 'securepass2',
    role: 'artisan',
  },
  {
    id: 'f128899d-3d3f-4f59-8bfe-6bcae95a7886',
    email: 'artisan3@example.com',
    password: 'securepass3',
    role: 'artisan',
  },
];
export const products = [
  {
    id: '7e5f3878-f4fd-4b6d-89f3-dc9156b69e3e',
    user_id: 'b42d2e20-1055-4c71-99ef-c137c5b6d0c3',
    category: 'Jewelry',
    price: 49.99,
    description: 'Elegant handmade silver necklace',
    image_url: 'https://via.placeholder.com/150',
  },
  {
    id: 'b894fd86-c285-4179-9a32-c9b60b0c4c0d',
    user_id: 'b42d2e20-1055-4c71-99ef-c137c5b6d0c3',
    category: 'Home Decor',
    price: 29.99,
    description: 'Minimalist wall art print',
    image_url: 'https://via.placeholder.com/150',
  },
  {
    id: 'd11c07ef-4f17-45b8-8011-4a27e2b91c3d',
    user_id: 'a32d3bb3-fc45-4cb0-a8de-6f8aa1243f5a',
    category: 'Fashion',
    price: 59.99,
    description: 'Upcycled denim jacket',
    image_url: 'https://via.placeholder.com/150',
  },
  {
    id: 'f779c59d-b83b-4f69-a28a-469ad779fefa',
    user_id: 'a32d3bb3-fc45-4cb0-a8de-6f8aa1243f5a',
    category: 'Ceramics',
    price: 39.99,
    description: 'Hand-thrown clay mug set',
    image_url: 'https://via.placeholder.com/150',
  },
  {
    id: '6f6c86ee-4b16-4468-9759-7efcb0c8d4be',
    user_id: 'f128899d-3d3f-4f59-8bfe-6bcae95a7886',
    category: 'Stationery',
    price: 14.99,
    description: 'Custom-designed notebook pack',
    image_url: 'https://via.placeholder.com/150',
  },
];

export const ratings = [
  {
    id: 'a9b5b2ef-9d93-4f4a-8f4f-3acfa7e0a672',
    user_id: '9a1b7f20-2d64-4db9-9ef2-d42a1b7a1e70',
    product_id: '7e5f3878-f4fd-4b6d-89f3-dc9156b69e3e',
    title: 'Beautiful necklace!',
    review: 'Looks amazing, perfect gift.',
    star_rating: 5,
    created_at: new Date('2024-01-10').toISOString(),
  },
  {
    id: '4fe2c901-45a1-4458-a91b-c9b918a124bc',
    user_id: 'f512de3b-9d7d-4387-bb63-9f7c9e4c4318',
    product_id: 'b894fd86-c285-4179-9a32-c9b60b0c4c0d',
    title: 'Looks great',
    review: 'Nice wall piece for the office.',
    star_rating: 4,
    created_at: new Date('2024-02-14').toISOString(),
  },
  {
    id: '61c1ad43-6e8e-4cfc-95c0-b8c38272d3f4',
    user_id: '9a1b7f20-2d64-4db9-9ef2-d42a1b7a1e70',
    product_id: 'd11c07ef-4f17-45b8-8011-4a27e2b91c3d',
    title: 'Love it!',
    review: 'Stylish and sustainable.',
    star_rating: 5,
    created_at: new Date('2024-03-01').toISOString(),
  },
  {
    id: 'f3ebfb3a-e2d3-4e51-91c2-d42c749157f5',
    user_id: 'f512de3b-9d7d-4387-bb63-9f7c9e4c4318',
    product_id: 'f779c59d-b83b-4f69-a28a-469ad779fefa',
    title: 'Perfect mugs',
    review: 'Cozy feel, nice craftsmanship.',
    star_rating: 5,
    created_at: new Date('2024-03-12').toISOString(),
  },
  {
    id: 'b3d9e332-68c4-46ae-97cc-0a2a9d5122e9',
    user_id: '9a1b7f20-2d64-4db9-9ef2-d42a1b7a1e70',
    product_id: '6f6c86ee-4b16-4468-9759-7efcb0c8d4be',
    title: 'Cute design',
    review: 'Fun for journaling!',
    star_rating: 4,
    created_at: new Date('2024-04-18').toISOString(),
  },
];