export default defineBackground(() => {
  console.log("Hello background!", { id: browser.runtime.id });

  browser.runtime.onConnect.addListener((port) => {
    console.log("Popup opened");

    port.onDisconnect.addListener(() => {
      console.log("Popup closed");
    });
  });
});
