import React from 'react';

const ActivitySelector = ({ currentActivity, onActivitySelect }) => {
  return (
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
        Numeros y movimientos
      </button>
    </div>
  );
};

export default ActivitySelector;
