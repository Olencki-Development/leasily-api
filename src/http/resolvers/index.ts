export default {
  Query: {
    authRegister: () => {
      return {
        id: 'my-id',
        fullName: 'Test User',
        email: 'test@email.com',
        phone: '(555) 555-5555',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
  }
}
