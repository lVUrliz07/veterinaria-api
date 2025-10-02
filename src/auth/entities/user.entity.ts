// src/auth/entities/user.entity.ts
import { Task } from '../../tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // Hacemos que el nombre de usuario sea único
  username: string;

  @Column()
  password_hash: string; // ¡Importante! Guardaremos la contraseña encriptada

  // --- ¡LA RELACIÓN INVERSA! ---
  // Un usuario puede tener MUCHAS tareas
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
