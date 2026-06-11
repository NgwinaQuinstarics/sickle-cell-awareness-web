import logoUrl from "@/assets/sicklecare-logo.png";

export function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoUrl}
        alt="SickleCare logo"
        className="h-14 w-14 rounded-2xl bg-white object-contain shadow-sm md:h-16 md:w-16"
        width={64}
        height={64}
      />
    </div>
  );
}
