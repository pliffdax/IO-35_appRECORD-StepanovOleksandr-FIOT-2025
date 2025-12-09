const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");

const formData = {
  email: "",
  message: ""
};

form.addEventListener("input", onFormInput);
form.addEventListener("submit", onFormSubmit);

restoreForm();

function onFormInput(event) {
  const { name, value } = event.target;

  if (!(name in formData)) {
    return;
  }

  formData[name] = value.trim();

  saveToStorage();
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email === "" || formData.message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log("Form data:", formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = "";
  formData.message = "";
  form.reset();
}

function saveToStorage() {
  try {
    const serialized = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.warn("Помилка збереження в localStorage:", error);
  }
}

function restoreForm() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);

    if (typeof parsed.email === "string") {
      formData.email = parsed.email;
      form.elements.email.value = parsed.email;
    }

    if (typeof parsed.message === "string") {
      formData.message = parsed.message;
      form.elements.message.value = parsed.message;
    }
  } catch (error) {
    console.warn("Помилка читання з localStorage:", error);
  }
}
