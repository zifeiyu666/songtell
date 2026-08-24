// https://fonts.google.com/

import { Bangers, Carter_One, Gasoek_One, Geist, Karla, Pacifico } from 'next/font/google'

export const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const carterOne = Carter_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const gasoekOne = Gasoek_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const pacifico = Pacifico({
  weight: "400",
  display: "swap",
  preload: false,
})

export const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
})
