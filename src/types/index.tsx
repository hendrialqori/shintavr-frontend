export type User = {
  id: string;
  fullname: string;
  username: string;
  password: string;
  role: "superadmin" | "teacher" | "student";
};

export type Register = {
  id: string;
  fullname: string;
  dob: string;
  origin_school: string;
  gender: string;
  address: string;
  quotes: string
}

export type Announcement = {
  id: string;
  message: string;
  create_at: string
}

export type Feedback = Announcement & {
  person: string
}