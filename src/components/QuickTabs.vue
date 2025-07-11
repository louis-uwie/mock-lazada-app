<script></script>

<template>
  <a href="https://example.com/link1" target="_blank" class="card-link">
    <el-card class="clickable-card">
      <div class="card-content">
        <img
          src="https://img.lazcdn.com/us/domino/92419c5c-19b8-4f17-a88c-6c7e3745d9a4_PH-276-260.png_300x300q80.png_.avif"
          alt="Account Icon"
        />
        <b>My Account</b>
      </div>
      <p>Top Up, Pay Bills, Personal Settings, and more!</p>
    </el-card>
  </a>

  <a href="https://example.com/link2" target="_blank" class="card-link">
    <el-card class="clickable-card">
      <div class="card-content">
        <img
          src="https://img.lazcdn.com/us/domino/92419c5c-19b8-4f17-a88c-6c7e3745d9a4_PH-276-260.png_300x300q80.png_.avif"
          alt="Vouchers Icon"
        />
        <b>Vouchers</b>
      </div>
      <p>Save, Save, and more Save!</p>
    </el-card>
  </a>

  <a href="https://example.com/link3" target="_blank" class="card-link">
    <el-card class="clickable-card">
      <div class="card-content">
        <img
          src="https://img.lazcdn.com/us/domino/92419c5c-19b8-4f17-a88c-6c7e3745d9a4_PH-276-260.png_300x300q80.png_.avif"
          alt="Settings Icon"
        />
        <b>Settings</b>
      </div>
      <p>What should I do?</p>
    </el-card>
  </a>
</template>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 900;
  font-size: 36px;
}

.card-link {
  text-decoration: none;
  text-overflow: ellipsis;
  flex: 1 1 300px;
  max-width: 33%;
}

.clickable-card {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  border-radius: 20px;

  transition: all 0.3s ease-in-out;
}

.clickable-card:hover {
  transform: scale(1.02);
}

.clickable-card img {
  width: 40%;
  border-radius: 8px;
}

.card-content {
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
}
</style>
