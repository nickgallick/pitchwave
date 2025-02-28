
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Custom colors
				pitchwave: {
					'50': '#f0faff',
					'100': '#e0f4fe',
					'200': '#bae7fd',
					'300': '#7dd5fc',
					'400': '#38befa',
					'500': '#0ca4eb',
					'600': '#0086cb',
					'700': '#0068a0',
					'800': '#005784',
					'900': '#073a56',
					'950': '#04243c',
				},
				investor: {
					'50': '#fff8ed',
					'100': '#ffefd6',
					'200': '#ffdca8',
					'300': '#ffc06a',
					'400': '#ff9a34',
					'500': '#ff7d0a',
					'600': '#ff6600',
					'700': '#cc4902',
					'800': '#a13a0b',
					'900': '#82330c',
					'950': '#461604',
				},
				dark: {
					'900': '#121212',
					'800': '#1E1E1E',
					'700': '#2D2D2D',
					'600': '#3D3D3D',
					'500': '#5A5A5A',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(10px)" }
				},
				"scale-in": {
					"0%": { transform: "scale(0.95)", opacity: "0" },
					"100%": { transform: "scale(1)", opacity: "1" }
				},
				"scale-out": {
					from: { transform: "scale(1)", opacity: "1" },
					to: { transform: "scale(0.95)", opacity: "0" }
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-in-left": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" }
				},
				"slide-out-left": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" }
				},
				"slide-out-right": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(100%)" }
				},
				"pulse": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"scale-out": "scale-out 0.2s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"slide-in-left": "slide-in-left 0.3s ease-out",
				"slide-out-left": "slide-out-left 0.3s ease-out",
				"slide-out-right": "slide-out-right 0.3s ease-out",
				"pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
