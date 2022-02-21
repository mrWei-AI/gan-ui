<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import GLoading from '../../packages/components/loading'




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
</script>

<template>
  <div class="apppppppppppppppppappppppppppp">
    <GConfigProvider :componentSize='size'>
      <g-button type="default">default</g-button>
      <g-button type="primary">primary</g-button>
      <g-button type="success" shape='circle2'>success</g-button>
      <g-button type="warning" shape='circle'>warning</g-button>
      <g-button type="danger">danger</g-button>
      <g-button type="gray">info</g-button>
      <g-button type="link">text</g-button>
    </GConfigProvider>

    <g-button type="default" size='large'>default</g-button>
    <g-button type="primary" size='large'>primary</g-button>
    <g-button type="success"  size='large'>success</g-button>
    <g-button type="warning"  size='large'>warning</g-button>
    <g-button type="danger"  size='large'>danger</g-button>
    <g-button type="gray" size='large'>info</g-button>

    {{ show }}
    <button @click="_click">App</button>
    <a href='wedoc://'>asdasdas</a>

    <div
      @focus='focus()'
      @blur='blur()'
      ref='container'
      contenteditable='true'
    style='border: 1px solid #ccc; margin-top: 100px;width: 500px;height: 500px'
    ></div>
  </div>
</template>
