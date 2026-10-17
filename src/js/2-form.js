import '../css/styles.css';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

function loadFormState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) return;

    const parsedState = JSON.parse(savedState);

    formData.email =
      typeof parsedState.email === 'string' ? parsedState.email : '';

    formData.message =
      typeof parsedState.message === 'string' ? parsedState.message : '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function handleInput(event) {
  const { name, value } = event.target;

  if (name !== 'email' && name !== 'message') return;

  formData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formData });

  localStorage.removeItem(STORAGE_KEY);
  form.reset();

  formData.email = '';
  formData.message = '';
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

loadFormState();
