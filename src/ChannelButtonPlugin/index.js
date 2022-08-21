import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import {
  toWidget,
  toWidgetEditable
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

import { useSelect } from "./utils";

const ChannelButtonName = "channelButton";
const channelText = "channelText";
const ChannelNameKey = "channelName";
const ChannelIdKey = "channelId";

const NameMap = {
  ChannelButtonName,
  ChannelNameKey,
  ChannelIdKey,
  channelText
};

export class ChannelButtonPlugin extends Plugin {
  static get requires() {
    return [ChannelButtonEditing, SelectDialogUI];
  }
}

class SelectDialogUI extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("select-dialog", (locale) => {
      const buttonView = new ButtonView(locale);

      const icon = `<svg style="width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>`;

      buttonView.set({
        icon: icon,
        withText: true
      });

      buttonView.on("execute", async () => {
        const { value: channelId, label: channelName } = await useSelect();

        editor.model.change((writer) => {
          const button = createChannelButton(writer, {
            name: channelName,
            id: channelId
          });
          editor.model.insertContent(button);
        });
      });

      return buttonView;
    });
  }
}

class ChannelButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register(NameMap.ChannelButtonName, {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,

      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: "$block"
    });

    schema.register(NameMap.channelText, {
      // Cannot be split or left by the caret.
      isLimit: true,

      allowIn: NameMap.ChannelButtonName,

      allowContentOf: "$block"
    });

    schema.register(NameMap.ChannelIdKey, {
      allowWhere: "$text",
      allowAttributes: true,
      allowIn: NameMap.ChannelButtonName
    });

    schema.register(NameMap.ChannelNameKey, {
      allowWhere: "$text",
      allowAttributes: true,
      allowIn: NameMap.ChannelButtonName
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      model: NameMap.ChannelButtonName,
      view: {
        name: "div",
        classes: "dropdown-item button aBuyChannel"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: NameMap.ChannelButtonName,
      view: {
        name: "div",
        classes: "dropdown-item button aBuyChannel"
      }
    });
    conversion.for("editingDowncast").elementToElement({
      model: NameMap.ChannelButtonName,
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement("div", {
          class: "dropdown-item button aBuyChannel"
        });

        return toWidget(div, viewWriter);
      }
    });

    conversion.for("upcast").elementToElement({
      model: NameMap.channelText,
      view: {
        name: "span"
      }
    });
    conversion.for("dataDowncast").elementToElement({
      model: NameMap.channelText,
      view: {
        name: "span"
      }
    });
    conversion.for("editingDowncast").elementToElement({
      model: NameMap.channelText,
      view: (modelElement, { writer: viewWriter }) => {
        // Note: You use a more specialized createEditableElement() method here.
        const span = viewWriter.createEditableElement("span");

        return toWidgetEditable(span, viewWriter);
      }
    });

    conversion.elementToElement({
      model: NameMap.ChannelIdKey,
      view: {
        name: "span",
        classes: "channel-id",
        attributes: true,
        styles: {
          display: "none"
        }
      }
    });
    conversion.elementToElement({
      model: NameMap.ChannelNameKey,
      view: {
        name: "span",
        classes: "channel-name",
        attributes: true,
        styles: {
          display: "none"
        }
      }
    });
  }
}

function createChannelButton(writer, { id, name }) {
  console.log({ id, name }, "{ value, name }");
  const channelButton = writer.createElement(NameMap.ChannelButtonName);
  const buttonText = writer.createElement(NameMap.channelText);

  const buttonName = writer.createElement(NameMap.ChannelNameKey);
  writer.append(writer.createText(name), buttonName);

  const buttonId = writer.createElement(NameMap.ChannelIdKey);
  writer.append(writer.createText(id), buttonId);

  writer.append(buttonText, channelButton);
  writer.append(buttonName, channelButton);
  writer.append(buttonId, channelButton);

  writer.append(writer.createText("Buy Me Now"), buttonText);

  return channelButton;
}
