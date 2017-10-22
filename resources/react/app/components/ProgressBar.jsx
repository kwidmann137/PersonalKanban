import React from 'react';

const styles = {
  done: {
    position: 'absolute',
    backgroundColor: '#50B762',
    backgroundImage: 'linear-gradient(to bottom, #50B762, #258738)',
    height: '100%',
    zIndex: 10,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px'
  },
  inProgress: {
    position: 'absolute',
    backgroundColor: '#FCD74C',
    backgroundImage: 'linear-gradient(to bottom, #FCD74C, #fcb14c)',
    height: '100%',
    zIndex: 5,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px'
  },
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
    <p>Your Progress</p>
    <div style={styles.default}>
      {children}
    </div>
  </div>
);

export default ProgressBar;
