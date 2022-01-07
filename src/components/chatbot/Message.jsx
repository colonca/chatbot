import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/components/chatbot.css';

function Message({ own, content }) {
  return (
    <div className={`message ${own ? 'own' : ''} `}>
      {!own && (
        <div className="rounded-full bg-blue-200  text-white p-2 h-10 w-10 flex items-center justify-center">
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
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
        </div>
      )}
      <div className="w-10/12">
        {content.map((message) => (
          <div className="message__content">{message}</div>
        ))}
      </div>
    </div>
  );
}

Message.prototype = {
  own: PropTypes.bool.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Message;
