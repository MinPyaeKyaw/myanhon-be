export enum COURSE_LEVELS {
  N5 = 'N5',
  N4 = 'N4',
  N3 = 'N3',
  N2 = 'N2',
  N1 = 'N1',
}

export enum COURSE_TYPES {
  GRAMMER = 'grammer',
  LISTENING = 'listening',
  READING = 'reading',
  KANJI = 'kanji',
  VOCABURARY = 'vocaburary',
  SPEAKING = 'speaking',
  VLOG = 'vlog',
}

export enum CACHE_KEYS {
  TYPES = 'types',
  LEVELS = 'levels',
}

export enum ROLES {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export enum JWT_TYPES {
  REFRESH = 'refreshToken',
  ACCESS = 'accessToken',
  RESET_PASSWORD = 'resetPasswordToken',
}
