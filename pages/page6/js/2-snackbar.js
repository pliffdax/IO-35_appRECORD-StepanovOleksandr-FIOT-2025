const form = document.querySelector(".promise-form");

form.addEventListener("submit", onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delayInput = form.elements.delay;
  const stateInput = form.elements.state;

  const delay = Number(delayInput.value);
  const state = stateInput.value; // "fulfilled" або "rejected"

  if (Number.isNaN(delay) || delay < 0) {
    iziToast.error({
      title: "Помилка",
      message: "Введіть коректну затримку (0 або більше мілісекунд)",
      position: "topRight"
    });
    return;
  }

  createDelayedPromise(delay, state)
    .then(ms => {
      iziToast.success({
        title: "✅ Success",
        message: `Fulfilled promise in ${ms}ms`,
        position: "topRight"
      });
    })
    .catch(ms => {
      iziToast.error({
        title: "❌ Error",
        message: `Rejected promise in ${ms}ms`,
        position: "topRight"
      });
    });
}

function createDelayedPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
