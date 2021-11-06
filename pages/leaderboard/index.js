import React from 'react';

// components
import BoxerPreview from '../../components/page-components/gym/BoxerPreview/BoxerPreview';

const Leaderboard = (props) => {
  return (
    <div className='global-leaderboard-page'>
      <h1>Training center</h1>

      <BoxerPreview />
    </div>
  );
};

export default Leaderboard;
