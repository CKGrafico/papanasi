import { ClassNames, Options } from 'choices.js';

export const sortByAlpha = ({ value, label = value }, { value: value2, label: label2 = value2 }): number =>
  label.localeCompare(label2, [], {
    sensitivity: 'base',
    ignorePunctuation: true,
    numeric: true
  });

export const DEFAULT_CLASSNAMES: ClassNames = {
  containerOuter: 'pa-choice__container',
  containerInner: 'pa-choice__inner',
  input: 'pa-choice__input',
  inputCloned: 'pa-choice__input--cloned',
  list: 'pa-choice__list',
  listItems: 'pa-choice__list--multiple',
  listSingle: 'pa-choice__list--single',
  listDropdown: 'pa-choice__list--dropdown',
  item: 'pa-choice__item',
  itemSelectable: 'pa-choice__item--selectable',
  itemDisabled: 'pa-choice__item--disabled',
  itemChoice: 'pa-choice__item--choice',
  placeholder: 'pa-choice__placeholder',
  group: 'pa-choice__group',
  groupHeading: 'pa-choice__heading',
  button: 'pa-choice__button',
  activeState: 'is-active',
  focusState: 'is-focused',
  openState: 'is-open',
  disabledState: 'is-disabled',
  highlightedState: 'is-highlighted',
  selectedState: 'is-selected',
  flippedState: 'is-flipped',
  loadingState: 'is-loading',
  noResults: 'has-no-results',
  noChoices: 'has-no-choices'
};

export const DEFAULT_CONFIG: Options = {
  items: [],
  choices: [],
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  addItems: true,
  addItemFilter: null,
  removeItems: true,
  removeItemButton: false,
  editItems: false,
  allowHTML: true,
  duplicateItemsAllowed: true,
  delimiter: ',',
  paste: true,
  searchEnabled: true,
  searchChoices: true,
  searchFloor: 1,
  searchResultLimit: 4,
  searchFields: ['label', 'value'],
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  sorter: sortByAlpha,
  placeholder: true,
  placeholderValue: null,
  searchPlaceholderValue: null,
  prependValue: null,
  appendValue: null,
  renderSelectedChoices: 'auto',
  loadingText: 'Loading...',
  noResultsText: 'No results found',
  noChoicesText: 'No choices to choose from',
  itemSelectText: 'Press to select',
  uniqueItemText: 'Only unique values can be added',
  customAddItemText: 'Only values matching specific conditions can be added',
  addItemText: (value) => `Press Enter to add <b>"${value}"</b>`,
  maxItemText: (maxItemCount) => `Only ${maxItemCount} values can be added`,
  valueComparer: (value1, value2) => value1 === value2,
  fuseOptions: {
    includeScore: true
  },
  labelId: '',
  callbackOnInit: null,
  callbackOnCreateTemplates: null,
  classNames: DEFAULT_CLASSNAMES
};

class ChoiceService {
  public options = {
    ...DEFAULT_CONFIG,
    classNames: {
      ...DEFAULT_CLASSNAMES,
      ...{
        containerOuter: 'pa-choice',
        containerInner: 'pa-choice__inner',
        input: 'pa-choice__input',
        inputCloned: 'pa-choice__input--cloned',
        list: 'pa-choice__list',
        listItems: 'pa-choice__list--multiple',
        listSingle: 'pa-choice__list--single',
        listDropdown: 'pa-choice__list--dropdown',
        item: 'pa-choice__item',
        itemSelectable: 'pa-choice__item--selectable',
        itemDisabled: 'pa-choice__item--disabled',
        itemChoice: 'pa-choice__item--choice',
        placeholder: 'pa-choice__placeholder',
        group: 'pa-choice__group',
        groupHeading: 'pa-choice__heading',
        button: 'pa-choice__button'
      }
    },
    allowHTML: true
  };
}

export const choiceService = new ChoiceService();
