//===================================================
export interface ILogin{
    email:string;
    password:string;
}
export interface ILoginRes{
    message:string;
    access_token:string;
}
//===================================================

export interface IUserData{
    id:string;
    role:string;
    name:string;
    exp:number
}

export interface IUser{
    _id:string;
    name:string;
    email:string;
    role:string;
}

export interface IUsersRes{
    message:string;
    data:IUser[];
}
//=============================
export interface IRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}
