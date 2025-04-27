export interface User {
    // id: number;
    // username: string;
    // email: string;
    // roles: string[];
    // createdAt: string;

    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    phoneNumber: string;
    gender: 'male' | 'female' | 'other';
}
