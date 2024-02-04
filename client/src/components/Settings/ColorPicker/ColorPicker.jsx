import React, { useState } from 'react';
import { PopoverPicker } from './PopoverPicker';
import './styles.css';

const ColorPicker = ({ color, setColor }) => {
  return <PopoverPicker color={color} onChange={setColor} />;
};

export default ColorPicker;
