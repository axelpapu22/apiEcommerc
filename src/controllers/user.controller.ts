import type { Request, Response } from "express";
const userService = new UserService();
import { UserService } from "../services/user.service";
import User from "@models/user.model";


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (e: any) {
    return res
      .status(500)
      .json({ message: "Error getting users", error: e.message });
  }
};

//actuAlizar datos
export const actualizarDatos = async (req:any, resp:any) => {
  try {
    const {id} = req.params;
    const {name , email, password, id_role} =req.body;

     //validar que el rol exista
    if(!id_role){
      return resp.status(400).json({
        message: "El rol es obligatorio",
      });
    }

    const roleExist = await User.findOne({where: {id: id_role}});

    if(!roleExist){ 
      return resp.status(400).json({ 
        message: "El rol no existe", 
      });
    }


  

    const usuarioActualizado = await User.update({
      name,
      email,
      password,
      id_role,
    },{
      where: {id}
    });

    return resp.status(200).json({ 
      message: "Usuario actualizado exitosamente",
    });
   



  }catch(error){
    return resp.status(500).json({
      message: error,
    });

  }
};

//insertar datos

export const crearUsuarios = async (req:any, resp:any)=> {
  try {
    const {name , email, password, id_role} =req.body;
    
    if(!name || !email || !password || !id_role){
      return resp.status(400).json({
        message: "Todos los campos son obligatorios",});
    }

    const nuevoUsuario = await User.create({
      name,
      email,
      password,
      id_role,
    })

    return resp.status(200).json({ 
      message: "Usuario creado exitosamente",
    });

  }catch(error){
    return resp.status(500).json({
      message: error,
    });

  }
}