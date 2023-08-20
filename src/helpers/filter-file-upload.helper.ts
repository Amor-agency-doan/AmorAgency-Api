import { BadRequestException } from '@nestjs/common';
import { ACCOUNT_MESSAGES } from '../constants';

export const FilterFileUpload = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|xlsx)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }

  callback(null, true);
};

export const FilterFileExcelUpload = (req, file, callback) => {
  if (!file.originalname.match(/\.(xlsx)$/)) {
    return callback(new BadRequestException(ACCOUNT_MESSAGES.FILE_FORMAT_INVALID), false);
  }

  callback(null, true);
};
