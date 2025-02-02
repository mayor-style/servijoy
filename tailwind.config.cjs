/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
		backgroundImage: {
			hero:"url('/assets/imgs/flooring.webp')",
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
			glow_fast:'glow 1s ease-in-out',
		  },
		screens:{
			xs:"480px",
		  },
  		fontFamily: {
  			header: [
  				'Poppins',
  				'sans-serif'
  			],
  			subheading: [
  				'Manrope',
  				'sans-serif'
  			],
  			body: [
  				'Manrope',
  				'sans-serif'
  			]
  		},
  		colors: {
  			green: '#38A169',
			"soft-white":"#F8FAFC",
			"light-gray":"#F3F4F6",
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: ["light"], // Disable default themes to prevent color overrides
  },
};
{/* <div key={index} className={`card card-bordered glass shadow-lg hover:shadow-2xl transition-all ease-in-out  `}>
        <figure>
            <img
            src="../../assets/imgs/hero_2.jpg"
            alt="car!" />
        </figure>
        <div className="card-body ">
            <h2 className="card-title font-subheading">{service.title}</h2>
            <p>{`Experience the best ${service.title} service on ServiJoy!`}</p>
            <div className="card-actions justify-end">
                <Link className='font-semibold text-green'>Explore Services</Link>
           
            </div>
        </div>
            </div> */}