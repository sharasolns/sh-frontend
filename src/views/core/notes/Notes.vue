<script setup>

import ShTable from "@/lib/components/ShTable.vue";
</script>
<template>
    <div class="max-2">
        <h5>Notes</h5>
        <div class="card shadow rounded">
            <div class="card-body">
                <sh-table :has-range="true" :end-point="`notes/list`" :headers="['id','title','note','created_at']"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>