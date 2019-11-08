import SwaggerClient from 'swagger-client'
// https://github.com/swagger-api/swagger-js

const specUrl = 'https://raw.githubusercontent.com/reload/material-list/doc-update/spec/material-list-1.0.0.yaml'
const swagger = new SwaggerClient(specUrl);

export default swagger
