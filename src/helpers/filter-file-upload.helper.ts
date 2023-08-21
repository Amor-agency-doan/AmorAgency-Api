export const FilterFileUpload = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|xlsx)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }

  callback(null, true);
};

