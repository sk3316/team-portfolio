# Assets Directory

This folder is located in `public/assets/` and is served statically by Next.js.

## How to Use:
1. Place your images (PNG, JPG, SVG, WebP, AVIF, etc.) directly in this directory or in `public/assets/images/`.
2. Reference them anywhere in your components, styles, or data files starting with `/assets/`:

### Example in React / Next.js:
```tsx
import Image from "next/image";

// Using Next.js Image component:
<Image 
  src="/assets/my-image.png" 
  alt="Description" 
  width={400} 
  height={300} 
/>

// Or standard <img>:
<img src="/assets/my-image.png" alt="Description" />
```

### Example in `data/portfolio-data.ts`:
```ts
avatarUrl: "/assets/arjun-mehta.jpg",
```
