import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/role';

@Pipe({
  name: 'userRoles'
})
export class UserRolesPipe implements PipeTransform {

  transform(roles: Role[]): string {
    return roles.map(role => role.name).join(', ');
  }

}
