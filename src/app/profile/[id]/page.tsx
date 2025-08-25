// export default function UserProfile({params}: any) {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Profile</h1>
//             <hr />
//             <p className="text-4xl">Profile page 
//             <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</span>
//             </p>

//             </div>
//     )
// }


interface Props {
  params: { id: string };
}

const UserProfile = async ({ params }: Props) => {
  const userId = params.id;

  // Optionally, fetch user details from backend if needed
  // const res = await fetch(`http://localhost:3000/api/users/${userId}`);
  // const user = await res.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 m-4">
      <h1 className="m-4 text-3xl font-bold">Profile</h1>
      <hr />
      <p className="text-4xl m-3">
        Profile page : 
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">{userId}</span>
      </p>
    </div>
  );
};

export default UserProfile;
