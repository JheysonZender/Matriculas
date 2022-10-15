import {Router, Request, Response} from 'express'

import { AppDataSource } from '../data-source'


import { Carrera } from '../entidades/Carrera'
import { Curso } from '../entidades/Curso'
import { Laboratorio } from '../entidades/Laboratorio';
import { Horario } from '../entidades/Horario';
import { Estudiante } from '../entidades/Estudiante';

const carreraRepository = AppDataSource.getRepository(Carrera)
const cursoRepository = AppDataSource.getRepository(Curso)
const laboratorioRepository = AppDataSource.getRepository(Laboratorio)
const horarioRepository = AppDataSource.getRepository(Horario)
const estudianteRepository = AppDataSource.getRepository(Estudiante)

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
    const {correo_usuario} = req.body

    if(!correo_usuario){
        return res.status(500).json({
            msg: 'Dame un correo_usuario',
        })
    }

    try{
        const usuario = await estudianteRepository.findOne({
            relations: {
                matriculas: true
            },
            where: {
                correo: correo_usuario
            }
        })

        if( usuario ){
            return res.status(200).json(
                usuario.matriculas
            );
            
        }else {
            return res.status(401).json({
                msg: 'correo no registrado',
            });
        }

    }catch(error){
        return res.status(500).json({
            msg: 'Error',
        })
    }
})

router.post('/matricula', async (req: Request, res: Response) => {
    const {correo_usuario, horarios} = req.body

    if(!correo_usuario || !horarios){
        return res.status(500).json({
            msg: 'Algo fallo',
        })
    }

    try {
        const estudiante = await estudianteRepository.findOne({
            relations: {
                matriculas: true
            },
            where: {
                correo: correo_usuario
            }
        })

        if( !estudiante ){
            return res.status(500).json({
                msg: `Estudiante Incorrecto ${estudiante}`,
            })
        }

            
        const laboratorio = await laboratorioRepository.findOne({
            where: {
                id_laboratorio: horarios
            }
        })

        if( !laboratorio ){
            return res.status(500).json({
                msg: `Laboratorio incorrecto ${laboratorio}`,
            })
        }

            try{
                estudiante!.matriculas.push(laboratorio!)
                await estudianteRepository.save(estudiante)
                
                return res.status(200).json({
                    estudiante
                })
            }catch(e){
                return res.status(500).json({
                    msg: 'Error en matricula',
                })
            }
    } catch(error){
        return res.status(500).json({
            msg: 'Error',
        })
    }

})

router.post('/crear-carrera', async (req: Request, res: Response) => {
    const nuevaCarrera = await carreraRepository.create(req.body)
    const resultado = await carreraRepository.save(nuevaCarrera)
    res.json(resultado)
})

router.post('/crear-curso', async (req: Request, res: Response) => {
    const nuevoCurso = await cursoRepository.create(req.body)
    const resultado = await cursoRepository.save(nuevoCurso)
    res.json(resultado)
})

router.post('/crear-laboratorio', async (req: Request, res: Response) => {
    const nuevoLaboratorio = await laboratorioRepository.create(req.body)
    const resultado = await laboratorioRepository.save(nuevoLaboratorio)
    res.json(resultado)
})

router.post('/crear-horario', async (req: Request, res: Response) => {
    const nuevoHorario = await horarioRepository.create(req.body)
    const resultado = await horarioRepository.save(nuevoHorario)
    res.json(resultado)
})

router.post('/crear-estudiante', async (req: Request, res: Response) => {
    const nuevoEstudiante = await estudianteRepository.create(req.body)
    const resultado = await estudianteRepository.save(nuevoEstudiante)
    res.json(resultado)
})

router.get('/cursos', async (req: Request, res: Response) => {
    const cursos = await cursoRepository.find()
    res.json(cursos)
})


export default router