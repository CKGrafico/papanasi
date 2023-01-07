import * as React from 'react';
import { useMemo, useState } from 'react';
import { Code, Column, Container, Row, useTooltipExtension } from '../../packages/react/src';
import './customization.css';

type CustomizationProps = {
  css?: string;
  selector?: string;
  showCode?: boolean;
  showSelect?: boolean;
  hidden?: boolean;
};

const templateCSS = (css, selector = '') => `/**
* You can edit this code, just click inside and modify it.
* Check all the variables at https://github.com/CKGrafico/papanasi/blob/main/src/styles/variables.css
**/

.docs-story ${selector} {${css.replace(/    /g, '  ')}}
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
  const { css = defaultCss, showCode = true, showSelect = true, selector = '', hidden = false } = props;

  const [selected, setSelected] = useState('papanasi');
  const [customCss, setCustomCss] = useState('');
  useTooltipExtension();

  const themes = [
    {
      name: 'Papanasi',
      value: 'papanasi',
      css: `/papanasi.css?${performance.now()}`
    },
    {
      name: 'Sketch',
      value: 'sketch',
      css: `/sketch.css?${performance.now()}`
    },
    {
      name: 'None',
      value: 'none',
      css: ''
    }
  ];

  const stylePath = useMemo(() => themes?.find((x) => x.value === selected)?.css, [selected]);

  function onSelectTheme(theme) {
    setSelected(theme);
  }

  function onChangeCss(text) {
    setCustomCss(text);
  }

  return (
    <>
      {stylePath && <link rel="stylesheet" type="text/css" href={stylePath} />}
      <style>{customCss}</style>

      {!hidden && (
        <Container className="customization">
          <Row className="customization__row">
            {showSelect && (
              <Column basic={3} className="customization__properties">
                <Row>
                  <Column className="customization__label">Choose a Theme</Column>
                </Row>
                <Row>
                  {themes.map((theme) => (
                    <Column basic={'content'} key={theme.value}>
                      <div className={`customization__theme ${selected === theme.value ? 'is-selected' : ''}`}>
                        <div
                          className={`customization__button`}
                          title={theme.name}
                          onClick={() => onSelectTheme(theme.value)}
                        >
                          {theme.name}
                        </div>
                      </div>
                    </Column>
                  ))}
                </Row>
              </Column>
            )}
            {css && selected !== 'none' && showCode && (
              <Column basic={8} className="customization__properties">
                <Row>
                  <Column className="customization__label">Edit CSS Variables</Column>
                </Row>
                <Row>
                  <Column>
                    <Code
                      onUpdate={onChangeCss}
                      editable
                      theme="github"
                      code={templateCSS(css, selector)}
                      language={'css'}
                    />
                  </Column>
                </Row>
              </Column>
            )}
          </Row>
        </Container>
      )}
    </>
  );
}
