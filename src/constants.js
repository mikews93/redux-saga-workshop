import values from 'lodash/values';
import flatMap from 'lodash/flatMap';

export const OFFSET = 0;
export const LIMIT = 10;
export const ORDER = 'asc';

export const PAGINATION = {
  pages: {},
  fetchStatusByPage: {},
  size: 0
};

export const REQUEST_STATUSES = {
  NOT_LOADED: 'notLoaded',
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed'
};

export const CLAIM_STATUS = {
  OPEN: 'Open',
  PENDING: 'Pending',
  SETTLED: 'Settled',
  DISMISSED: 'Dismissed',
  CLOSED: 'Closed'
};

export const PEER_REFERENCE_STUTUSES = {
  PENDING: 'Pending',
  SENT: 'Sent',
  AWAITING: 'Awaiting response',
  COMPLETED: 'Completed'
};

export const SORT_BY = {
  DESC: 'desc',
  ASC: 'asc'
};

export const providerContactType = {
  EMAIL: 'EMAIL',
  MESSAGE: 'MESSAGE',
  ALT_EMAIL: 'ALT_EMAIL'
};

export const LICENSE_COLOR = {
  TAKE_ACTION: 'danger',
  WARNING: 'warning',
  CLEAR: 'success'
};

export const CARD_TITLE_COLOR = {
  danger: '#ff4e4a',
  success: '#5bd672',
  warning: '#FFAA00',
  default: '#707b7b'
};

export const AddProviderEmailContact = {
  DIRECT: '1',
  DELEGATE: '2'
};

export const AddMalpracticeExclusions = {
  YES: true,
  NO: false
};

export const DEACDSCertificationType = {
  DRUG_ENFORCEMENT_ADMINISTRATION: 'Drug Enforcement Administration',
  CONTROLLED_SUBSTANCE: 'Controlled Substance'
};

export const MEDICAL_EDUCATION_TYPES = {
  GRADUATE: 'Graduate',
  MEDICAL_EDUCATION: 'Medical Education',
  INTERNSHIP: 'Internship',
  RESIDENCY: 'Residency',
  FELLOWSHIP: 'Fellowship',
  ECFMG: 'ECFMG',
  OTHER: 'Other'
};

export const providerStatus = {
  AWAITING_CREDENTIALS: 'AWAITING_CREDENTIALS',
  READY_FOR_REVIEW: 'READY_FOR_REVIEW',
  UNDER_REVIEW: 'UNDER_REVIEW',
  AWAITING_DECISION: 'AWAITING_DECISION',
  APPROVED: 'APPROVED',
  DENIED: 'DENIED'
};

export const DEFAULT_QUERY_PARAMS = {
  offset: OFFSET,
  limit: LIMIT,
  order: ORDER,
  active: true,
  sort: 'name'
};

export const VALIDATION_ERRORS = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_DATE: 'Please enter a valid date.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  MIN_LENGTH: min => `Please enter at least ${min} characters in this field`,
  EXACT_LENGTH: length =>
    `Please enter exactly ${length} characters in this field`,
  EXACT_LENGTH_ZIPCODE: 'Invalid Zip code',
  IS_NAN: 'Please enter a number'
};

export const VACCINE_REFUSE_REASONS = {
  DUE_TO_RELIGION: {
    key: 'DUE_TO_RELIGION',
    text: 'Declined due to religious beliefs'
  },
  DUE_TO_PERSONAL: {
    key: 'DUE_TO_PERSONAL',
    text: 'Declined due to personal reasons'
  }
};

/**
 * All of the prefixes used across the app
 */
export const PREFIXES = {
  accountNumber: '60-',
  invoiceNumber: '98-'
};

export const STATUS_TYPE = {
  FETCH: 'fetch',
  CREATE: 'create',
  UPDATE: 'update'
};

export const PROVIDER_CREDENTIALS_NAMES = {
  DEMOGRAPHICS: 'demographics',
  HEALTH: 'health',
  PRACTICE_LOCATIONS: 'practice_locations',
  MEDICAL_LICENSE: 'medical_license',
  DEACDS_REGISTRATION: 'deacds_registration',
  BOARD_CERTIFICATIONS: 'board_certifications',
  EDUCATION: 'education',
  EMPLOYMENT_HISTORY: 'employment_history',
  HOSPITAL_AFFILIATION: 'hospital_affiliation',
  NATIONAL_CERTIFICATE: 'national_certificate',
  MALPRACTICE_INSURANCE: 'malpractice_insurance',
  MALPRACTICE_CLAIMS: 'malpractice_claims',
  PEER_REFERENCE: 'peer_reference',
  MILITARY_SERVICES: 'military_services',
  ALTERNATE_COVERAGE: 'alternate_coverage',
  MEMBERSHIP_DUES: 'membership_dues',
  SPONSORING_PHYSICIAN: 'sponsoring_physician'
};

