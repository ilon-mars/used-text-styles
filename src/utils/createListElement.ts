import { TextStyleType } from '@/types';
import { hasTextStyle } from './hasTextStyle';

const targetIcon = `
  <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
    <path fill="#000" fill-opacity="1" fill-rule="evenodd" stroke="none" d="M15.5 14v-2.975c-2.362.234-4.24 2.113-4.475 4.475H14v1h-2.975c.234 2.362 2.113 4.24 4.475 4.475V18h1v2.975c2.362-.234 4.24-2.113 4.475-4.475H18v-1h2.975c-.234-2.362-2.113-4.24-4.475-4.475V14h-1zm6.48 1.5c-.241-2.915-2.565-5.239-5.48-5.48V8h-1v2.02c-2.915.241-5.239 2.565-5.48 5.48H8v1h2.02c.241 2.915 2.565 5.239 5.48 5.48V24h1v-2.02c2.915-.241 5.239-2.565 5.48-5.48H24v-1h-2.02z"></path>
  </svg>`;

export const createListElement = (style: TextStyleType) => {
  const name = hasTextStyle(style) ? style.name : style.fontName;

  return `
    <li>
      <span>${name}</span>
      <span>${style.fontSize}/${style.lineHeight}</span>
      <button data-id="${style.id}">${targetIcon}</button>
    </li>
  `;
};
