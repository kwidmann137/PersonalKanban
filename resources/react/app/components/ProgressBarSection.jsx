import React from 'react';

const sectionStyle = (color, width, zDepth) => {
  let lighterColor = LightenColor(color, 20);
  return {
    position: 'absolute',
    backgroundColor: '#' + color,
    backgroundImage: 'linear-gradient(to bottom, #' + lighterColor + ', #' + color + ')',
    height: '100%',
    zIndex: zDepth,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    width: width + '%',
  }
};

const LightenColor = (color, percent) => {
  let num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;

  return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};

const ProgressBarSection = ({color, width, zDepth}) => (
  <div style={Object.assign({}, sectionStyle(color, width, zDepth))}/>
);

export default ProgressBarSection;
