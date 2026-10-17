import '../css/styles.css';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formState = {
  email: '',
  message: '',
};

function loadFormState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;

    const parsedState = JSON.parse(savedState);
    formState.email =
      typeof parsedState.email === 'string' ? parsedState.email : '';
    formState.message =
      typeof parsedState.message === 'string' ? parsedState.message : '';

    form.elements.email.value = formState.email;
    form.elements.message.value = formState.message;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function handleInput(event) {
  const { name, value } = event.target;
  if (name !== 'email' && name !== 'message') return;

  formState[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
}

function handleSubmit(event) {
  event.preventDefault();

  formState.email = form.elements.email.value.trim();
  formState.message = form.elements.message.value.trim();

  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return;
  }

  console.log({ ...formState });
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formState.email = '';
  formState.message = '';
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

loadFormState();
