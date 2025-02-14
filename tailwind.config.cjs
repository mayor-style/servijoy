/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
	  extend: {
		backgroundImage: {
		  hero: "url('/assets/imgs/hero_2.webp')",
		},
		keyframes: {
		  glow: {
			'0%': { opacity: 0 },
			'50%': { textShadow: '0 0 10px #ffffff' },
			'100%': { opacity: 1, textShadow: 'none' },
		  },
		},
		animation: {
		  glow: 'glow 3s ease-in-out',
		  glow_fast: 'glow 1s ease-in-out',
		},
		screens: {
		  xs: "480px",
		  xss: "360px",
		},
		fontFamily: {
		  header: ['Poppins', 'sans-serif'],
		  subheading: ['Manrope', 'sans-serif'],
		  body: ['Manrope', 'sans-serif'],
		},
		colors: {
		  green: '#38A169',
		  "soft-white": "#F8FAFC",
		  "light-gray": "#F3F4F6",
		  sidebar: {
			DEFAULT: 'hsl(var(--sidebar-background))',
			foreground: 'hsl(var(--sidebar-foreground))',
			primary: 'hsl(var(--sidebar-primary))',
			'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
			accent: 'hsl(var(--sidebar-accent))',
			'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
			border: 'hsl(var(--sidebar-border))',
			ring: 'hsl(var(--sidebar-ring))',
		  },
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)',
		},
	  },
	},
	plugins: [require("daisyui"),
		require('tailwind-scrollbar'),
		require("tailwindcss-animate")],
	daisyui: {
	  themes: [
		{
		  servijoy: {
			"primary": "#38A169",
			"primary-focus": "#2f855a",
			"primary-content": "#ffffff",
			"secondary": "#38A169",
			"accent": "#38A169",
			"neutral": "#1f2937",
			"base-100": "#F8FAFC",
			"info": "#3ABFF8",
			"success": "#36D399",
			"warning": "#FBBD23",
			"error": "#F87272",
		  },
		},
	  ],
	},
  };
  