import Image from "next/image";
import Link from "next/link";

export function Logo({ horizontal = true }: { horizontal?: boolean }) {
  return (
    <Link className="brand-row" href="/">
      <Image
        src={horizontal ? "/brand/logo-horizontal.svg" : "/brand/logo-mark.svg"}
        alt="steller01"
        width={horizontal ? 188 : 42}
        height={42}
        className={horizontal ? undefined : "logo-mark"}
      />
    </Link>
  );
}
