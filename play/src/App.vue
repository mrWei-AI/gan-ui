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
</script>

<template>
<!--  :offset= "2"-->
<!--  :push= "3"-->
<!--  :pull= "4"-->
  <div class="apppppppppppppppppappppppppppp">
    <GConfigProvider :componentSize='size'>
      <GRow :span="1" :gutter="20" gutterType="padding">
        <GCol :span="2"
              :xs= "5"
              :sm= "6"
              :md= "7"
              :lg= "8"
              :xl= "9">asd</GCol>
        <GCol :span="2"
              :xs= "5"
              :sm= "6"
              :md= "7"
              :lg= "8"
              :xl= "9">asd</GCol>

      </GRow>

    </GConfigProvider>

    <button @click="_click">App</button>
  </div>
</template>
