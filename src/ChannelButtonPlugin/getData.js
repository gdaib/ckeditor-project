// replace with your backend api
export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          channelId: "channel-name-a",
          channelName: "channel-a"
        },
        {
          channelId: "channel-name-b",
          channelName: "channel-b"
        },
        {
          channelId: "channel-name-c",
          channelName: "channel-c"
        }
      ]);
    }, 1000);
  });
};
