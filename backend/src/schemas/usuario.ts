import { Static, Type } from '@sinclair/typebox';
import fp from 'fastify-plugin'

export const Login = Type.Object({
  usuario: Type.String(),
  password: Type.String(),
}, {
  examples : [
    {
      usuario: "admin",
      password: "contraseña",
    },
    {
      usuario: "usuario1",
      password: "contraseña",
    },
    {
      usuario: "usuario2",
      password: "contraseña",
    },
]
});

export type Login = Static<typeof Login>;

export const UsuarioId = Type.Object({
  id_usuario: Type.Number()
})

export const Usuario = Type.Object({
  id_usuario: Type.Optional(Type.Integer()),
  nombre : Type.String(),
  roles: Type.Array(Type.String())
});

export const UsuarioPost = Type.Object({
    nombre: Type.String(),
    roles :Type.Array(Type.String())
});

export type Usuario = Static<typeof Usuario>;
export type UsuarioPostType = Static<typeof UsuarioPost>
export type UsuarioIdType = Static<typeof UsuarioId>

//Si quiero agregar los esquemas a fastify de antemano para poder usar ref.
export default fp(async (fastify) => {
  fastify.addSchema(Login);
})
