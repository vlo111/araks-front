export const PATHS = {
  ROOT: '/',
  UI: '/ui',
  SIGN_IN: '/sign-in',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROJECTS: '/projects',
  PROFILE: '/profile',
  PROJECT_OVERVIEW: '/projects/:id',
  PROJECT_UPDATE: '/projects/update/:id',
  PROJECT_CREATE: '/projects/create',
  PROJECT_SCHEME: '/projects/scheme/:id',
  PROJECT_PERSPECTIVES: '/projects/perspectives/:id',
  PROJECT_VISUALISATION: '/projects/visualisation/:id',
  DATA_SHEET: '/projects/data-sheet/:id',
  NODE_OVERVIEW: '/projects/data-sheet/:id/:node_type_id',
  PUBLIC: '/public',
  SHARED: '/shared',
  FOLDER: '/folder/:id',
  ERROR_403: 'no-access',
  PUBLIC_PREFIX: '/public',
  ERRORSERVER: '/server/error',
  ERRORNORFOUND: '/error',
};

export const COLORS = {
  PRIMARY: {
    BLUE: '#232F6A',
    GRAY_DARK: '#414141',
    GRAY: '#808080',
    GRAY_LIGHT: '#DBDBDB',
    WHITE: '#FFFFFF',
    SILVER: '#BFBFBF',
    SILVER_LIGHT: '#E2E0E8',
  },
  ALERT: {
    RED: '#CF000F',
    GRAY: '#808080',
    GREEN: '#5ACA75',
  },
  SECONDARY: {
    BLUE: '#4D7EC7',
    BLUE_LIGHT: '#59CFDF',
    CYAN: '#4DC7B5',
    MAGENTA: '#F27281',
    MAGENTA_LIGHT: '#D789D9',
    YELLOW: '#F5B452',
    YELLOW_LIGHT: '#EDE06D',
    GRAY_LIGHT: '#8A91AE',
    MAXIMUM_BLUE: '#4DAAC7',
    GREEN: '#1F8F74',
    GREEN_LIGHT: '#89D9B3',
    BLUE_MEDIUM: '#7F6DED',
    LAVANDER: '#AC89D9',
    PURPLE_MIDDLE: '#D989AF',
    PEARL_AQUA: '#89D9C6',
    PASTEL_BLUE: '#B8D4D6',
    PURPLE_BLUE: '#A2ACDE',
    AERO_BLUE: '#BBDACB',
    LAVANDER_DARKL: '#C7BDD4',
    PINK: '#DBAFA1',
  },
};

export const AUTH_KEYS = {
  USER: 'araks-user',
  TOKEN: 'araks-token',
};

export const VARIABLES = {
  MAX_PROJECT_TITLE_LENGTH: 15,
};

export const DEFAULT_ICON = 'araks-small';
export const DEFAULT_COLOR = COLORS.PRIMARY.GRAY_LIGHT;

export const screenSize = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const VALIDATE_MESSAGES = {
  required: 'Required field',
};

export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 1;

export const initPageData = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const centerImageStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};
