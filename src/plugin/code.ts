import { MessageTypeEnum } from '@/enums';
import { TextStyleType } from '@/types';
import { getLineHeight, supportsChildrenWithText, updateSelection } from '@/utils';

let lastSelectedNode: SceneNode;

const uiHandler = () => {
  const selection = figma.currentPage.selection[0];

  if (!selection) {
    figma.notify('Select node to inspect', {
      timeout: 5000,
    });
    return;
  }

  if (figma.currentPage.selection.length > 1) {
    figma.notify('Please, select only one node');
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
        fontSize: `${parseInt(element.fontSize.toString())}px`,
        fontWeight: parseInt(element.fontWeight.toString()),
        lineHeight: getLineHeight(element.lineHeight as LineHeight),
      };

      if (element.removed) {
        figma.notify('This node has been removed', {
          timeout: 3000,
        });
        figma.ui.close();
      }

      if (element.textStyleId && typeof element.textStyleId === 'string') {
        const elementWithId = figma
          .getLocalTextStyles()
          .find((style) => style.id === element.textStyleId)!;

        return Object.assign(styles, { name: elementWithId.name });
      } else if (typeof element.fontName === typeof figma.mixed) {
        const elementFontName = element
          .getStyledTextSegments(['fontName'])
          .map((font) => font.fontName.family)
          .join('/');

        return {
          id: element.id,
          fontSize: '??',
          fontWeight: 0,
          lineHeight: '??',
          fontName: elementFontName,
        };
      } else {
        return Object.assign(styles, { fontName: `${(element.fontName as FontName).family}` });
      }
    });

  figma.ui.postMessage({ type: MessageTypeEnum.SELECTED_ELEMENT, stylesList });
};

figma.showUI(__html__, { themeColors: true, width: 320, height: 480 });

uiHandler();

figma.on('selectionchange', () => {
  if (!figma.currentPage.selection[0]) {
    figma.ui.postMessage({ type: MessageTypeEnum.SELECTED_ELEMENT, stylesList: [] });
  }

  uiHandler();
});

figma.on('documentchange', (event) => {
  const docChangeEvent = event.documentChanges[0];

  const hasPropertyChanged =
    docChangeEvent.type === 'PROPERTY_CHANGE' &&
    (docChangeEvent.properties.every((p) => ['fontName', 'textStyleId'].indexOf(p) > -1) ||
      docChangeEvent.properties.includes('textStyleId'));

  const hasNewStyleCreated =
    event.documentChanges[0].type === 'STYLE_PROPERTY_CHANGE' &&
    event.documentChanges[1].type === 'STYLE_CREATE';

  if (!(hasPropertyChanged || hasNewStyleCreated)) {
    return;
  }

  updateSelection(figma.currentPage, lastSelectedNode);
});

figma.on('currentpagechange', uiHandler);

figma.ui.onmessage = (message) => {
  if (message.type === MessageTypeEnum.SCROLL_TO) {
    const el = figma.currentPage.findOne((el) => el.id === message.id);

    if (!el) {
      return;
    }

    figma.viewport.scrollAndZoomIntoView([el]);
    updateSelection(figma.currentPage, el);
  }
};
