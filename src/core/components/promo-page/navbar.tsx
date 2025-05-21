import { Link } from "@tanstack/react-router"
import { buttonVariants } from "../ui/button"
import React from "react"
import Logo from '@/assets/logo.svg?react'

export const PromoNavbar: React.FC = () => {
  const links = ['Features', 'Pricing', 'Newsletter']

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8 2xl:max-w-[1400px] flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold">GatherFlow</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <a key={index} href={`#${link.toLowerCase()}`} className="text-sm font-medium hover:text-primary">
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link className={buttonVariants({ variant: 'outline', size: 'sm'})} to="/login">
            Log in
          </Link>
          <Link className={buttonVariants({ size: 'sm' })} to="/signup">Sign up</Link>
        </div>
      </div>
    </header>
  )
}
