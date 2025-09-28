'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  HomeIcon, 
  UserIcon, 
  BookmarkIcon, 
  ArrowRightOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { createClient } from '@/app/utils/supabase/client';

interface NavigationBarProps {
  className?: string;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ className = '' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  const router = useRouter();

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      label: 'Home'
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
      label: 'Profile'
    },
    {
      name: 'Saved Recipes',
      href: '/saved-recipe',
      icon: BookmarkIcon,
      label: 'Saved'
    }
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push('/auth/login');
    return;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Sponspaire
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {isCollapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                    active
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`w-6 h-6 flex-shrink-0 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'}`} />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className={`flex items-center w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 group`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 flex-shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
          {!isCollapsed && (
            <span className="ml-3 font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
