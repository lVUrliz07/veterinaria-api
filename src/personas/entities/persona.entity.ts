// src/personas/entities/persona.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'personas' }) // Le decimos que la tabla se llame 'personas'
export class Persona {
  @PrimaryGeneratedColumn() // SERIAL PRIMARY KEY se traduce a esto
  id_persona: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  dni: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ type: 'text', nullable: true })
  direccion: string;

  // ... otros campos opcionales como tipo_sangre, alergias, etc. los añadiremos si son necesarios

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // La relación con Mascotas la añadiremos cuando creemos la entidad Mascota.
}
