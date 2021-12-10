import{Ciudad} from './ciudad';

//tipo de dato propio definido cliente y ciudad

export interface Cliente{
id: number;
nombre: string;
apellido: string;
email: string;
celular: string;
createAt: string;
ciudad?: Ciudad;
}