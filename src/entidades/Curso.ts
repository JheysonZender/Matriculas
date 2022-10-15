import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm"
import { Carrera } from './Carrera'
import { Laboratorio } from './Laboratorio';

@Entity()
export class Curso {
    
    @PrimaryGeneratedColumn()
    id_curso: string

    @Column()
    nombre_curso: string

    @Column()
    curso_anio: string

    @Column()
    abreviado: string

    @ManyToOne(() => Carrera, carrera => carrera.cursos)
    id_datos_carrera: Carrera

    @OneToMany(() => Laboratorio, (laboratorio) => laboratorio.id_curso, {eager: true, cascade:true})
    laboratorios: Laboratorio[]
}
