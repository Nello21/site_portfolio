import { useEffect } from 'react';

export const ComponentA = ({ text }: { text: string }) => {

  useEffect(() => {
    const element = document.querySelector('#lol') as HTMLDivElement;

    /* Every time text value changes, we log container's width to the console */
    if (element) {
      console.log(`current width of the container is: ${element.offsetWidth || 'unknown'}`);
    }
  }, [text]);

  /* Every time user scrolls the page, we log container's width to the console */
  window.addEventListener('scroll', function () {
    const element = document.querySelector('#lol') as HTMLDivElement;

    console.log(`current width of the container is: ${element.offsetWidth || 'unknown'}`);
  });

  return <div id="lol">{text}</div>;
  
};
