import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../../services/usuario.repository.js';
import { Usuario, UsuarioId, UsuarioIdType } from '../../../schemas/usuario.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener usuario",
      description : "Obtener el usuario a partir de su id",
      params: UsuarioId,
      response: {
        200: {
          type: "object",
          properties: Usuario.properties,
        },
        404: {
          description: "Usuario no encontrado",
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      const { id_usuario } = request.params as UsuarioIdType
      return usuarioRepository.getById(id_usuario);
    }
  })

  fastify.get('/departamentos', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      description : "Obtener departamentos del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      const { id_usuario } = request.params as UsuarioIdType
      return usuarioRepository.getDepartamentos(id_usuario);
    }
  })
  
  fastify.get('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description : "Obtener las localidades de un determinado departamento del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description : "Crear una localidad asignada a un usuario.",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado");
    }
  })

}

export default usuariosRoutes
