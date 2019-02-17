const env = process.env.NODE_ENV || 'development';

export default {
    isDev: env === 'Development',
    isTest: env === 'testing',
    port: 3000,
    dbUrl: 'mongodb+srv://techub-project-3:Mishikomamniashvili@techub-project-3-44zmg.mongodb.net/test?retryWrites=true',
    secrets: {
        jwt: "kjb32kjkjbskjabskjbad",
        jwtExp: '100d'
    }
}