/*
  IMPORTANT!
  This array is used to get general info for each provider section. Each position refers to a provider section:
    name: the name of the object for this provider section
    title: the text to be used as display title on the section
    resourse: refers to the component name of the section and also refers to the svg file to be used on this section

  Also the order of this array represents the order of the sections in provider detail and providers sections side menu, and is also used
  to for some helper functions used to determine the next and/or previous section from a given section

*/
export const CREDENTIALS = [{
    name: PROVIDER_CREDENTIALS_NAMES.DEMOGRAPHICS,
    title: 'Provider Demographics',
    resource: 'ProviderDemographics'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.HEALTH,
    title: 'Provider Health',
    resource: 'ProviderHealth'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.PRACTICE_LOCATIONS,
    title: 'Practice Location(s)',
    resource: 'PracticeLocations'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.MEDICAL_LICENSE,
    title: 'Medical License',
    resource: 'MedicalLicense'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.DEACDS_REGISTRATION,
    title: 'DEA_CDS Registration',
    resource: 'DeacdsRegistration'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.BOARD_CERTIFICATIONS,
    title: 'Board Certifications',
    resource: 'BoardCertifications'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.EDUCATION,
    title: 'Education',
    resource: 'Education'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.EMPLOYMENT_HISTORY,
    title: 'Employment History',
    resource: 'EmploymentHistory'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.HOSPITAL_AFFILIATION,
    title: 'Hospital Affiliation',
    resource: 'HospitalAffiliation'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.NATIONAL_CERTIFICATE,
    title: 'National Certificate',
    resource: 'NationalCertificate'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.MALPRACTICE_INSURANCE,
    title: 'Malpractice Insurance',
    resource: 'MalpracticeInsurance'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.MALPRACTICE_CLAIMS,
    title: 'Malpractice Claims',
    resource: 'MalpracticeClaims'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.PEER_REFERENCE,
    title: 'Peer Reference',
    resource: 'PeerReference'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.MILITARY_SERVICES,
    title: 'Military Services',
    resource: 'MilitaryServices'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.ALTERNATE_COVERAGE,
    title: 'Alternate Coverage',
    resource: 'AlternateCoverage'
  },
  {
    name: PROVIDER_CREDENTIALS_NAMES.MEMBERSHIP_DUES,
    title: 'Membership Dues',
    resource: 'MembershipDues'
  }
  /*,
   {
     name: PROVIDER_CREDENTIALS_NAMES.SPONSORING_PHYSICIAN,
     title: 'Sponsoring Physician',
     resource: 'SponsoringPhysician'
   }*/
];

export const PROVIDER_EMAIL_TEMPLATES = {
  newProvider: 'newProvider'
};

export const HR_ROUTES = {
  root: '/hr',
  dashboard: '/hr/dashboard',
  disciplinaryActions: '/hr/disciplinaryActions',
  credentialReview: '/hr/credentialReview',
  nameComparison: '/hr/nameComparison'
};

export const EDUCATION_ROUTES = {
  root: '/education',
  dashboard: '/education/dashboard',
  courses: '/education/courses',
  transcripts: '/education/transcripts'
};

export const CREDENTIALING_ROUTES = {
  root: '/credentialing',
  dashboard: '/credentialing/dashboard',
  providers: '/credentialing/providers',
  providerDetail: '/credentialing/providers/:id',
  ...CREDENTIALS.reduce((acc, {
    name
  }) => {
    acc[name] = `/credentialing/providers/:id/${name}`;
    return acc;
  }, {})
};

export const PREHIRE_ROUTES = {
  root: '/prehire'
};

export const REPORTS_ROUTES = {
  root: '/reports',
  educationCompletion: '/reports/education-completion',
  educationCompletionResults: '/reports/education-completion/:id/results',
  exclusions: '/reports/exclusions',
};

