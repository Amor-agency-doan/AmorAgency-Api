export enum EAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EAccountRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export const ACCOUNT_MESSAGES = {
  EMAIL_OR_PASSWORD_INVALID: 'メールアドレス、またはパスワードが正しくありません。',
  PASSWORD_INVALID: 'パスワードが異なります。正しいパスワードを入力してください。',
  ACCOUNT_EXPIRED: 'Account is expired',
  ACCOUNT_NOT_FOUND: 'メールアドレスが正しくありません。',
  CHANGED_PASSWORD: 'Password changed successfully',
  ACCOUNT_INVALID: 'Account is invalid',
  EMAIL_EXISTED: 'このメールアドレスは既に登録済みです。',
  IMPORT_EMAIL_EXISTED: 'メールアドレス is duplicated',
  ACCOUNT_INACTIVE: 'Account inactive',
  OTP_REQUIRED: '確認コードを入力してください 。',
  OTP_NOT_MATCH: '確認コードが正しくありません。もう一度入力してください。',
  OTP_EXPIRED: '確認コードの有効期限が過ぎています。 新しいコードを入力してください。',
  LOST_DATA_EDUCATION: 'Lost data education',
  LOST_EXPIRED_TIME: 'Lost expired time',
  EMAIL_CANT_BE_EMPTY: 'メールアドレス is not allowed to empty',
  EMAIL_INVALID: 'メールアドレス is invalid',
  PERSONAL_ID_CANT_BE_EMPTY: '個人ID is not allowed to empty',
  PERSONAL_ID_INVALID: '個人ID is invalid',
  PERSONAL_ID_EXISTED: '個人ID already used',
  IMPORT_PERSONAL_ID_EXISTED: '個人ID is duplicated',
  IMPORT_MAX_LENGTH: 'Data must be ',
  IMPORT_EXPIRED_AT_SMALLER: 'Expire date is smaller than current',
  EDUCATION_NOT_MATCHING: 'Education is not matching',
  IMPORT_FILE_FORMAT_INVALID: 'ファイルの形式が正しくありません。既存のサンプル ファイルをご利用ください。',
  DATA_IMPORT_FILE_FORMAT_INVALID: 'ファイルのインポートに失敗しました。',
  FULLNAME_INVALID: '氏名に特殊文字は使えません。',
  FILE_FORMAT_INVALID: 'ファイル形式が無効です。',
  NOT_PERMISSION: 'Not permission',
  LOGIN_MULTI_DEVICE: 'アカウントは別のデバイスでログインしています。',
};

