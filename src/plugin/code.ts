// import { SCROLL_TO } from "../utils";
// import { getLineHeight, supportsChildrenWithText, updateSelection } from "../utils";

// const showPluginWindow = () => {
//   const selection = figma.currentPage.selection[0];

//   if (!selection) {
//     figma.notify('Select frame or group', {
//       timeout: 5000,
//     });
//     return;
//   }

//   if (!supportsChildrenWithText(selection)) {
//     return;
//   }

//   lastSelectedNode = selection;

//   const stylesList = selection
//     .findAll(node => node.type === 'TEXT')
//     .map(textNode => {
//       const element = textNode as TextNode;
//       let name: string;

//       const fontSize = `${element.fontSize.toString()}px`;
//       const lineHeight = getLineHeight(element.lineHeight as LineHeight);

//       if (element.textStyleId) {
//         name =
//           figma
//             .getLocalTextStyles()
//             .find(style => style.id === element.textStyleId).name || '';
//       } else {
//         name = `(-${(element.fontName as FontName).family}-)`;
//       }

//       return {
//         id: element.id,
//         name,
//         fontSize,
//         lineHeight,
//       };
//     });

//   figma.ui.postMessage({ type: 'selectedElement', stylesList });
// };

// figma.showUI(__html__, { themeColors: true, width: 320, height: 480 });

// let lastSelectedNode: SceneNode;

// showPluginWindow();

// figma.on('selectionchange', () => showPluginWindow());
// figma.on('documentchange', () => {
//   updateSelection(figma.currentPage, lastSelectedNode);
// });

// figma.ui.onmessage = message => {
//   if (message.type === SCROLL_TO) {
//     const el = figma.currentPage.findOne(el => el.id === message.id)!;
//     figma.viewport.scrollAndZoomIntoView([el]);
//     updateSelection(figma.currentPage, el);
//   }
// };
