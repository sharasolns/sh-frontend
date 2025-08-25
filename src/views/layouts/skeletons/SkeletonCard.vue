<script setup>

</script>

<template>
  <div class=" mt-3  rounded-3 opacity-7" >
    <div class="post w-95">
      <div class="avatar w-100 rounded-1 h-100"></div>
    </div>

    <div class="w-95 d-flex justify-content-between align-items-center">
      <div class="post w-50 ms-3">
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="post w-50">
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>


  </div>
</template>

<style scoped>
body {
  margin: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.post {
  width: 220px;
  height: 80px;
}
.post .avatar {
  float: left;
  width: 52px;
  height: 52px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 8px;
  background-image: linear-gradient(100deg, #ddd 0px, #fff 40px, #ddd 80px);
  background-size: 250%;
  animation: shine-avatar 2.5s infinite linear;
}
.post .line {
  float: left;
  width: 140px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(90deg, #ddd 0px, #fff 40px, #ddd 80px);
  background-size: 200%;
  animation: shine-lines 2s infinite linear;
}
.post .avatar + .line {
  margin-top: 11px;
  width: 100px;
}
.post .line ~ .line {
  background-color: #ddd;
}
.opacity-7 *{
  opacity: .8 !important;
}

@keyframes shine-lines {
  0% {
    background-position: -100px;
  }
  100% {
    background-position: 140px;
  }
}
@keyframes shine-avatar {
  100% {
    background-position: -100%;
  }
  0% {
    background-position: 100%;
  }
}

.dark .post .line{
  background-color: #333;
}
.dark .post .avatar{
  background-image: linear-gradient(100deg, #333 0px, #444 40px, #333 80px);
}
.dark .post .line ~ .line {
  background-color: #7c7c7c;
}
.dark .post .line{
  background-image: linear-gradient(100deg, #7c7c7c 0px, #333 40px, #7c7c7c 80px);
}
</style>