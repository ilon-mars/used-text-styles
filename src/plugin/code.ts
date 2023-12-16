import { MessageTypeEnum } from '@/enums';
import { TextStyleType } from '@/types';
import { getLineHeight, supportsChildrenWithText, updateSelection } from '@/utils';

let lastSelectedNode: SceneNode;

const uiHandler = () => {
  const selection = figma.currentPage.selection[0];

  if (!selection) {
    figma.notify('Select frame or group', {
      timeout: 5000,
    });
    return;
  }

  if (!supportsChildrenWithText(selection)) {
    return;
  }

  lastSelectedNode = selection;

  const stylesList: TextStyleType[] = selection
    .findAll((node) => node.type === 'TEXT')
    .map((textNode) => {
      const element = textNode as TextNode;

      const styles = {
        id: element.id,
        fontSize: `${element.fontSize.toString()}px`,
        lineHeight: getLineHeight(element.lineHeight as LineHeight),
      };

      if (element.textStyleId) {
        const elementWithId = figma
          .getLocalTextStyles()
          .find((style) => style.id === element.textStyleId)!;

        return Object.assign(styles, { name: elementWithId.name });
      } else {
        return Object.assign(styles, { fontName: `(-${(element.fontName as FontName).family}-)` });
      }
    });

  figma.ui.postMessage({ type: MessageTypeEnum.SELECTED_ELEMENT, stylesList });
};

figma.showUI(__html__, { themeColors: true, width: 320, height: 480 });

uiHandler();

figma.on('selectionchange', () => uiHandler());
figma.on('documentchange', () => updateSelection(figma.currentPage, lastSelectedNode));

figma.ui.onmessage = (message) => {
  if (message.type === MessageTypeEnum.SCROLL_TO) {
    const el = figma.currentPage.findOne((el) => el.id === message.id)!;
    figma.viewport.scrollAndZoomIntoView([el]);
    updateSelection(figma.currentPage, el);
  }
};
