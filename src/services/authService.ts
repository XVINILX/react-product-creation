import {
  LoginAdminDto,
  LoginEmployeeDto,
  LoginResponseDto,
} from "domain/dtos/auth.dto";

import { callForApiClient } from "./apiClient";
import { CreateUser } from "domain/entities/user";

export const loginUser = async (
  login: LoginAdminDto
): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.post(`/login/`, login);
  return response.data;
};

export const registerUser = async (
  login: CreateUser
): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.post(`/register/`, login);

  return response.data;
};

export const refreshToken = async (): Promise<LoginResponseDto> => {
  const response = await callForApiClient.jsonService.post(
    "/auth/refresh-token"
  );
  return response.data;
};
