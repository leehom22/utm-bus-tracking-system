

export function toogle(clickElement, placeElement, funMain, fun2, fun3) {
  let isVisible = false;

  clickElement.addEventListener('click', () => {

    if (fun2) {
        isVisible=false
      fun2(false);
    }
    if (fun3) {
      isVisible=false
      fun3(false);
    }

    isVisible = !isVisible;
    funMain(isVisible);

    console.log(isVisible ? 'tab open' : 'tab close');
  });
}
