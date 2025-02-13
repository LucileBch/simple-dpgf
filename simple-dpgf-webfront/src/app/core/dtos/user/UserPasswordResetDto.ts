export interface UserPasswordResetDto {
  email: string;
  activationCode: string;
  password: string;
}
