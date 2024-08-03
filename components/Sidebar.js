import React from 'react';

const Sidebar = ({ currentLevel, onLevelSelect, levels }) => {
  return (
    <div className="sidebar">
      <h2>Actividades de Rehabilitación</h2>
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
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRight: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  levelButton: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
  },
  activeLevel: {
    backgroundColor: '#4ECDC4',
    color: 'white',
  },
};

export default Sidebar;
