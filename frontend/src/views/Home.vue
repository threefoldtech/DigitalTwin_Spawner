<template>
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <h1>digitalTwin</h1>
    <img height="200" src="@/assets/threefold_registered.png" alt="" />
    <br />
    <h3>Start your digitalTwin journey</h3> <br />
    <br />
    <div
      style="background:#fff; padding:2rem; border-radius: 1rem; box-shadow: 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);">
      <div>
        Please enter your <strong>ThreeFold Connect</strong> name
      </div>
      <input
        v-model="name"
        type="text"
        pattern="[0-9a-zA-Z\.]"
        placeholder="johndoe"
      />

      <button
        class="fancyButton"
        style="margin-top: 20px;"
        @click="loginAndSpawn"
      >
        GO!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { spawn } from "@/service/spawnService";

export default defineComponent({
  setup() {
    const name = ref("");

    const loginAndSpawn = () => {
      const actualName = name.value.toLowerCase().trim().split(".3bot")[0];
      console.log("Going to login with username: ", actualName);
      spawn(actualName);
    };
    return {
      name,
      loginAndSpawn
    };
  }
});
</script>

<style type="text/css">
.fancyButton {
  border: none;
  color: white;
  background: darkslategray;
  margin-left: 1rem;
  padding: calc(0.5rem + 2px) 2rem;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}

.fancyButton:hover {
  background: lightslategray;
}

input {
  margin-top: 5px;
  padding: 0.5rem;
  min-width: 12rem;
  border-radius: 4px;
  border: 2px solid #ccc;
  font-weight: bold;
  font-size: 1.2rem;
  color: #555;
}

input::placeholder {
  color: #ccc;
}
</style>
