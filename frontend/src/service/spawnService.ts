import { login } from "@/service/authService";
import axios from "axios";

export const spawn = async (name: string) => {
  // Login is no longer needed in this step, this does cause infinite container spawning and creating containers in the name of other users.
  // await login(name);

  // Dirty workaround to fix logging in in 1 go. This causes the issue that u can create any container with any name without verification.

  console.log("Posting to /api/v1/spawn with name:", name);
  const response = await axios.post("/api/v1/spawn", {
    name,
  });
  console.log(response);

  window.location.href = response.data?.redirectUrl;
};
