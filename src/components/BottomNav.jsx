import React from "react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="flex justify-around">
        {/* Home Icon */}
        <div className="flex flex-col items-center p-2">
          <div className="p-4  group border-t-2 hover:border-blue-500 ">
            <svg
              className="w-8 h-8 text-gray-700 group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </div>
        </div>
        {/* Profile Icon */}
        <div className="flex flex-col items-center p-2">
          <div className="p-4  group border-t-2 hover:border-blue-500 ">
            <svg
              className="w-8 h-8 text-gray-700 group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        {/* Create Icon */}
        <div className="flex flex-col items-center p-2">
          <div className="p-4  group border-t-2 hover:border-blue-500  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-gray-700 group-hover:text-blue-500"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Latest Icon */}
        <div className="flex flex-col items-center p-2">
          <div className="p-4  group border-t-2 hover:border-blue-500 ">
            <svg
              className="w-8 h-8 text-gray-700 group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h2v-2H7v2zm0 4h2v-2H7v2zm0-8h2V7H7v2zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2V7h-2v2zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2V7h-2v2zm4 4h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2V7h-2v2z" />
            </svg>
          </div>
        </div>
        {/* Settings Icon */}
        <div className="flex flex-col items-center p-2">
          <div className="p-4  group border-t-2 hover:border-blue-500 ">
            <svg
              className="w-8 h-8 text-gray-700 group-hover:text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.14 12.94c.04-.32.06-.66.06-1s-.02-.68-.06-1l2.03-1.58c.18-.14.23-.41.12-.62l-1.92-3.32c-.11-.21-.36-.28-.57-.22l-2.39.96c-.49-.38-1.02-.7-1.58-.93l-.36-2.49c-.04-.23-.23-.39-.46-.39h-3.84c-.23 0-.42.16-.46.39l-.36 2.49c-.56.23-1.09.55-1.58.93l-2.39-.96c-.21-.06-.45.01-.57.22L2.69 9.74c-.11.21-.06.48.12.62l2.03 1.58c-.04.32-.06.66-.06 1s.02.68.06 1l-2.03 1.58c-.18.14-.23.41-.12.62l1.92 3.32c.11.21.36.28.57.22l2.39-.96c.49.38 1.02.7 1.58.93l.36 2.49c.04.23.23.39.46.39h3.84c.23 0 .42-.16.46-.39l.36-2.49c.56-.23 1.09-.55 1.58-.93l2.39.96c.21.06.45-.01.57-.22l1.92-3.32c.11-.21.06-.48-.12-.62l-2.03-1.58zm-7.14 3.56c-1.95 0-3.53-1.58-3.53-3.53s1.58-3.53 3.53-3.53 3.53 1.58 3.53 3.53-1.58 3.53-3.53 3.53z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
