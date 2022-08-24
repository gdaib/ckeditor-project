import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";

import { getData } from "./getData";

export async function getDropdownItemsDefinitions() {
  const list = await getData();
  const itemDefinitions = new Collection();

  const items = list.map((data) => {
    return {
      type: "button",
      model: new Model({
        commandParam: data,
        label: data.channelName,
        withText: true
      })
    };
  });

  itemDefinitions.addMany(items);

  return itemDefinitions;
}
