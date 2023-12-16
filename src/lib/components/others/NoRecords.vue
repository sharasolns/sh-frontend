<script setup>

</script>

<template>
<div class="callout callout-info">
  <slot>
    No records found
  </slot>
</div>
</template>

<style scoped>
.callout{
  --bs-link-color-rgb: 110,168,254;
  --bs-code-color: #e685b5;
  padding: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--bd-callout-color, inherit);
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}
.callout-info{
  --bd-callout-color: var(--bs-info-text-emphasis);
  --bd-callout-bg: var(--bs-info-bg-subtle);
  --bd-callout-border: var(--bs-info-border-subtle);
}
</style>
