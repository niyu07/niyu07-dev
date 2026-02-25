export default function ProfileCard() {
  return (
    <section className="mb-16">
      <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          自己紹介
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-900">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-semibold min-w-[120px]">大学:</span>
              <span className="text-gray-800">広島市立大学</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="min-w-[120px]">
                <span className="font-semibold">学部、学科、講座:</span>
                <br />
                <span className="text-gray-800">
                  情報科学部 情報科学科 コミュニケーション講座
                </span>
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="font-semibold min-w-[120px]">興味分野:</span>
              <span className="text-gray-800">
                ネットワーク、セキュリティ、アプリ開発
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold min-w-[120px]">サークル:</span>
              <span className="text-gray-800">
                いちぴろエクスプローラ、天地創造部
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-semibold min-w-[120px]">所属団体:</span>
              <span className="text-gray-800">特定非営利活動法人 NxTEND</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
