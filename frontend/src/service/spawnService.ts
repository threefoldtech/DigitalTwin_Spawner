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
    console.log(response.status)
    if (!response.data?.success) {
      console.log(
        "Spawn went wrong, redirecting the use anyways, since the container most-likely already exists."
      );
    }

    console.log('url', response.data?.redirectUrl)
    // const respi = await axios.get(response.data?.redirectUrl + "/api/healthcheck");
    // console.log(respi)

    setTimeout(function () {

      window.location.href = response.data?.redirectUrl;

    }, 500)
    console.log('done waiting')

    window.location.href = response.data?.redirectUrl;


    // window.location.href = `https://${name}.digitaltwin.jimbertesting.be` // todo change to  `https://${name}.${process.env.DIGITALTWIN_APPID}`
    return;
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
