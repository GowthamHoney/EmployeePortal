export interface CustomResponse<T = any> {
    IsSuccess: boolean;
    Message: string;
    Data: T;
}
