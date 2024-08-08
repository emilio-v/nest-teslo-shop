import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'The password must be at least 8 characters, a lowercase letter, uppercase letter, a number and a symbol',
    },
  )
  password: string;

  @IsString()
  @MinLength(1)
  fullName: string;
}
