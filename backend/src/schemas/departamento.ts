import { Static, Type } from '@sinclair/typebox';
import fp from 'fastify-plugin'

export const Departamento = Type.Object({
  id_departamento: Type.Integer(),
  nombre : Type.String()
});

export const DepartamentoId = Type.Object({
  id_departamento: Type.Integer(),
});

export const DepartamentoUsuarioId = Type.Object({
  id_departamento: Type.Integer(),
  id_usuario: Type.Integer()
});

export type Departamento = Static<typeof Departamento>;
export type DepartamentoIdType = Static<typeof DepartamentoId>;
export type DepartamentoUsuarioIdType = Static<typeof DepartamentoUsuarioId>;

//Si quiero agregar los esquemas a fastify de antemano para poder usar ref.
export default fp(async (fastify) => {
  fastify.addSchema(Departamento);
})
