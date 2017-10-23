import React from 'react';

const styles = {
  default: {
    height: '20px',
    width: '80%',
    margin: '0 auto',
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: "#eee"
  }
};

const ProgressBar = ({children}) => (
  <div style={{width: '100%', textAlign: 'center'}}>
    <p>Today's Progress</p>
    <div style={styles.default}>
      {children}
    </div>
  </div>
);

export default ProgressBar;
