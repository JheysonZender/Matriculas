import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Laboratorio } from './Laboratorio';

@Entity()
export class Horario     {
    
    @PrimaryGeneratedColumn()
    id_horario: string

    @Column()
    dia: String

    @Column()
    hora_inicio: String

    @Column()
    hora_fin: String

    @ManyToOne(() => Laboratorio, (i) => i.horarios)
    id_laboratorio: Laboratorio
}