export const CAGADAS_ROUTES = {
  root: '/',
  list: '/list',
  vote: '/vote',
  weeklyTop: '/weekly-top',
  mostRanked: '/most-ranked'
};

export const SHARED_ROUTES = {
  bulkUploads: '/bulk-uploads',
  messages: '/messages',
  messagesInbox: '/messages/inbox',
  messagesArchive: '/messages/archive',
  uploadSummary: '/bulk-uploads/:id/summary',
  uploadSummaryDetails: '/bulk-uploads/:id/summary/details',
  users: '/users',
  userProfile: '/users/:id',
  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsOrganization: '/settings/organization',
  settingsBilling: '/settings/billing',
  settingsInvoice: '/settings/invoices/:id',
  settingsInvoiceItemCharges: '/settings/invoices/:id/items',
  settingsNotifications: '/settings/notifications'
};

export const EMPLOYEES_ROUTES = {
  root: '/employees',
  employeeDetail: '/employees/:id',
  employeeOverview: '/employees/:id/overview',
  employeeLicenses: '/employees/:id/licenses',
  employeeTranscripts: '/employees/:id/transcripts',
  employeeCourses: '/employees/:id/courses',
  employeeCompletedCourses: '/employees/:id/courses/completed',
  employeeExemptions: '/employees/:id/courses/exemptions',
  employeeWorkgroups: '/employees/:id/work-groups',
  employeeNotes: '/employees/:id/notes',
  employeeDocuments: '/employees/:id/documents',
  employeeTranscriptDetail: '/employees/:id/transcripts/:licenseId'
};

export const ROUTES = [
  '/',
  '/logout',
  '/employees/:id/transcripts/:licenseId/report-ce',
  ...values(CREDENTIALING_ROUTES),
  ...values(EDUCATION_ROUTES),
  ...values(EMPLOYEES_ROUTES),
  ...values(PREHIRE_ROUTES),
  ...values(REPORTS_ROUTES),
  ...values(SHARED_ROUTES),
  ...values(HR_ROUTES)
];

/**
 * @readonly
 * @enum {string}
 */
export const FEATURES = {
  /**  Ability to add an employee */
  addEmployee: 'addEmployee',
  /** Ability to edit an employee */
  editEmployee: 'editEmployee',
  /** Ability to add a provider */
  addProvider: 'addProvider',
  /** Ability to remove an employee */
  removeEmployee: 'removeEmployee',
  /** Ability to remove a provider */
  removeProvider: 'removeProvider',
  /** Ability to edit a user profile */
  editUserProfile: 'editUserProfile',
  /** Ability to add an additional license to a profile */
  addLicense: 'addLicense',
  /** Ability to add an additional certification to a profile */
  addCertification: 'addCertification',
  /** Ability to add an additional unmonitored credential to a profile */
  addUnmonitoredCredential: 'addUnmonitoredCredential',
  /** Ability to remove an additional license from a profile */
  removeLicense: 'removeLicense',
  /** Ability to remove an additional certification from a profile */
  removeCertification: 'removeCertification',
  /** Ability to remove an additional unmonitored credential from a profile */
  removeUnmonitoredCredential: 'removeUnmonitoredCredential',
  /** Ability to edit account settings */
  editSettings: 'editSettings',
  /** Ability to add users to notifications */
  addUsersToNotifications: 'addUsersToNotifications',
  /** Ability to remove users from notifications */
  removeUsersFromNotifications: 'removeUsersFromNotifications',
  /** Ability to adjust notification frequencies */
  adjustNotificationFrequency: 'adjustNotificationFrequency',
  /** Ability to edit user personal info in Settings */
  editSettingsPersonalInfo: 'editSettingsPersonalInfo',
  /** Ability to edit username in Settings */
  editSettingsUsername: 'editSettingsUsername',
  /** Ability to edit password in Settings */
  editSettingsPassword: 'editSettingsPassword',
  /** Ability to edit roles and applications in Settings */
  editSettingsRolesAndApps: 'editSettingsRolesAndApps',
  /** Ability to edit grants in Settings */
  editSettingsGrants: 'editSettingsGrants',
  /** Ability to view My Profile in Settings */
  viewSettingsMyProfile: 'viewSettingsMyProfile',
  /** Ability to view Organization in Settings */
  viewSettingsOrganization: 'viewSettingsOrganization',
  /** Ability to view Billing in Settings */
  viewSettingsBilling: 'viewSettingsBilling',
  /** Ability to view Notifications in Settings */
  viewSettingsNotifications: 'viewSettingsNotifications',
  /** Ability to view Users option in User Menu */
  viewUsersInUserMenu: 'viewUsersInUserMenu',
  /** Ability to view Bulk Uploads in three-dot menu */
  viewBulkUploads: 'viewBulkUploads',
  /** Ability to view the Actions button in EmployeeProfile */
  viewEmployeeActionsButton: 'viewEmployeeActionsButton',
  /** Ability to view Exculsion report */
  viewExclusions: 'viewExclusions'
};

