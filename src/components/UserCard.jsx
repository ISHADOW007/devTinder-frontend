import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";
import { BASE_URL } from "../../utils/constants";

const UserCard = ({ user }) => {
  const dispatch = useDispatch(); // ✅ Moved here

  if (!user) {
    return null; // 👈 Best to return a valid JSX value like null
  }

  const { _id, firstName, lastName, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;