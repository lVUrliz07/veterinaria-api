// src/tasks/dto/update-task.dto.ts
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum'; // <-- ¡AQUÍ ESTÁN LOS CAMBIOS!

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus) // <-- Valida que sea un valor del enum
  @IsOptional()
  status?: TaskStatus; // <-- El tipo ahora es TaskStatus, no string
}
