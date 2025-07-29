import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../services/usuario.repository.js';
import { Usuario, UsuarioPost } from '../../schemas/usuario.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  
  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description : "Obtener listado de usuarios",
      response: {
        200: Type.Array(Usuario),
        404: {
          description: "Listado del usuario no encontrado",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
    handler: async function (request, reply) {
      return usuarioRepository.getAll();
    }
  })

  fastify.patch('/register', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear usuario",
      body: UsuarioPost,
      description : "Crear usuario",
      response: {
        201: {
          description: "Usuario creado",
          type: "object",
          properties: Usuario.properties,
        },
        501: {
          description: "Error al crear el usuario",
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
    handler: async function (request, reply) {
      const usuario = request.params as Usuario
      return usuarioRepository.create(usuario);
    }
  })

}

export default usuariosRoutes
