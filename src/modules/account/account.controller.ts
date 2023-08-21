import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Account } from './account.schema';
import { RegisterAdminDto, registerUserdto } from './dto';
import { AppResponse } from '~/common/interfaces';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@ApiTags('[Account] - All')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  // @Roles(EAccountRole.ADMIN)
  @Post('/register-admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Register admin', description: 'Create an Admin' })
  @ApiOkResponse({ type: Account, status: 201 })
  async createAdmin(@Body() registerDto: RegisterAdminDto): Promise<AppResponse<Account> | Observable<never>> {
    return this.accountService.registerAdmin(registerDto);
  }

  // @Roles(EAccountRole.ADMIN)
  @Post('/register-user')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Register user', description: 'Create an User' })
  @ApiOkResponse({ type: Account, status: 201 })
  async createUser(@Body() registerDto: registerUserdto): Promise<AppResponse<Account> | Observable<never>> {
    return this.accountService.registerStudent(registerDto);
  }
}
