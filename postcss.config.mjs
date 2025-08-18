/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // Optional: Add any Tailwind CSS v4 specific options here
    },
    'autoprefixer': {},
  },
}

export default config
