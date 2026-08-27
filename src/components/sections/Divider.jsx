export default function Divider() {
  return (
    <div className="relative z-10 w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="h-[1px] w-full bg-repeat-x bg-[length:14px_1px]" style={{ backgroundImage: 'linear-gradient(90deg, rgba(28,26,20,0.22) 60%, transparent 0%)' }}></div>
    </div>
  );
}
