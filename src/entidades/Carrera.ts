import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Curso } from './Curso'

@Entity()
export class Carrera {
    
    @PrimaryGeneratedColumn()
    id_carrera: string

    @Column()
    nombre_carrera: string

    @OneToMany(() => Curso, (curso) => curso.id_datos_carrera, {eager: true, cascade:true})
    cursos: Curso[]
}