<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'

//全局配置
let size = ref('')
const _click = () => {
  size.value=size.value=='large'?'small':'large'
}

//富文本
let container = ref(HTMLElement)

const focus = () => {

}
const blur = () => {
}

let data = [
    {name:'位云飞',age:32,height:'一米七八'},
    {name:'余靖雯',age:18,height:'一米三二'},
];
</script>

<template>
  <div class="apppppppppppppppppappppppppppp">
    <GConfigProvider :componentSize='size'>
      <GSelect></GSelect>
    </GConfigProvider>

    <button @click="_click">App</button>
  </div>
</template>
