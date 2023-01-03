/**
 * Enum for views for component templating.
 */
export enum Views {
  // Auth views
  SIGN_IN = 'signin',
  SIGN_OUT = 'signout',

  // Incorporation views
  INCORPORATION_AGREEMENT = 'incorporation-agreement',
  INCORPORATION_DEFINE_COMPANY = 'incorporation-define-company',
  INCORPORATION_MEMORANDUM = 'incorporation-memorandum',
  INCORPORATION_PEOPLE_ROLES = 'incorporation-people-roles',
  INCORPORATION_REVIEW_CONFIRM = 'incorporation-review-confirm',
  INCORPORATION_RULES = 'incorporation-rules',
  INCORPORATION_SHARE_STRUCTURE = 'incorporation-share-structure',

  // Dissolution views
  DISSOLUTION_AFFIDAVIT = 'dissolution-affidavit',
  DISSOLUTION_DEFINE_DISSOLUTION = 'dissolution-define-dissolution',
  DISSOLUTION_RESOLUTION = 'dissolution-resolution',
  DISSOLUTION_REVIEW_CONFIRM = 'dissolution-review-confirm',

  // Registration views
  REGISTRATION_DEFINE_BUSINESS = 'registration-define-business',
  REGISTRATION_PEOPLE_ROLES = 'registration-people-roles',
  REGISTRATION_REVIEW_CONFIRM = 'registration-review-confirm',

  // Firm dissolution view
  DISSOLUTION_FIRM = 'dissolution-firm',
}