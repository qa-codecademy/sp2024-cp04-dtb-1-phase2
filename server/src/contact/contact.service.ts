import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepo: Repository<Contact>,
  ) {}
  create(createContactDto: CreateContactDto) {
    return this.contactRepo.save(createContactDto);
  }

  findAll() {
    return this.contactRepo.find({});
  }

  async findOneById(id: number) {
    try {
      const foundContact = await this.contactRepo.findOneByOrFail({ id });

      return foundContact;
    } catch (error) {
      throw new BadRequestException('Contact Not Found');
    }
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const foundContact = await this.findOneById(id);

    Object.assign(foundContact, updateContactDto);

    await this.contactRepo.save(foundContact);
  }

  async remove(id: number) {
    const foundContact = await this.findOneById(id);

    await this.contactRepo.remove(foundContact);
  }
}
