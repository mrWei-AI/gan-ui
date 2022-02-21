import type { CSSProperties } from 'vue';
import type { VueTypeValidableDef, VueTypesInterface } from 'vue-types';
import { createTypes } from 'vue-types';
import type { VueNode } from './types';

const PropTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  array: undefined,
  object: undefined,
  integer: undefined,
});

PropTypes.extend([
  {
    name: 'looseBool',
    getter: true,
    type: Boolean,
    default: undefined,
  },
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: 'VNodeChild',
    getter: true,
  },
]);

export default PropTypes as VueTypesInterface & {
  readonly looseBool: VueTypeValidableDef<boolean>;
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
};
