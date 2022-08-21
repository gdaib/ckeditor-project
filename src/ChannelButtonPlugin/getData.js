// replace with your backend api
export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          channelId: "a",
          channelName: "a"
        },
        {
          channelId: "b",
          channelName: "b"
        },
        {
          channelId: "c",
          channelName: "c"
        }
      ]);
    }, 1000);
  });
};
