import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <img
        src="https://res.cloudinary.com/albin-groen/image/upload/f_auto,q_auto,w_100/v1602935502/logo_uws10e.svg"
        alt="Albin Groen logo"
        className="w-10"
        id="logo"
      />
    </Link>
  );
}
