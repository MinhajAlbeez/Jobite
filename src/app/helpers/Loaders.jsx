import React from 'react';

const CircularLoader = ({ variant = 'border', size = 'md', color = 'white' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    white: {
      primary: 'border-white',
      secondary: 'border-white/20',
      fill: 'bg-white'
    },
    black: {
      primary: 'border-gray-900',
      secondary: 'border-gray-900/20',
      fill: 'bg-gray-900'
    },
    blue: {
      primary: 'border-blue-500',
      secondary: 'border-blue-500/20',
      fill: 'bg-blue-500'
    }
  };

  const variants = {
    // Classic border spinner
    border: (
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-2
          border-t-transparent
          ${colorClasses[color].primary}
        `}
      />
    ),

    // Double border spinner
    double: (
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-4
          border-double
          border-t-transparent
          ${colorClasses[color].primary}
        `}
      />
    ),

    // Split border spinner
    split: (
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            animate-spin
            rounded-full
            border-2
            ${colorClasses[color].secondary}
          `}
        />
        <div
          className={`
            absolute
            top-0
            ${sizeClasses[size]}
            animate-spin
            rounded-full
            border-2
            border-l-transparent
            border-r-transparent
            ${colorClasses[color].primary}
          `}
        />
      </div>
    ),

    // Dotted border spinner
    dotted: (
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-4
          border-dotted
          border-t-transparent
          ${colorClasses[color].primary}
        `}
      />
    ),

    // Progress spinner
    progress: (
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            rounded-full
            ${colorClasses[color].secondary}
          `}
        >
          <div
            className={`
              absolute
              top-0
              right-0
              bottom-0
              left-0
              animate-[progress-spin_2s_linear_infinite]
              rounded-full
              border-4
              border-t-transparent
              border-l-transparent
              ${colorClasses[color].primary}
            `}
            style={{
              clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%)'
            }}
          />
        </div>
      </div>
    ),

    // Dashed spinner
    dashed: (
      <div
        className={`
          ${sizeClasses[size]}
          animate-spin
          rounded-full
          border-4
          border-dashed
          border-t-transparent
          ${colorClasses[color].primary}
        `}
      />
    ),

    // Eclipse spinner
    eclipse: (
      <div className="relative">
        <div
          className={`
            ${sizeClasses[size]}
            animate-spin
            rounded-full
            ${colorClasses[color].secondary}
          `}
        >
          <div
            className={`
              absolute
              -top-1
              w-3
              h-3
              rounded-full
              ${colorClasses[color].fill}
            `}
          />
        </div>
      </div>
    ),
  };

  return (
    <div role="status" aria-label="Loading">
      {variants[variant]}
    </div>
  );
};

export default CircularLoader;