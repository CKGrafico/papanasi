import * as React from 'react';
import { useMemo, useState } from 'react';
import { Code, Column, Container, Row } from '../../packages/react/src';
import './customization.css';

type CustomizationProps = {
  css?: string;
  selector?: string;
  showCode?: boolean;
};

const templateCSS = (css, selector = '') => `/**
* You can edit this code, just click inside and modify it.
* Check all the variables at https://github.com/CKGrafico/papanasi/blob/main/styles/variables.css
**/

.docs-story ${selector} {
${css}
}
`;

const defaultCss = `
  --pa-color-basic-brightest: #ffffff;
  --pa-color-basic-darkest: #101116;
  --pa-color-primary-normal: #017aff;
  --pa-color-secondary-normal: #6c47ff;
  --pa-color-tertiary-normal: #f34971;

  /* ... */
`;

// TODO: Use our select in the future?
export function Customization(props: CustomizationProps) {
  const { css = defaultCss, showCode = true, selector = '' } = props;

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
      css: `/papanasi.css?${performance.now()}`
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
        <Column xs={'content'} className="customization__label">
          Choose a theme
        </Column>
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
      {css && selected !== 'none' && showCode && (
        <>
          <Row>
            <Column xs={'content'} className="customization__label">
              Customize CSS properties
            </Column>
          </Row>
          <Row>
            <Column xs={'fill'}>
              <Code onUpdate={onChangeCss} editable theme="github" code={templateCSS(css, selector)} language={'css'} />
            </Column>
          </Row>
        </>
      )}
    </Container>
  );
}
