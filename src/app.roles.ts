import { RolesBuilder } from 'nest-access-control';

//roles
export enum AppRoles {
  //AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}

//rutas
export enum AppResource {
  USER = 'USER',
  EMPLOYEE = 'EMPLOYEE',
  EDIFICE = 'EDIFICE',
  PCAUTH = 'PCAUTH',
  FINGER= 'FINGER',
  HOUR_HAND= 'HOUR_HAND',
  HOUR= 'HOUR',
  REASON= 'REASON',
  TICKEO= 'TICKEO'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  // AUTHOR ROLES
  /*.grant(AppRoles.AUTHOR)
  .updateOwn([AppResource.USER]) //own quiere decir su porpio articulo
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.POST])
  .updateOwn([AppResource.POST])
  .deleteOwn([AppResource.POST])*/
  // ADMIN ROLES
  .grant(AppRoles.ADMIN)
  //.extend(AppRoles.AUTHOR)  con esto hereda todo lo q puede hacer el de arruba
  //any quiere decir cualquier ruta segun la logica, solo el admin puede crear su propio articulo
  .createAny([AppResource.USER,AppResource.EMPLOYEE,AppResource.EDIFICE,AppResource.PCAUTH,AppResource.FINGER,AppResource.HOUR_HAND,AppResource.HOUR,AppResource.REASON,AppResource.TICKEO])
  .updateAny([AppResource.USER,AppResource.EMPLOYEE,AppResource.EDIFICE,AppResource.PCAUTH,AppResource.FINGER,AppResource.HOUR_HAND,AppResource.HOUR,AppResource.REASON,AppResource.TICKEO])
  .deleteAny([AppResource.USER,AppResource.EMPLOYEE,AppResource.EDIFICE,AppResource.PCAUTH,AppResource.FINGER,AppResource.HOUR_HAND,AppResource.HOUR,AppResource.REASON,AppResource.TICKEO])
  .readAny([AppResource.USER,AppResource.EMPLOYEE,AppResource.EDIFICE,AppResource.PCAUTH,AppResource.FINGER,AppResource.HOUR_HAND,AppResource.HOUR,AppResource.REASON,AppResource.TICKEO]);
