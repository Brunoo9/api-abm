import React from 'react';

const Alerta = ({children}) => {
  return(
      <div className='text-red-500 mb-3 font-bold'>
          {children}
      </div>
  )
};

export default Alerta;
