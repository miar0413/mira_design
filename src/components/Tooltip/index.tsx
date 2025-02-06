import React, { ReactNode, useState } from 'react';

interface IProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<IProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => setVisible(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 text-xs text-white bg-gray-800 rounded">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
