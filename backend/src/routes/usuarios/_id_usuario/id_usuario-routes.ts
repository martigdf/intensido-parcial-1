import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../../services/usuario.repository.js';
import { Usuario, UsuarioId, UsuarioIdType } from '../../../schemas/usuario.js';
import { DepartamentoUsuarioIdType, DepartamentoUsuarioId } from '../../../schemas/departamento.js';
import { LocalidadUsuario } from '../../../schemas/localidad.js';

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
    onRequest: fastify.authenticate,
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
      params: UsuarioId,
      response: {
        200: {
          type: "object",
          properties: UsuarioId.properties,
        },
        404: {
          description: "Departamentos de usuario no encontrado",
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
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
      params: DepartamentoUsuarioId,
      response: {
        200: {
          type: "object",
          properties: DepartamentoUsuarioId.properties,
        },
        404: {
          description: "Localidades no encontradas",
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
    handler: async function (request, reply) {
      const { id_usuario, id_departamento } = request.params as DepartamentoUsuarioIdType 
      return usuarioRepository.getLocalidades(id_departamento, id_usuario);
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description : "Crear una localidad asignada a un usuario.",
      params: LocalidadUsuario,
      response: {
        200: {
          type: "object",
          properties: LocalidadUsuario.properties,
        },
        501: {
          description: "Error al crear localidades a un usuario",
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
      const localidad = request.params as LocalidadUsuario
      return usuarioRepository.addLocalidad(localidad);
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      response: {
        204: {
          description: "Localidad eliminada",
        },
        501: {
          description: "Localidad no encontrada",
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
      const { id_departamento, id_localidad, id_usuario } = request.params as LocalidadUsuario
      return usuarioRepository.removeLocalidad(id_departamento, id_localidad, id_usuario);
    }
  })
}

export default usuariosRoutes
