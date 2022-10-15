import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Curso } from './Curso'
import { Horario } from './Horario'

@Entity()
export class Laboratorio {
    
    @PrimaryGeneratedColumn()
    id_laboratorio: string

    @Column()
    grupo: string

    @Column()
    docente: string

    @Column()
    max_estudiantes: number

    @ManyToOne(() => Curso, (i) => i.laboratorios)
    id_curso: Curso

    @OneToMany(() => Horario, (i) => i.id_laboratorio)
    horarios: Horario[]

}