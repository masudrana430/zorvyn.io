export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-36 rounded-[26px]" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.6fr_1fr]">
        <div className="skeleton h-[360px] rounded-[28px]" />
        <div className="skeleton h-[360px] rounded-[28px]" />
      </div>

      <div className="skeleton h-[320px] rounded-[28px]" />
    </div>
  );
}