export interface LoginResponseDto {
  username: string;
  accessToken: string;
  id: string;
}

export interface LoginAdminDto {
  username: string;
  password: string;
}

export interface LoginEmployeeDto {
  loginIdentification: string;
}
