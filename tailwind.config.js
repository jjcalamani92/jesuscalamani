/** @type {import('tailwindcss').Config} */
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textColor: {
        cris: {
          inverted: withOpacity('--fill-color'),

          dark: withOpacity('--dark-primary-color'),
          primary: withOpacity('--primary-text'),
          secondary: withOpacity('--secondary-text'),
          accent: withOpacity('--accent-color'),

          base: withOpacity('--primary-text'),
        },
        
      },
      backgroundColor: {
        cris: {
          dark: withOpacity('--dark-primary-color'),
          light: withOpacity('--light-primary-color'),
          fill: withOpacity('--fill-color'),
          accent: withOpacity('--accent-color'),
          primary: withOpacity('--primary-color'),
          inverted: withOpacity('--primary-text'),
          card: withOpacity('--card-color'),
          'card-muted': withOpacity('--card-muted-color'),

          
        },
        
        transparent: 'transparent',

        
      },
      outlineColor: {
        cris: {
          fill: withOpacity('--accent-color'),
        },
        transparent: 'transparent',

      },
      borderColor: {
        cris: {
          dark: withOpacity('--dark-primary-color'),
          line: withOpacity('--light-primary-color'),
          fill: withOpacity('--primary-text'),
          accent: withOpacity('--accent-color'),
        },
        
        transparent: 'transparent',
        
      },
      fill: {
        cris: {
          base: withOpacity('--primary-text'),
          accent: withOpacity('--accent-color'),
        },
        
        transparent: 'transparent',
      },
      ringColor: {
        cris: {
          dark: withOpacity('--dark-primary-color'),
          light: withOpacity('--light-primary-color'),
          accent: withOpacity('--accent-color'),
        },
        transparent: 'transparent',

      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
