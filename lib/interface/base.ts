export interface BaseUser {
    id: string;
    email: string;
    avatar?: string;
    fullName: string;
}

export interface BaseImage {
    imageSrc?: string;
}

export interface BaseLocation {
    state: string;
    country: string;
}
