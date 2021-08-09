import React, { useCallback } from 'react';

export default function formValidaton() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [validationOn, setValidationOn] = React.useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setValidationOn(false)
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleInputChange, errors, isValid, validationOn, setValidationOn, resetForm };
}