export const UNAUTHORIZED_FEATURES_BY_ROLE = {
  ADMIN: [],
  SUPERVISOR: [
    FEATURES.addEmployee,
    FEATURES.editEmployee,
    FEATURES.editSettingsGrants,
    FEATURES.editSettingsPersonalInfo,
    FEATURES.editSettingsRolesAndApps,
    FEATURES.editUserProfile,
    FEATURES.removeEmployee,
    FEATURES.removeLicense,
    FEATURES.viewBulkUploads,
    FEATURES.viewEmployeeActionsButton,
    FEATURES.viewSettingsBilling,
    FEATURES.viewSettingsNotifications,
    FEATURES.viewSettingsOrganization,
    FEATURES.viewUsersInUserMenu
  ],
  RECRUITER: [],
  CUSTOM: [],
  READER: [],
  INVOICE: [FEATURES.viewEmployeeActionsButton]
};

const prehireRoutes = flatMap({
  ...PREHIRE_ROUTES
});

export const UNAUTHORIZED_ROUTES_BY_ROLE = {
  ADMIN: prehireRoutes,
  SUPERVISOR: [
    SHARED_ROUTES.bulkUploads,
    SHARED_ROUTES.users,
    SHARED_ROUTES.userProfile,
    SHARED_ROUTES.settingsOrganization,
    SHARED_ROUTES.settingsBilling,
    SHARED_ROUTES.settingsInvoice,
    SHARED_ROUTES.settingsInvoiceItemCharges,
    SHARED_ROUTES.settingsNotifications,
    ...prehireRoutes
  ],
  CUSTOM: prehireRoutes,
  READER: prehireRoutes,
  INVOICE: prehireRoutes,
  RECRUITER: []
};

export const CREDENTIALING_USER_TYPE = {
  MSP: 'MSP',
  DELEGATE: 'DELEGATE',
  PROVIDER: 'PROVIDER'
};

export const CERTIFICATION_TYPE = {
  ACLS: 'ACLS',
  BLS: 'BLS',
  NALS: 'NALS',
  PALS: 'PALS'
};

export const BRANCH_SERVICE = {
  NAVY: 'Navy',
  AIR_FORCE: 'Air Force',
  MARINES: 'Marines',
  ARMY: 'Army'
};

/* For margin tops */
export const DEFAULT_SPACE_AMONG_FIELDS = {
  TEXT_TEXT: '15px', // .text-field + .text-field
  TEXT_SELECT: '20px', // .text-field + .select-field
  TEXT_DATE: '13px', // .text-field + .date-picker
  TEXT_CHECK: '20px', // .text-field + .checkbox
  DATE_DATE: '13px;', // .date-picker + .date-picker
  DATE_SELECT: '20px', // .date-picker + .select-field
  SELECT_SELECT: '13px', // .select-field + .select-field
  SELECT_TEXT: '5px', // .select-field + .text-field
  SELECT_DATE: '3px', // .select-field + .date-picker
  CHECK_TEXT: '13px', // .checkbox + .text-field
  CHECKBOX_SELECT: '40px'
};

export const REPORTS = {
  HR: [{
      name: 'Status',
      description: 'See the total number of employees by credential status as reported by the Primary Source.',
      route: undefined
    },
    {
      name: 'Expiration Date',
      description: 'See a summary-by-month of the total number of credentials that are coming due for renewal.',
      route: undefined
    },
    {
      name: 'Disciplinary Action',
      description: 'See a summary of any credential that has been sanctioned or flagged with a disciplinary action.',
      route: undefined
    },
    {
      name: 'Name Comparison',
      description: 'See discrepancies between the name listed on the employee profile and the name listed with the Primary Source.',
      route: undefined
    },
    {
      name: 'Date Renewed',
      description: 'See a list of employees who have renewed within a selected period of time.',
      route: undefined
    },
    {
      name: 'Exclusions',
      description: 'See a summary of possible name matches of employees/vendors against the OIG LEIE and GSA’s SAM exclusions databases.',
      route: REPORTS_ROUTES.exclusions
    }
  ],
  EDUCATION: [{
    name: 'Education Completion',
    description: 'See which employees have completed their CE/CME requirements and which haven’t.',
    route: REPORTS_ROUTES.educationCompletion
  }]
};

