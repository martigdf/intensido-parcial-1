import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { departamentoRepository } from '../../services/departamentos.repository.js';
import { Departamento, DepartamentoId, DepartamentoIdType } from '../../schemas/departamento.js';

const departamentoRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
      response: {
        200: {
          type: "object",
          description: "Lista de departamentos"
          },
          404: {
        description: "Departamento no encontrado",
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
    handler: async function (request, reply) {
      return departamentoRepository.getAll();
    }
  });

  fastify.get('/:id_departamento', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      description : "Obtener listado de departamentos",
      params: DepartamentoId,
      response : {
        200 : DepartamentoId,
        404: {
        description: "Listado de departamentos no encontrado",
        },
      },
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      const { id_departamento } = request.params as DepartamentoIdType
      return departamentoRepository.getById(id_departamento);
    }
  })

  fastify.get('/:id_departamento/localidades', {
    schema: {
      tags: ["departamentos"],
      summary: "Obtener listado de departamentos",
      params: DepartamentoId,
      response: {
        200: {
          type: "object",
          properties: Departamento.properties,
          },
          404: {
        description: "lista de Departamentos no encontrado",
        },
      },
      description : "Obtener listado de departamentos",
      security: [
        { bearerAuth: [] }
      ]
    },
    onRequest: fastify.authenticate,
    handler: async function (request, reply) {
      const { id_departamento } = request.params as DepartamentoIdType
      return departamentoRepository.getLocalidades(id_departamento);
    }
  })

}

export default departamentoRoutes
