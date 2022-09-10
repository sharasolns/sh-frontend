<template>
  <textarea id="tiny" style="display: none;" data-cy="tinymce_editor"></textarea>
  <div @focusin.stop class="sh-editor w-100">
    <editor class="tinyEditor"
            api-key="v5otxmculqf59xfg2bqr2ucw56cbqgbqo4x9gym2kwbv1rvi"
            @input="updateValue"
            @keyup="updateValue"
            v-model="value"
            :init="{
      selector: 'textarea#tiny',
      valid_children : '+body[style],+body[script]',
      extended_valid_elements : '*[*]',
      contextmenu: false,
      plugins: 'lists link image emoticons code autolink',
      toolbar: 'styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons code'
    }"
    />
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'ShEditor',
  props: ['modelValue'],
  components: {
    editor: Editor
  },
  data () {
    return {
      editorData: this.modelValue
    }
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  created () {
    document.addEventListener('focusin', function (e) {
      const closest = e.target.closest('.tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root')
      if (closest !== null && closest !== undefined) {
        e.stopImmediatePropagation()
      }
    })
  },
  mounted () {
    this.editorData = this.modelValue
  },
  methods: {
    updateValue: function () {
      // alert('paste')
    }
  }
}
</script>

<style>
:root {
  --ck-z-default: 10555 !important;
  --ck-z-modal: calc(var(--ck-z-default) + 999) !important;
}
.mceToolbar td {
  display:table-row;
  float: left;
}
.mceToolbar td:nth-of-type(11){
  clear: left;
}

@media screen and (max-width:600px) {
  .sh-editor{
    width: 100% !important;
  }
  table.mceLayout, textarea.tinyMCE {
    width: 100% !important;
  }
}
</style>
