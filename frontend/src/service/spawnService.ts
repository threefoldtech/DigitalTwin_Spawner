import axios from "axios";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const spawn = async (name: string) => {
  console.log("Posting to /api/v1/spawn with name:", name);

  let endpoint = "/api/v1/spawn";

  if (process.env.VUE_APP_ENVIRONMENT === "development") {
    console.log("Running in development");
    endpoint = process.env.VUE_APP_ENDPOINT + "/api/v1/spawn";
  }

  console.log("Endpoint: ", endpoint);
  const response = await axios.post(endpoint, {
    name,
  });

  if (response.status === 200) {
    if (!response.data?.success) {
      console.log(
        "Spawn went wrong, redirecting the use anyways, since the container most-likely already exists."
      );
    }

    window.location.href = response.data?.redirectUrl;
  }

  // console.log("Endpoint: ", endpoint);
  // try {
  //   const response = await axios.post(endpoint, {
  //     name,
  //   });

  //   console.log("response: ", response);

  //   window.location.href = response.data?.redirectUrl;
  // } catch (err) {
  //   console.log("Container might already exist, forwarding anyways.");
  //   window.location.href = response.data?.redirectUrl;
  // }
};
