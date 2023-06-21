export type User = {
  id: string;
  fullname: string;
  email?: string;
  username: string;
  password: string;
  role: "superadmin" | "teacher" | "student";
  create_at?: string;
};

export type UserCredential = User & {
  authThrough?: 'google' | 'firebase'
}

export type Register = {
  id: string;
  fullname: string;
  dob: string;
  origin_school: string;
  gender: string;
  address: string;
  quotes: string
  score_test: string;
  creator_id: string
  create_at?: string
}


export type Announcement = {
  id: string;
  message: string;
  create_at?: string
}

export type Feedback = Announcement & {
  person: string
  creator_id: string
}