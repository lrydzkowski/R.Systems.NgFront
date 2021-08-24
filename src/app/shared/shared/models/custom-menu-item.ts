import { MenuItem } from 'primeng/api';

export class CustomMenuItem implements MenuItem {
  label?: string;
  icon?: string;
  command?: (event?: any) => void;
  data: { tooltip: string; className: string } = { tooltip: '', className: '' };
}
