<script setup>

</script>

<template>
  <div class="containers">
    <template v-for="n in 3" :key="n">
      <div class="post w-100">
        <div class="avatar"></div>
        <div class="d-grid align-items-center">
          <div class="line w-100"></div>
          <div class="line w-50"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
body {
  margin: 0;
}

.containers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2%;
}

.post {
  width: 220px;
  height: 80px;
  margin-bottom: 16px;
}

.post .avatar {
  float: left;
  width: 52px;
  height: 52px;
  background-color: #ccc;
  border-radius: 50%;
  margin: 8px;
  background-image: linear-gradient(90deg, #ddd 0px, #fff 40px, #ddd 80px);
  background-size:300%; /* Increase background size for smoother transition */
  animation: shine-avatar 3s infinite linear; /* Use ease-in-out for smoother animation */
}

.post .line {
  float: left;
  width: 140px;
  height: 16px;
  margin-top: 12px;
  border-radius: 7px;
  background-image: linear-gradient(100deg, #ddd 0px, #fff 40px, #ddd 80px);
  background-size: 300%; /* Increase background size for smoother transition */
  animation: shine-lines 7s infinite linear; /* Use ease-in-out for smoother animation */
}

.post .avatar + .line {
  margin-top: 11px;
  width: 100px;
}

.post .line ~ .line {
  background-color: #ddd;
}

@keyframes shine-lines {
  100% {
    background-position: -200%;
  }
  0% {
    background-position: 200%;
  }
}

@keyframes shine-avatar {
  100% {
    background-position: -200%;
  }
  0% {
    background-position: 200%;
  }
}

.dark .post .line {
  background-color: #333;
}

.dark .post .avatar {
  background-image: linear-gradient(100deg, #333 0px, #444 40px, #333 80px);
}

.dark .post .line ~ .line {
  background-color: #858484;
}
.dark .post .line {
  background-color: #838383;
  background-image:linear-gradient(100deg, #333 0px, #444 40px, #333 80px);
}
</style>
