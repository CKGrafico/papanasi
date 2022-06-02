import React, { useMemo, useState } from 'react';
import { Code, Column, Container, Row } from '../../packages/react';
import './customization.css';

type CustomizationProps = {
  css?: string;
};

const defaultCss = `.docs-story {
  /* Check all the variables at https://github.com/CKGrafico/papanasi/blob/main/styles/variables.css */
    --pa-breakpoint-xxs: 360px;
    --pa-breakpoint-xs: 640px;
    --pa-breakpoint-s: 768px;
    --pa-breakpoint-m: 1024px;
    --pa-breakpoint-l: 1280px;
    --pa-breakpoint-xl: 1440px;
    --pa-breakpoint-xxl: 1920px;

    --pa-color-basic-brightest: #ffffff;
    --pa-color-basic-darkest: #101116;
    --pa-color-primary-normal: #017aff;
    --pa-color-secondary-normal: #6c47ff;
    --pa-color-tertiary-normal: #f34971;

  /* ... */
}
`;

// TODO: Use our select in the future?
export function Customization(props: CustomizationProps) {
  const { css = defaultCss } = props;

  const [selected, setSelected] = useState('papanasi');
  const [customCss, setCustomCss] = useState('');

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

  function onChangeCss(text) {
    setCustomCss(text);
  }

  return (
    <Container className="customization">
      {stylePath && <link rel="stylesheet" type="text/css" href={stylePath} />}
      <style>{customCss}</style>

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
      {css && selected !== 'none' && (
        <>
          <Row>
            <Column xs={'content'}>Customize CSS properties</Column>
          </Row>
          <Row>
            <Column xs={'fill'}>
              <Code
                className="customization__code"
                onChange={onChangeCss}
                language="css"
                editable
                theme="tomorrow-night-bright"
              >
                {css}
              </Code>
            </Column>
          </Row>
        </>
      )}
    </Container>
  );
}
