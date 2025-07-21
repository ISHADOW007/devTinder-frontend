// import axios from "axios";

// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../../utils/feedSlice";
// import { BASE_URL } from "../../utils/constants";

const UserCardForEditProfile = ({ user }) => {

    if(!user){
        return
    }
  const { firstName, lastName, age, gender, about } = user;
  // const dispatch = useDispatch();

  // const handleSendRequest = async (status, userId) => {
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/request/send/" + status + "/" + userId,
  //       {},
  //       { withCredentials: true }
  //     );
  //     dispatch(removeUserFromFeed(userId));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        
      </div>
    </div>
  );
};
export default UserCardForEditProfile