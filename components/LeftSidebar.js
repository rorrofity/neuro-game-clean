import React from 'react';

const LeftSidebar = ({ currentActivity, onActivitySelect }) => {
  return (
    <div className="sidebar left-sidebar">
      <h1 className="game-title" style={{backgroundColor: '#2B3A67', padding: '10px', borderRadius: '5px'}}>Actividades de Rehabilitación</h1>
      <div className="activity-selector">
        <button
          className={`activity-button ${currentActivity === 'arrows' ? 'active' : ''}`}
          onClick={() => onActivitySelect('arrows')}
        >
          Flechas y colores
        </button>
        <button
          className={`activity-button ${currentActivity === 'numbers' ? 'active' : ''}`}
          onClick={() => onActivitySelect('numbers')}
        >
          Números y movimientos
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
