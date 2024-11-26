import {
  Controller,
  Body,
  Param,
  UseGuards,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Post('assign-role/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can assign roles
  async assignRole(@Param('id') userId: number, @Body() role: string) {
    return this.usersService.assignRole(userId, role);
  }

  @Put('update-role/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can update roles
  async updateRole(@Param('id') userId: number, @Body() role: string) {
    return this.usersService.updateRole(userId, role);
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN) // Only admins can delete users
  async deleteUser(@Param('id') userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
