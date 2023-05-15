export const USER_FIELDS = {
  UserNameMin: 3,
  UserNameMax: 50,
  UserInfoMax: 300,
  PasswordMin: 6,
  PasswordMax: 12,
};

export const SPECIALIZATIONS_LIMIT = 5;

export const USER_EXCEPTIONS = {
  UserForbidden: 'Access is denied.',
  UserEmailExist: 'User with this email exists.',
  UserNotFound: 'User not found.',
  UserPasswordWrong: 'User password is wrong.'
};

export const USER_VALIDATION_ERRORS = {
    UserEmailNotValid: 'The email is not valid.',
    UserDateBirthNotValid: 'The user date birth is not valid.',
    UserNameLength: `User name length shall be between ${USER_FIELDS.UserNameMin} and ${USER_FIELDS.UserNameMax} chars.`,
    UserPasswordLength: `User password length shall be between ${USER_FIELDS.PasswordMin} and ${USER_FIELDS.PasswordMax} chars.`,
    UserInfoLength: `About User info length must no more than ${USER_FIELDS.UserInfoMax} chars.`,
    UserMaxSpecializationNumber: `User specialization number shall no more than ${SPECIALIZATIONS_LIMIT}.`
  };

