export type AuthFormValues = {
  name: string;
  email: string;
  password: string;
  gender?: 'male' | 'female' | 'other';
  tags?: TechStack[];
};

export type EmailCodeValues = {
  email: string;
};

export type TechStack =
  | 'Java'
  | 'Spring Boot'
  | 'Spring Data JPA'
  | 'Spring Security'
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'Next.js'
  | 'Vue'
  | 'React Native'
  | 'Node.js'
  | 'Nest.js'
  | 'Express.js'
  | 'Kotlin'
  | 'Android Studio'
  | 'Swift'
  | 'Unity'
  | 'Unreal';
