import { app, server } from './http/server'

const port = process.env.PORT || 8000
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
)
