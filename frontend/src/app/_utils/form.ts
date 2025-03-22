export const errorMessage = {
  required: "This field is required.",
  email: "Enter a valid email address",
  password:
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  selectOne: "Please select one option",
  maxLength500: "Maximum length is 500 characters",
};

export const validationPattern = {
  email: /^\S+@\S+\.\S+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};
