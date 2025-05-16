interface SupabaseUser {
    created_at: string;
    email: number;
    id : number;
    name : string;
    role : 'admin' | 'user';
    status : string;
    username : string;
  }