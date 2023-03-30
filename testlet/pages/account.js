import Link from "next/link";
import { auth } from "../firebase/clientApp"

function account() {
  const local = auth.currentUser;
  return (
    <>
      <div className="user-profile">
        <h1>
          <img
            align="right"
            src="/nopfp.png"
            alt=""
          />
          {local.displayName}
          <br />
        </h1>
        <p>&nbsp;</p>
        <p>Achievements Study Sets Expert Solutions Courses Classes</p>
        <p>&nbsp;</p>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="#Recent-activity">Recent activity</Link>
          </li>
          <li>
            <Link href="#Study">Study</Link>
          </li>
          <li>
            <Link href="#Streaks">Streaks</Link>
          </li>
          <li>
            <Link href="#Lifttime">Liftime</Link>
          </li>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <li>
            <Link href="../LoginPages/forgotpwd">
              Change Username
            </Link>
          </li>
          <li>
            <Link href="../LoginPages/forgotpwd">
              Change Password
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default account;
