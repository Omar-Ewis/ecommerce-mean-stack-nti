// import cors from 'cors'
// console.log("✅ ENV ORIGINS:", process.env.ALLOWED_ORIGINS);
// const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
// console.log(allowedOrigins);
// const corsOptions = {
// origin:function(origin,callback){
//     if(!origin) return callback(null,true); //allow server to server or postman
//     if(allowedOrigins.includes(origin)){
//         return callback(null,true);
//     }
//     else{
//         callback(new Error('CORS policy:origion not allowed'));
//     }
// },
// credentials:true,
// methods:['GET','POST','PUT','DELETE'],
// allowedHeaders:['Content-Type','Authorization']
// }

// export default cors(corsOptions);

// src/middleware/cors.middleware.js
import cors from 'cors';

export default function corsMiddleware() {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    console.log("✅ ALLOWED_ORIGINS:", allowedOrigins);
const corsOptions = {
        origin: function (origin, callback) {
        if (!origin) return callback(null, true); // allow Postman/server-to-server
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('CORS policy: origin not allowed'));
        }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    };

    return cors(corsOptions);
}
