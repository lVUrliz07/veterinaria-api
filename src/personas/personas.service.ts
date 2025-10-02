import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  create(createPersonaDto: CreatePersonaDto) {
    const persona = this.personaRepository.create(createPersonaDto);
    return this.personaRepository.save(persona);
  }

  findAll() {
    return this.personaRepository.find();
  }

  async findOne(id: number) {
    const persona = await this.personaRepository.findOneBy({ id_persona: id });
    if (!persona) {
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    }
    return persona;
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personaRepository.preload({
      id_persona: id,
      ...updatePersonaDto,
    });
    if (!persona) {
      throw new NotFoundException(`Persona con ID #${id} no encontrada.`);
    }
    return this.personaRepository.save(persona);
  }

  async remove(id: number) {
    const persona = await this.findOne(id);
    return this.personaRepository.remove(persona);
  }
}
