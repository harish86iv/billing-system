export const validateContent = (text,err) => {
    if (!text) {
      return err;
    }
  };
  
  export const validateLength = (text,err) => {
    if (text && text.length < 3) {
      return 'Must be 3 characters or more.';
    }
  };

  export const validateMobile = (text,err) => {
    if (text && text.length != 10) {
      return 'Invalid Mobile No';
    }
  };

  export const validateImei = (text,err) => {
    if (text && text.length != 16) {
      return 'Invalid Imei No';
    }
  };

   
  export const validateField = (field, value) => {
     let error = '';
    const validators = field.validators;
    const errorText = field.errorText;
    validators.forEach((validator) => {
      const validationError = validator(value,errorText);
      if (validationError) {
        error = validationError;
      }
    });
    
    return error;
  };
  export const validateFields = (fields, values) => {
    const errors = {};
    const fieldKeys = Object.keys(fields);
  
    fieldKeys.forEach((key) => {
      const field = fields[key];
      const validators = field.validators;
      const value = values[key];
      if (validators && validators.length > 0) {
        const error = validateField(field, value);
        if (error) {
          errors[key] = error;
        }
      }
    });
  
    return errors;
  };

  export const hasValidationError = (errors) => {
    return Object.values(errors).find((error) => error.length > 0);
  };