import { getUserProfile } from "./userActions";
import UserProfile from "./UserProfile";

type UserProfileProps = {
  name: string;
  email: string;
  role: string;
  image: string;
};

export default async function UserProfileServer({ email }: { email: string }) {
  const user: any = await getUserProfile(email);

  // Pass user details to the client component
  return (
    <>{user && <UserProfile name={user.name} email={user.email} role={user.role} image={user.image} />}</>
  );
}