import { getUserProfile } from "./userActions";
import UserProfile from "./UserProfile";

type UserProfileProps = {
  name: string;
  email: string;
  role: string;
  image: string;
};

export default function UserProfileServer({ email }: { email: string }) {
  const user: any = getUserProfile(email);

  // Pass user details to the client component
  return (
    <>{user && <UserProfile name={user.name} email={user.email} role={user.role} image={user.image} />}</>
  );
}