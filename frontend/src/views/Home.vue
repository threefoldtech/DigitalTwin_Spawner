<template>
  <div>
    <h1>Digital Twin</h1>
    <img height="200" src="@/assets/threefold_registered.png" alt="" />
    <br />
    <span>Start your Digital Twin journey</span> <br />
    <br />
    <div>
      <div for="">
        Please enter your <strong>ThreeFold Connect</strong> name (without
        .3bot)
      </div>
      <input
        v-model="name"
        style="margin-top: 5px"
        type="text"
        name=""
        id=""
        @keyup.enter="loginAndSpawn"
      />
    </div>
    <button class="fancyButton" style="margin-top: 20px" @click="loginAndSpawn">
      GO!
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { spawn } from "@/service/spawnService";

export default defineComponent({
  setup() {
    const name = ref("");

    const loginAndSpawn = () => {
      console.log("Going to login with username: ", name.value);
      spawn(name.value);
    };

    return {
      name,
      loginAndSpawn,
    };
  },
});
</script>

<style type="text/css">
.fancyButton {
  border: none;
  color: white;
  background: darkslategray;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
}
.fancyButton:hover {
  background: lightslategray;
}
</style>
