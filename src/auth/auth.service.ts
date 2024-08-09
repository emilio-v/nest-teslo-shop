import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const { password, ...userData } = signUpDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);

      return {
        email: user.email,
        fullName: user.fullName,
        id: user.id,
        isActive: user.isActive,
        roles: user.roles,
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('The email does not exist');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Please check server logs');
  }
}
