import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../services/usuario.repository.js';
import { Usuario, UsuarioPost, UsuarioPostType } from '../../schemas/usuario.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  
  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description : "Obtener listado de usuarios",
      response: {
        200: Type.Array(Usuario)
      },
      security: [
        { bearerAuth: [] }
      ]
    },
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
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      //const { nombre } = request.params as UsuarioPostType
      //return usuarioRepository.create(id_usuario);
    }
  })

}

export default usuariosRoutes
