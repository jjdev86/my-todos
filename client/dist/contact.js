const submitForm = () => {
  // get values
  let isValid = false;
  // check to make sure the form is complete
  const inputs = document.getElementsByClassName('input-value');
  for (var i = 0; i < inputs.length; i++) {
      if (validateField(inputs[i])) {
          isValid = true;
      } else {
          isValid = false;
      }
  }
  if (isValid) {
    // hide the form modal
    document.getElementById('modal-body').style.display= 'none';
    // show the message that it was sent
    document.getElementById('confirmation-body').style.display = '';
  }

};

const validateField = e => {
  if (e.name !== "email") {
    // validate length
    return validate(e);
  } else {
    // console.log(e.name, `email?`);
    return emailValidation(e);
  }
};

const validate = input => {
  const errorSpan = input.parentNode.lastChild; 
  if (input.value.length < 3) {
    errorSpan.style.display = '';
    return false;
  } else {
      errorSpan.style.display = 'none';
      return true;
  }
};

const emailValidation = input => {
  const errorSpan = input.parentNode.lastChild; 
  const rex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (rex.test(input.value)) {
    errorSpan.style.display = 'none';
    return true;
  } else {
    errorSpan.style.display = '';
    return false;
  }
};
