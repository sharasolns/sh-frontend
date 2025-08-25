<script setup>
import {ShModal} from '@iankibetsh/shframework'

const props = defineProps(['item','label'])

const showFillImage = () => {
  console.log('show image')
}
</script>

<template>
  <a :href="`#image${item.id}`" data-bs-toggle="modal" class="mx-auto" :data-bs-target="`#image${item.id}`">
    <img :src="item.image_url" alt="thumbnail" class="img-thumbnail cursor-pointer" @click="showFillImage(item.id)">
  </a>

  <sh-modal modal-size="lg" :modal-id="`image${item.id}`" centered="true" modal-title="Uploaded Image">
   <div class="mx-auto text-center">
     <img :src="item.image_url" alt="thumbnail"  class="fullImage text-center mx-auto"  >
   </div>
  </sh-modal>
</template>

<style scoped>
.img-thumbnail{
  width: 50px;
}
.fullImage{
  max-width: 700px;
}
@media screen and (max-width: 768px){
  .fullImage{
    max-width: 100%;
  }

}
</style>