import { onMount, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import Choices from 'choices.js';
import { classesToString } from '../../../helpers';
import { SharedProps } from '../../../models';
import './choice.css';

export type ChoiceProps = {
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Choice(props: ChoiceProps) {
  const choicesRef = useRef();

  const state = useStore({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (disabled, className) => {
      debugger;
      const cities = new Choices(choicesRef, { allowHTML: true });

      state.classes = classesToString(['pa-choice', [disabled, 'is-disabled'], className || '']);
    };

    setInitialProps(props.disabled, props.className);
  });

  return (
    <div className={state.classes}>
      <label ref="choicesRef">Cities</label>
      <select class="form-control" name="cities" id="cities">
        <option value="">Choose a city</option>
        <option value="Leeds">Leeds</option>
        <option value="Manchester">Manchester</option>
        <option value="London">London</option>
        <option value="Sheffield">Sheffield</option>
        <option value="Newcastle">Newcastle</option>
      </select>
    </div>
  );
}
