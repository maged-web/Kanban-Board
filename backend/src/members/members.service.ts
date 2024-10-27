import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
    constructor(@InjectRepository(Member) private membersRepository:Repository<Member>,)
    {}

    async create(memberData: Partial<Member>): Promise<Member> {
        const newMember = this.membersRepository.create(memberData);
        return this.membersRepository.save(newMember);
    }

    
    async findAll(): Promise<Member[]> {
        return await this.membersRepository.find();
    }

    async findOne(id: number): Promise<Member> {
        const member = await this.membersRepository.findOneBy({ id });
        if (!member) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
        return member;
    }

    async update(id: number, updateData: Partial<Member>): Promise<Member> {
        const existingMember = await this.membersRepository.findOneBy({ id });
        
        if (!existingMember) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }

        const updatedMember = this.membersRepository.merge(existingMember, updateData);
        return await this.membersRepository.save(updatedMember);
    }

    async delete(id: number): Promise<void> {
        const member = await this.membersRepository.findOneBy({ id });
        if (!member) {
            throw new NotFoundException(`Member with ID ${id} not found`);
        }
        await this.membersRepository.delete(id);
    }
}
