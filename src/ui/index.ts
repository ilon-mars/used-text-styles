import { MessageTypeEnum } from '@/enums';
import { TextStyleType } from '@/types';
import { addListener, createListElement } from '@/utils';

const createStylesList = (stylesArr: TextStyleType[]) => {
  const listElement = document.getElementById('styles');

  if (!listElement) {
    return;
  }

  listElement.textContent = '';

  const elements = stylesArr.reduce((acc, current) => {
    const element = createListElement(current);
    return (acc += element);
  }, '');

  listElement.insertAdjacentHTML('afterbegin', elements);
  listElement.style.display = 'flex';
  document.getElementById('instruction')!.style.display = 'none';
};

window.onmessage = async (event) => {
  const message = event.data.pluginMessage;

  if (message.type === MessageTypeEnum.SELECTED_ELEMENT) {
    if (message.stylesList.length > 0) {
      createStylesList(message.stylesList);

      document.body.addEventListener('click', addListener);
    } else {
      document.getElementById('instruction')!.style.display = 'flex';
      document.getElementById('styles')!.textContent = '';
    }
  }
};
