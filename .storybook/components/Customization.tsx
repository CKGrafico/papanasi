import React, { useState } from 'react';
import { Container } from '../../packages/react';

// TODO: Use our select in the future?
export function Customization() {
  const [selected, setSelected] = useState('default');

  const themes = [
    {
      name: 'None',
      value: 'none',
      css: ''
    },
    {
      name: 'Default',
      value: 'default',
      css: '../styles/storybook.css'
    }
  ];

  function onChangeSelect(event) {
    setSelected(event.target.value);
  }

  return (
    <Container>
      <select onChange={onChangeSelect}>
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value} selected={selected === theme.value}>
            {theme.name}
          </option>
        ))}
      </select>
    </Container>
  );
}
