const hiddenClass = "is-hidden";

// функції, які керують різними станами кнопки завантажити більше

function hide(button) {
  button.classList.add(hiddenClass);
}

function show(button) {
  button.classList.remove(hiddenClass);
}

function enable(button, preloader) {
  loader.classList.add(hiddenClass);
  button.disabled = false;
}

function disable(button, preloader) {
  loader.classList.remove(hiddenClass);
  button.disabled = true;
}

export default { hide, show, enable, disable };

