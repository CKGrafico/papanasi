import React, { useMemo, useState } from 'react';
import { Column, Container, Row } from '../../packages/react';

// TODO: Use our select in the future?
export function Customization() {
  const [selected, setSelected] = useState('papanasi');

  const themes = [
    {
      name: 'None',
      value: 'none',
      css: ''
    },
    {
      name: 'Papanasi',
      value: 'papanasi',
      css: 'https://unpkg.com/@papanasi/react@0.1.6/dist/papanasi.css'
    }
  ];

  const stylePath = useMemo(() => themes?.find((x) => x.value === selected)?.css, [selected]);

  function onChangeSelect(event) {
    setSelected(event.target.value);
  }

  return (
    <Container>
      {stylePath && <link rel="stylesheet" type="text/css" href={stylePath} />}

      <Row>
        <Column xs={'content'}>Choose a theme</Column>
        <Column xs={'content'}>
          <select onChange={onChangeSelect} defaultValue={selected}>
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.name}
              </option>
            ))}
          </select>
        </Column>
      </Row>
    </Container>
  );
}
