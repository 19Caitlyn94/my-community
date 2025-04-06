export const errorMessage = {
  required: "This field is required.",
  email: "Enter a valid email address",
  password:
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  selectOne: "Please select one option",
  maxLength: (length: number) => `Maximum length is ${length} characters`,
  maxSize: (size: number) => `Maximum size is ${size}MB`,
  maxFiles: (length: number) => `File limit is ${length}`,
  maxFileSize: (size: number, name: string) => `File ${name} exceeds the maximum size of ${size}MB`,
};

export const validationPattern = {
  email: /^\S+@\S+\.\S+$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};


export const acceptedFileTypes = {
  // JPEG, PNG, GIF, WebP, BMP, TIFF images
  image: 'image/jpeg,image/png,image/gif,image/webp,image/bmp,image/tiff',
  // MP4, WebM, Ogg, AVI, QuickTime videos  
  video: 'video/mp4,video/webm,video/ogg,video/x-msvideo,video/quicktime',
  // Text, CSV, PDF, Word, Excel, OpenDocument, JSON, XML files
  document: 'text/plain,text/csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.oasis.opendocument.text,application/json,application/xml'
};
