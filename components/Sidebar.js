import React from 'react';

const Sidebar = ({ currentLevel, onLevelSelect, levels }) => {
  return (
    <div className="sidebar">
      <div className="level-selector">
        <h3>Niveles</h3>
        {levels.map((level) => (
          <button
            key={level}
            className={`level-button ${currentLevel === level ? 'active' : ''}`}
            onClick={() => onLevelSelect(level)}
          >
            Nivel {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
