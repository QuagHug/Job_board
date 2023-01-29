export enum EVerificationType {
  password = 'password',
  code = 'code',
  google = 'google',
  facebook = 'facebook'
}

export interface IJwtPayload {
  email: string;
  iat: Date
  exp: Date
}

export enum EUserType {
  candidate = 'candidate',
  recruiter = 'recruiter'
}

export enum ELevel {
  fresher = 'fresher',
  junior = 'junior',
  senior = 'senior',
  leader = 'leader',
  cLevel = 'cLevel'
}

export enum EMode {
  onsite = 'onsite',
  remote = 'remote',
  hybrid = 'hybrid'
}

export enum EApplicationStatus {
  active = 'active',
  cancel = 'cancel',
  pending = 'pending'
}