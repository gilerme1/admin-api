/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Body, Patch, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    findMe() {
        return {
            id: 1,
            email: "test@example.com",
            nombre: "Usuario Demo",
        };
    }


    // @Patch('me')
    // update(@Request() req, @Body() dto: UpdateUserDto) {
    //     return this.usersService.update(req.user.id, dto);
    // }

    // @Delete('me')
    // remove(@Request() req) {
    //     return this.usersService.remove(req.user.id);
    // }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
