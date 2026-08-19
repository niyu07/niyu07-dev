const certifications = [
  {
    title: "IPv6基礎検定",
  },
];

export default function CertificationSection() {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 flex items-center gap-3">
        資格
      </h2>
      <div className="space-y-4">
        {certifications.map((certification) => (
          <div
            key={certification.title}
            className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white transition-all"
          >
            <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
              取得資格
            </span>
            <h3 className="text-gray-900 font-bold text-lg">
              {certification.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
