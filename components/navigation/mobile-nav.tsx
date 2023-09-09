'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { cn } from "@/lib/utils"
import { NavItem } from '@/types/nav';
import { siteConfig } from '@/config/site';
import { Icons } from '../icons';

interface MainNavProps {
  items?: NavItem[]
}

export function MobileNav({ items }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-1 items-center justify-end w-full space-x-4">
        <button className="flex justify-end md:hidden" onClick={toggleNav}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div
          className={cn(`fixed top-0 left-0 h-full w-64 transition-all transform  ${
             isOpen ? 'translate-x-[-6.5%]' : '-translate-x-[120%]'} ease-in-out duration-300 md-hidden`)}
        >
          <div className="block md:hidden h-screen w-auto p-4 dark:bg-black bg-white transition-all duration-200 border-r border-stone-200">
            <div className="logo-mobile-nav mb-4">
              <Link href="/" className="flex items-center space-x-2">
                <Icons.logo/>
                <span className="inline-block font-bold">{siteConfig.name}</span>
              </Link>
            </div>
            {items?.length ? (
              <ul className="block md:hidden max-h-screen overflow-y-scroll">
                {items?.map(
                  (item, index) =>
                    item.href && (
                      <Link
                        key={index}
                        href={item.href}
                        className={cn(
                          "flex items-center text-sm font-medium text-muted-foreground",
                          item.disabled && "cursor-not-allowed opacity-80"
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                )}
              </ul>
            ) : null}
          </div>
        </div>
      </div >
    </>
  );
}