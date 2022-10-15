import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm"
import { Laboratorio } from './Laboratorio';

@Entity()
export class Estudiante {
    
    @PrimaryGeneratedColumn()
    id_estudiante: string

    @Column()
    nombre: string

    @Column()
    correo: string

    @ManyToMany(() => Laboratorio)
    @JoinTable()
    matriculas: Laboratorio[]
}