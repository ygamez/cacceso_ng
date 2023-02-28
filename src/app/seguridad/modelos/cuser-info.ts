export class CUserInfo {



  public user: string;
  public pass: string;

}

export interface AuthResponse{
  ok:      boolean;
  id?:     string;
  nombre?: string;
  token?:  string;
  tipo?:   string;
  // refreshToken?: string;
  // message?: string;
  // email?: string;
}
