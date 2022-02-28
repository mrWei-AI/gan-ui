import type { ComputedRef, UnwrapRef } from 'vue'
import { computed, inject } from 'vue'
import { ConfigProviderProps, defaultConfigProvider, SizeType } from '../components/config-provider/src'

export default (
  name: string,
  props: Record<any, any>,
): {
  configProvider: UnwrapRef<ConfigProviderProps>;
  prefixCls: ComputedRef<string>;
  size: ComputedRef<SizeType>;
} => {

  const configProvider = inject<UnwrapRef<ConfigProviderProps>>('configProvider', defaultConfigProvider)
  const prefixCls = computed(() => configProvider.getPrefixCls!(name, props.prefixCls))
  const size = computed(() => props.size ?? configProvider.componentSize)
  return {
    configProvider,
    prefixCls,
    size,
  }
}
