/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */


// The editor creator to use.
import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

export default class ClassicEditor extends ClassicEditorBase {}

// import EasyImage from "@ckeditor/ckeditor5-easy-image/src/easyimage";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
import AutoImage from "@ckeditor/ckeditor5-image/src/autoimage";
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
// import FontColor from "@solomoto/ckeditor5-font-color/src/fontcolor";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import HtmlEmbed from "@ckeditor/ckeditor5-html-embed/src/htmlembed";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Link from "@ckeditor/ckeditor5-link/src/link";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import List from "@ckeditor/ckeditor5-list/src/list";
import ListStyle from "@ckeditor/ckeditor5-list/src/liststyle";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
// import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import RemoveFormat from "@ckeditor/ckeditor5-remove-format/src/removeformat";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import UnderlineEditing from "@ckeditor/ckeditor5-basic-styles/src/underline";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport";

// replace with your backend api
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          channelId: "a",
          channelName: "a",
        },
        {
          channelId: "b",
          channelName: "b",
        },
        {
          channelId: "c",
          channelName: "c",
        },
      ]);
    }, 1000);
  });
};

function useSelect() {
  return new Promise((resolve, reject) => {
    var d = dialog({
      title: "Please Select Channel",
      ok: function () {
        const e = document.querySelector("#my-select");
        var value = e.value;
        var text = e.options[e.selectedIndex].text;
        resolve({
          value,
          label: text,
        });
        return true;
      },
      cancel: function () {
        reject(false);
        return true;
      },
    });
    d.show();

    getData().then((list) => {
      console.log(list);
      window.channelList = list;
      console.log(window);
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
const ChannelButtonName = "channelButton";


class SelectDialog extends Plugin {
  init() {
    const editor = this.editor;
    this._defineSchema();
    this._defineConverters();

    // The button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add("select-dialog", () => {
      // The button will be an instance of ButtonView.
      const button = new ButtonView();

      const icon = `<svg style="width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>`;

      button.set({
        icon: icon,
        withText: true,
      });

      button.on("execute", async () => {
        const { value, label: channelName } = await useSelect();

        // Change the model using the model writer.
        editor.model.change((writer) => {

          const button = writer.createElement(ChannelButtonName, {
            attributes: {
              id: "aaaa",
              "data-description": "description",
              "data-id": "data-iaaad",
              "data-description": "description",
              "data-channelId": "data-adfsfds",
            },
          });


          const textEl = writer.createText(`Buy Me ${channelName}`);

          writer.append(textEl, button);

          editor.model.insertContent(button);
        });
      });

      return button;
    });
  }

  _defineSchema() {
    const schema = this.editor.model.schema;
    schema.register(ChannelButtonName, {
      isObject: true,
      allowWhere: "$block",
      isInline: true,
    });
    const dataFilter = this.editor.plugins.get("DataFilter");
     dataFilter.allowAttributes({
       name: ChannelButtonName,
       attributes: true,
       classes: true,
       styles: true
     });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.elementToElement({
      model: ChannelButtonName,
      view: {
        name: "button",
        classes: "dropdown-item button aBuyChannel",
        attributes: {
          "data-id": "data-id",
          "data-channelId": "data-channelId",
        },
      },
    });
  }
}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  BlockQuote,
  Bold,
  CKFinder,
  CKFinderUploadAdapter,
  CloudServices,
  // EasyImage,
  Essentials,
  FontBackgroundColor,
  // FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListStyle,
  MediaEmbed,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  Table,
  TableToolbar,
  TextTransformation,
  TodoList,
  UnderlineEditing,
  SelectDialog,
  GeneralHtmlSupport,
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  htmlSupport: {
      allow: [
          {
            name: /.*/,
            attributes: true,
            classes: true,
            styles: true
          }
        ]
      },
  toolbar: {
    items: [
      "heading",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "|",
      "alignment",
      "indent",
      "outdent",
      "|",
      "HtmlEmbed",
      "mediaEmbed",
      "insertTable",
      "ckfinder",
      "blockQuote",
      "bold",
      "italic",
      "link",
      "|",
      "numberedList",
      "bulletedList",
      "todoList",
      "|",
      "undo",
      "redo",
      "horizontalLine",
      "select-dialog",
    ],
  },

  image: {
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en",
};