export const NOTIFICATIONS = {
  general: [{
    name: 'Employee',
    description: 'Select the system user to receive a notification each time an employee is added or removed from the Employee Register.',
    type: 'EMPLOYEE',
    multiple: false
  }],
  humanResources: [{
      name: 'License Verification',
      description: 'Selected users receive a notification when a license elapses, renews after the expiration date, or has a status change.',
      type: 'LIC_STATUS_CHG',
      multiple: true
    },
    {
      name: 'Disciplinary Action',
      description: 'Selected users receive a notification when a board/disciplinary action is placed or removed from a license.',
      type: 'LIC_DISCIPL_ACT',
      multiple: true
    },
    {
      name: 'Unmonitored Credentials',
      description: 'Selected users receive a notification when a Unmonitored License was added with no expiration date.',
      type: 'UC_EMPTY_EXPDATE',
      multiple: true
    },
    {
      name: 'Driver License',
      description: 'Selected users receive a notification when consideration are found or have changed.',
      type: 'DRIVER_LICENSE',
      multiple: true
    },
    {
      name: 'Requires further research',
      description: 'Selected users receive a notification when a license/certification cannot be found through a name search and requires further research by the employer.',
      type: 'CERT_REQ_RESEAR',
      multiple: true
    },
    {
      name: 'Custom Notifications',
      description: 'This is the frequency you will receive license expiration deadline reminders.',
      custom: true,
      type: 'CUSTOM',
      multiple: true
    },
    {
      name: 'Expiration Date Reminders',
      description: 'Indicate the frequency you wish to receive license expiration deadline reminders.',
      type: 'EXP_DATE',
      frequency: true,
      multiple: true
    }
  ],
  education: [{
      code: 'TS',
      name: 'Transcript Status',
      description: 'Select the EC Education users who should receive these notifications',
      customFrequency: false,
      multipleSelection: true
    },
    {
      code: 'DCE',
      name: 'Disciplinary Continuing Education',
      description: 'Select the system user to receive notification each time a new set of disciplinary continuing education requirements is added to an employee',
      customFrequency: false,
      multipleSelection: false
    },
    {
      code: 'CEDR',
      name: 'Continuing Education Deadline Reminders',
      description: 'Indicate the frequency you wish your employees to receive continuing education deadline reminders',
      customFrequency: true,
      multipleSelection: false
    },
    {
      code: 'LEDR',
      name: 'License Expiration Deadline Reminders',
      description: 'Indicate the frequency you wish your employees to receive license expiration deadline reminders',
      customFrequency: true,
      multipleSelection: false
    }
  ]
};

/**
 * All possible message subjects
 * @readonly
 * @enum {string}
 */
export const MESSAGE_SUBJECTS_BY_TYPE = {
  CERT_DISCIPL_ACT: 'Certification Board/Disciplinary Action',
  CERT_NOT_FOUND: 'Certification Not Found',
  CERT_RENEWED: 'Certification Renewed',
  CERT_STATUS_CHG: 'Certification Status Change',
  CERT_ELAPSED_EXPDATE: 'Elapsed Certification',
  ELAPSED_EXP_DATE: 'Elapsed License',
  EMPLOYEE_REMOVED: 'Employee Removed',
  LIC_DISCIPL_ACT: 'License Board/Disciplinary Action',
  LIC_NOT_FOUND: 'License Not Found',
  LIC_RENEWED: 'License Renewed',
  LIC_STATUS_CHG: 'License Status Change',
  CERT_REQ_RESEARCH: 'Requires Further Research'
};

/**
 * All possible options for coverage type
 * @readonly
 * @enum {string}
 */
export const COVERAGE_TYPE = {
  CLAIMS_MADE: 'Claims made',
  OCCURRENCE: 'Occurrence'
};