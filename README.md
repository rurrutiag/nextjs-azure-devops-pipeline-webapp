Proyecto basado en [Next.js](https://nextjs.org/) iniciado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Comenzemos

Primero, comandos para iniciar el servidor de desarrollo (en tu equipo):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

La página de inicio es `app/page.js` y se auto actualizará a medida que edites el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter de Google Font.

## Qué debemos modificar

### `package.json`

- En primer lugar, asegura que todas las dependencias estén actualizadas
- En segundo lugar, el nombre del proyecto en la línea 2

### `pipelines/azure-develop.yml`

- El proyecto esta configurado para que tus commit estén dirigidos a la rama `develop` de Azure Repo. Por lo tanto, valida que esta ya exista o creala. También debes poseer un `Service Connection` creado en Azure Portal. Si no lo posees, gestiona su creación. Si tu proyecto ya tiene el `Service Connection`, continua con el Paso 2.

### Paso 1: Configurar Service Connection en Azure DevOps Pipelines
- En la configuración de Azure DevOps, apartado `Pipelines` y luego `Service connections`
- Presiona el botón `New service connection` y a continuación selecciona `Azure Resource Manager` con Authentication method: `Service principal (manual)`
- En las casillas, debes ingresar la siguiente información:
1. Environment: Azure Cloud
2. Server Url: https://management.azure.com
3. Scope Level: Subscripcion (Puede ser Management Group si así fue creado en el Portal)
4. Subscription Id: La serie de la subscripción (consulta la base de conocimiento) cuya estructura es: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
5. Subscription Name: El mismo nombre que tiene en Azure Portal
6. Authentication
6. 1. Service Principal Id: es el Client Id de la aplicación registrada en Microsoft Entra (antiguo Azure Active Directory)
6. 2. Credential: Service principal key
6. 3. Service principal key: La aplicación registrada tiene que tener un secreto de cliente creado, aquí colocas el valor del secreto.
6. 4. Tenant ID: es el Id de inquilino de la organización en Azure y generalmente tiene una estructura como XXXXXXXX-XXXX-XXXX-XXXX--XXXXXXXXXXXX
6. 5. Asegurate de validar que funcione con el botón `Verify` y luego entregale un nombre en `Service connection name` (sin espacios)
6. 6. Marca la casilla `Grant access permission to all pipelines` para asegurar que los pipelines del proyecto ocupen este Service Connection. Luego presiona `Verify and save`.

### Paso 2: Modificar `pipelines/azure-develop.YML`

- El `Service connection` es para que podamos implementar nuestro código en la Web App de Azure, por tanto debes modificar:
1. `<Azure-subscription>` por el nombre de tu `Service connection` (línea 63)
2. `<Resource-group-name>` por el nombre del grupo de recursos en el que esta la Web App (línea 64)
3. `<App-name>` por el nombre de la Web App (ojo, no es el plan de App Service) (línea 66)
4. En `<slot-name>` depende de:
4. 1. Si utilizas los slots development, qa, staging, production u otro de la misma Web App, debes indicar esta aquí
4. 2. Si utilizas una Web App para cada ambiente, utiliza Production (sin comillas)

### Paso 3: Crear Pipeline en Azure DevOps

- Al realizar tu primer commit, sigue los siguientes pasos:
1. En el menu Pipelines, presiona el botón `New pipeline` y luego `Azure Repos Git (YAML)`
3. Selecciona el Repo del proyecto en Azure DevOps y luego la opción `Existing Azure Pipelines YAML file`
5. En "Existing Azure Pipelines YAML file":
5. 1. Selecciona la rama `develop` en el menú desplegable `Branch`
5. 2. En el menú desplegable Path, si no aparece automaticamente, escribe: `/pipelines/azure-develop.yml`
5. 3. Presiona en Continue
6. Verás un TextBox editable con el archivo azure-develop.yml. Puedes guardar pipeline o directamente guardar y correr.


## Aprende más

Para obtener más información sobre Next.js, ve los siguientes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - información sobre las funcionalidaeds y la API de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - Tutorial interactivo de Next.js.

Puedes consultar [el repo de Next.js en GitHub](https://github.com/vercel/next.js/) - para comentar o contribuir (así evitamos todos los problemas que hubo con lograr este proyecto base)

## Implementar en Vercel

La forma más sencilla de implementar app Next.js es utilizar [la plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta la [documentación de implementación de Next.js](https://nextjs.org/docs/deployment) para más detalles.
