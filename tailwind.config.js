/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: [
      "./src/**/*.{html,ts}"
   ],
   theme: {
      screens: {
         sm: '480px',
         md: '768px',
         lg: '976px',
         xl: '1200px',
         xxl: '1440px'
      },
      

      extend: {

         colors: {
            'white': '#FFFFFF',
            'black': '#000000',
            'grey': '#f0f0f0',

            'primary': '#da6700', 
            'primary-light': '#ebceb4',
            'blue': '#033B55',
            'blue-light': '#0E65A3',

            'darkmode-white':'#323232',
            'darkmode-black': '#c4c4c4',
            'darkmode-grey': '#1F1F21',

            'darkmode-blue':  '#2582c5' //#0E65A3'//'#286e8e'

         },

         fontFamily: {
            sans: ['Poppins', 'sans-serif'],
            serif: ['Red Hat Display', 'serif'],
         },

         letterSpacing: {
            tightest: '-.075em',
            tighter: '-.05em',
            tight: '-.025em',
            normal: '0.07px',
            wide: '.025em',
            wider: '.05em',
            widest: '.25em',
         },
         lineHeight: {
            sm: '20px',
            base: '22px',
            md: '26px',
            lg: '28px',
            xl: '30px',
            "2xl": '32px',
            "3xl": '44px',
            "4xl": '50px'
         },
         fontSize: {
            xs: "12px",
            sm: "14px",
            base: "16px",
            md: '18px',
            lg: "22px",
            xl: "24px",
            "2xl": "28px",
            "3xl": "42px",
            "4xl": "46px"
         },
},
   },
   plugins: [],
}

