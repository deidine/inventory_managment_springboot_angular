export class UserDetails{

    userName: string;
    email: string;
    contactNo: string;
    address: string;
    status: string;
    area: string;
    
}
// {"id":"1","username":"deidine",
// "password":"$2a$12$W7ydtmGFt0PVHeu2UXud1.Pr2/8ubz9BFHeCJrwceP4rPS65ufWP6",
// "appUserRoles":"[ROLE_ADMIN]"}
export class UserProfile{
    username: string;
    password: string;
    email: string;
    contactno: string;
    personalAddress: string;
    status: string;
    area: string;
    appUserRoles: string;
    
}

export class Personnelle {
    telephone: number;
    nom: string;
    role_systm: string;
    fn_dans_entite: string;
    id_bur: number;
    email: string;
  }
  

export class RegisterUser{
    public userName: string;
    public email: string;
    public password: string;
    public personalAddress: string;
    public contactno: string;
    public status: string;
    public roleType: number;
    public area: string;
    
}

export class PasswordUpdator{
    public userId : number;
    public oldPassword : string;
    public newPassword : string;
}