
export const DDD_LENGTH = 2;
export const PHONE_LENGTH = 9;
export const VERIFICATION_CODE_LENGTH = 6;
export const MIN_INPUT_LENGTH = 3;
export const MAX_INPUT_LINE_LENGTH = 100;
export const MAX_INPUT_PARAGRATH_LENGTH = 500;
export const EMAIL_LENGTH = 100;
export const CPF_LENGTH = 14;
export const BIRTH_LENGTH = 10;

export const USER_ROLE = {
    ADMIN: 'admin',
    DRIVER: 'driver',
    PASSENGER: 'passenger'
};

export const SIZES = {
    XS: "xs", // 20%
    SM: "sm", // 40%
    MD: "md", // 60%
    LG: "lg", // 80%
    XL: "xl", // 100%
};

export const LOCATION_OPTIONS = {
    accuracy: {
        android: 'high',
        ios: 'best',
    },
    enableHighAccuracy: true,
    timeout: 2000
};

export const RIDE_TYPE = {
    PASSENGER: 'passenger',
    PACKAGE: 'package'
};

export const MAXIMUM_LOCATIONS_PER_RIDE = 3;

export const GOOGLE_MAPS_API_KEY = "AIzaSyB6Qldfl0Acu0opoocZYu4p6a3KImV6IJo";

export const STATUS_OPTIONS = {
    IDLE: "IDLE",
    DRAFT: "DRAFT",
    SEARCHING: "SEARCHING",
    CREATED: "CREATED",
    CANCELED: "CANCELED",
    PICKUP: "PICKUP",
    ONGOING: "ONGOING",
    DONE: "DONE",
};

export const EXPECTED_OBJECT_REF = {};