export const EMAIL_REGEX = "\\S+@\\S+\\.\\S+";


export function setCustomValidationMessage(event) {
  const target = event.target;
  if (target.validity.patternMismatch) {
    const message = target.dataset.customValidationMessage;
    target.setCustomValidity(message);
  }
}

export function resetCustomValidationMessage(event) {
  const target = event.target;
  target.setCustomValidity('');
}
