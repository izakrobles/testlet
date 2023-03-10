import Link from "next/link";

function account() {
  return (
    <>
      <div class="user-profile">
        <h1>
          <img
            align="right"
            src="/nopfp.png"
            alt=""
          />
          Username
          <br />
          First Last
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
            <Link href="http://locLinklhost:3000/LoginPages/forgotpwd">
              Change UsernLinkme
            </Link>
          </li>
          <li>
            <Link href="http://locLinklhost:3000/LoginPages/forgotpwd">
              Change PLinkssword
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default account;
