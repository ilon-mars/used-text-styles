import { MessageTypeEnum } from '@/enums';

const postMessage = (id: string) => {
  parent.postMessage({ pluginMessage: { type: MessageTypeEnum.SCROLL_TO, id } }, '*');
};

export const addListener = (event: Event) => {
  const target = event.target as HTMLElement;

  if (!target) {
    return;
  }

  if (target.closest('[data-id]')) {
    const id = (target.closest('[data-id]') as HTMLElement)!.dataset.id || '';
    postMessage(id);
  }
};
