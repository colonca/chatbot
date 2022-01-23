import React from 'react';
import '../assets/css/sidebar.css';

// components
import SidebarLink from '../components/SidebarLink';
import SidebarDropdown from '../components/SidebarDropdown';

function Sidebar() {
  return (
    <div className="sidebar bg-gray-50 w-68 flex-none flex flex-col  overflow-y-hiden">
      <div className="sidebar__logo flex justify-center mt-5">
        <img
          className="max-w-xs w-72 h-36"
          src="https://hotelwayaguajira.com/wp-content/uploads/2020/08/Waya-V.svg"
          alt="logo DAR"
        />
      </div>
      <div className="pt-12  flex flex-col items-start flex-grow overflow-y-auto">
        <SidebarDropdown
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
          title="Usuarios"
        >
          <SidebarLink
            link="password"
            title="Cambiar Contraseña"
            Linkactive={false}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </SidebarLink>
        </SidebarDropdown>
        <SidebarLink link="salir" title="Salir" linkactive={false}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </SidebarLink>
      </div>
    </div>
  );
}

export default Sidebar;
