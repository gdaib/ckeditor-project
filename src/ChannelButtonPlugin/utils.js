import { getData } from "./getData";

export function useSelect() {
  return new Promise((resolve, reject) => {
    var d = dialog({
      title: "Please Select Channel",
      ok: function () {
        const e = document.querySelector("#my-select");
        var value = e.value;
        var text = e.options[e.selectedIndex].text;

        // need to return value/label
        // value is the channelId
        // label is the channelName
        resolve({
          value,
          label: text
        });
        return true;
      },
      cancel: function () {
        reject(false);
        return true;
      }
    });
    d.show();

    getData().then((list) => {
      window.channelList = list;
      d.content(`
          <select id="my-select" style="width:150px;">
          ${list.map(
            (item) =>
              `<option value="${item.channelId}">${item.channelName}</option>`
          )}

          </select>
      `);
    });
  });
}
