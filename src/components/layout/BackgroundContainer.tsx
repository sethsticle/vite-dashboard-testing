import React from 'react';

const BackgroundContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0F1235] to-[#2C1B5A] backdrop-blur-lg">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default BackgroundContainer;