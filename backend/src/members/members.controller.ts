import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
    constructor(private readonly membersService: MembersService) {}

    @Post()
    create(@Body() memberData: CreateMemberDto): Promise<Member> {
        return this.membersService.create(memberData);
    }
    @Get()
    findAll(): Promise<Member[]> {
      return this.membersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Member> {
      return this.membersService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id') id: number,
      @Body() updateData: UpdateMemberDto,
    ): Promise<Member> {
      return this.membersService.update(id, updateData);
    }
  
    @Delete(':id')
    delete(@Param('id') id: number): Promise<void> {
      return this.membersService.delete(id);
    }
}
