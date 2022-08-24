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
import GeneralHtmlSupport from "@ckeditor/ckeditor5-html-support/src/generalhtmlsupport";
import { ChannelButtonPlugin } from "./ChannelButtonPlugin";

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
  GeneralHtmlSupport,
  ChannelButtonPlugin
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
      "select-dialog"
    ]
  },

  image: {
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative"
    ]
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: "en"
};
