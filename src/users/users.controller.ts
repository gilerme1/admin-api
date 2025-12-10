import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('me')
    @ApiOperation({ summary: 'Obtener los datos del usuario autenticado' })
    @ApiResponse({ status: 200 })
    findMe() {
        return {
            id: 1,
            email: "test@example.com",
            nombre: "Usuario Demo",
        };
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista completa de usuarios.' })
    findAll() {
        return this.usersService.findAll();
    }
}
